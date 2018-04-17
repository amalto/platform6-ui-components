// Modules
import * as React from 'react'
import * as classNames from 'classnames'

// Constants
import { languageIso, Language } from './constants/Data'

// Utils
import { addValToArrayNoDup, removeValFromArrayNoDup, compileWordings } from '@amalto/helpers'

// Wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'

// Components
import TypeaheadInput from '@amalto/typeahead-input'

/**
 * Language selector.
 * 
 * LanguageWrapper uses [WebStorage](#webstorage)'s properties
 * which are accessible at the root component of your service.
 */
module LanguageWrapper {
    export interface Props extends React.Props<LanguageWrapper> {
        /** Current selected language. */
        selectedLanguage: string;
        /** Array of language selected. */
        supportedLanguages: string[];
        /** Select language event. */
        handleLanguageChange: ( language: string ) => void;
        /** Add language event. */
        handleAddedLanguage: ( language: string ) => void;
        /** Remove language event. */
        handleRemovedLanguage: ( language: string ) => void;
        /** CSS class wrapping the component. */
        containerClass?: string;
        /**
         * Language to use on the component. e.g: <blockquote>en-US</blockquote>.
         * Locales available at [Locale](#locale).
         * Accessible via [WebStorage](#webstorage).
         */
        locale: string;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<LanguageWrapper>;
    }

    export interface State {
        addOpen?: boolean;
        wordings?: { [id: string]: string };
    }
}

class LanguageWrapper extends React.Component<LanguageWrapper.Props, LanguageWrapper.State> {

    constructor( props: LanguageWrapper.Props ) {
        super( props )
        this.state = {
            addOpen: false,
            wordings: compileWordings( MULTILANGUAGE_WORDINGS, props.locale )
        }
    }

    render() {

        const { addOpen, wordings } = this.state
        const { selectedLanguage, handleLanguageChange, handleRemovedLanguage, containerClass } = this.props

        return (
            <div className={containerClass}>
                <div className="form-inline">

                    <label>{wordings['selectedLanguage']}</label>

                    <select className="form-control mgl-10"
                        value={selectedLanguage}
                        onChange={e => handleLanguageChange( e.target.value )}>
                        {
                            this.props.supportedLanguages.map( ( lang, idx ) => (
                                <option key={idx} value={lang}>{lang}</option>
                            ) )
                        }
                    </select>

                    {this.getLanguagesSelector()}

                    {
                        addOpen ? <button className='btn btn-sm btn-trans btn-font mgl-10'
                            type='button'
                            onClick={() => { this.setState( { addOpen: false } ) }}
                            data-toggle='tooltip' data-original-title={wordings['closeLanguageSelector']}>
                            <span className="fas fa-times" />
                        </button> : null
                    }

                    {
                        selectedLanguage ? (
                            <button type='button'
                                className="btn btn-sm btn-trans btn-danger mgl-10"
                                onClick={( e ) => { e.preventDefault(); handleRemovedLanguage( selectedLanguage ) }}
                                data-toggle="tooltip" data-original-title={wordings['removeLanguageSelected']}>
                                <span className="fas fa-minus" />
                            </button>
                        ) : null
                    }


                </div>

            </div>
        )
    }

    private getLanguagesSelector = () => {

        const { addOpen, wordings } = this.state

        return addOpen ? (
            <span className="mgl-10 inline-middle">
                <TypeaheadInput id="languageWrapperSelector"
                    handleInputChange={this.handleLanguageSelection}
                    value={this.getSelectedLanguage()}
                    collection={languageIso}
                    display={( lang: Language ) => lang && lang.languageCode && `${ lang.languageCode } - ${ lang.languageName }`}
                    datumTokenizer={( lang: Language ) => [lang.languageCode, lang.languageName]}
                    placeholder={wordings['searchLanguage']}
                />
            </span>
        ) : (
                <button className="btn btn-sm btn-trans btn-info mgl-10"
                    type="button"
                    onClick={() => { this.setState( { addOpen: true } ) }}
                    data-toggle="tooltip" data-original-title={wordings['addLanguage']}>
                    <span className="fas fa-plus" />
                </button>
            )
    }

    private handleLanguageSelection = ( lang: Language ) => {
        const { supportedLanguages, handleAddedLanguage } = this.props
        const selectedLanguage = languageIso.filter( language => lang && language.languageCode === lang.languageCode )

        if ( selectedLanguage.length === 1 ) {
            handleAddedLanguage( lang.languageCode )
            this.setState( {
                addOpen: false
            } )
        }
    }

    private getSelectedLanguage = () => {
        const selectedLanguage = languageIso.filter( lang => lang.languageCode === this.props.selectedLanguage )
        return selectedLanguage.length === 1 ? selectedLanguage[0] : undefined
    }

}

export default LanguageWrapper

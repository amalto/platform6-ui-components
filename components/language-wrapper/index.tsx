// Modules
import * as React from 'react'

// Constants
import { languageIso, Language } from './constants/Data'

// Utils
import { getWordings } from '@amalto/helpers'

// Components
import TypeaheadInput from '@amalto/typeahead-input'

/**
 * Language selector.
 * 
 * LanguageWrapper uses [WebStorage](#webstorage)'s properties
 * which are accessible at the root component of your service.
 */
module LanguageWrapper {
    export interface Props {
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
         * Disable add and remove of language but still allow user to select language.
         * @default false
         */
        disabled?: boolean;
        /**
         * Language to use on the component. e.g: <span className='quote'>en-US</span>.
         * Locales available at [Locale](#locale).
         * Accessible via [WebStorage](#webstorage).
         */
        locale: string;
    }
}

function LanguageWrapper( props: LanguageWrapper.Props ) {
    const [wordings, setWordings] = React.useState( {} as any )
    const [addOpen, setAddOpen] = React.useState( false )

    const { selectedLanguage, supportedLanguages, handleAddedLanguage, handleLanguageChange, handleRemovedLanguage, containerClass, disabled } = props

    // Set wordings
    React.useEffect( () => {
        setWordings( getWordings( {}, props.locale ) )
    }, [props.locale] )

    return (
        <div className={containerClass}>
            <div className="form-inline">

                <label>{wordings.selectedLanguage}</label>

                <select className="form-control mgl-10"
                    value={selectedLanguage}
                    onChange={e => handleLanguageChange( e.target.value )}>
                    {
                        supportedLanguages.map( ( lang, idx ) => (
                            <option key={idx} value={lang}>{lang}</option>
                        ) )
                    }
                </select>

                {!disabled ? getLanguagesSelector( { selectedLanguage, addOpen, wordings }, handleAddedLanguage, setAddOpen ) : null}

                {
                    !disabled && addOpen ? <button className='btn btn-sm btn-trans btn-font mgl-10'
                        type='button'
                        onClick={() => { setAddOpen( false ) }}
                        data-toggle='tooltip' data-original-title={wordings.closeLanguageSelector}>
                        <span className="fas fa-times" />
                    </button> : null
                }

                {
                    !disabled && selectedLanguage ? (
                        <button type='button'
                            className="btn btn-sm btn-trans btn-danger mgl-10"
                            onClick={( e ) => { e.preventDefault(); handleRemovedLanguage( selectedLanguage ) }}
                            data-toggle="tooltip" data-original-title={wordings.removeLanguageSelected}>
                            <span className="fas fa-minus" />
                        </button>
                    ) : null
                }


            </div>

        </div>
    )
}

function getLanguagesSelector(
    data: {
        selectedLanguage: string,
        addOpen: boolean,
        wordings: { [id: string]: string }
    },
    handleAddedLanguage: ( languageCode: string ) => void,
    setAddOpen: ( addOpen: boolean ) => void
): JSX.Element {

    const { addOpen, selectedLanguage, wordings } = data

    return addOpen ? (
        <span className="mgl-10 inline-middle">
            <TypeaheadInput id="languageWrapperSelector"
                handleInputChange={( lang ) => handleLanguageSelection( lang, handleAddedLanguage, setAddOpen )}
                value={getSelectedLanguage( selectedLanguage )}
                collection={languageIso}
                display={( lang: Language ) => lang && lang.languageCode && `${ lang.languageCode } - ${ lang.languageName }`}
                datumTokenizer={( lang: Language ) => [lang.languageCode, lang.languageName]}
                placeholder={wordings.searchLanguage}
            />
        </span>
    ) : (
            <button className="btn btn-sm btn-trans btn-info mgl-10"
                type="button"
                onClick={() => { setAddOpen( true ) }}
                data-toggle="tooltip" data-original-title={wordings.addLanguage}>
                <span className="fas fa-plus" />
            </button>
        )
}

function handleLanguageSelection( lang: Language, handleAddedLanguage: ( languageCode: string ) => void, setAddOpen: ( addOpen: boolean ) => void ): void {
    const selectedLanguage = languageIso.filter( language => lang && language.languageCode === lang.languageCode )

    if ( selectedLanguage.length === 1 ) {
        handleAddedLanguage( lang.languageCode )
        setAddOpen( false )
    }
}

function getSelectedLanguage( selectedLanguage: string ): Language {
    const newSelectedLanguage = languageIso.filter( lang => lang.languageCode === selectedLanguage )
    return newSelectedLanguage.length === 1 ? newSelectedLanguage[0] : undefined
}

export default LanguageWrapper

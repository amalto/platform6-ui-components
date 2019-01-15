// Modules
import * as React from 'react'
import * as SignaturePad from 'react-signature-pad-wrapper'
import classNames from 'classnames'
import * as Radium from 'radium'

// Components
import ButtonsBar from '@amalto/buttons-bar'

// Utils
import { getWordings } from '@amalto/helpers'
import { BUTTON_TYPE } from '@amalto/service-helpers'

// Constants
import { WORDINGS } from './constants/wordings'

// Styles
import { Styles } from './styles'

module Signature {
    export interface Props extends React.ClassAttributes<Signature> {

        /** Signature label. */
        label?: string | JSX.Element;

        /** Default signature loaded. */
        defaultSignature?: string;

        /**
         * Set signature background-color, set transparant background only on compatible media.
         * @default "rgb(255, 255, 255)"
         */
        backgroundColor?: string;

        /** Canvas height. */
        height?: number;

        /**
         * Canvas width.
         */
        width?: number;

        /** Container class. */
        containerCss?: string;

        /**
         * If true, just display the signature and hide the buttons bar.
         * @default false
         */
        readonly?: boolean;

        /** Save signature data and return the value as a base64 formated uri. */
        saveSignature?: ( data: string ) => void;

        /**
         * Clear save image callback.
         */
        clearSignature?: () => void;

        /**
         * Triggered when canvas has been edited.
         */
        onChange?: ( data: string ) => void;

        /**
         * Language to use on the component which determine the search input's placeholder language. e.g: <span className='quote'>en-US</span>.
         * Locales available at [Locale](#locale).
         * Accessible via [WebStorage](#webstorage).
         * @default 'en-US'
         */
        locale?: string;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<Signature>;
    }

    export interface State {
        savedType: string;
        imgData: string;
        signatureClear: boolean;
        dirty: boolean;
        wordings?: { [id: string]: string };
    }
}

class Signature extends React.Component<Signature.Props, Signature.State> {

    private signaturePad = null
    private clearTimeout = null

    constructor( props: Signature.Props ) {
        super( props )
        this.state = {
            savedType: null,
            imgData: props.defaultSignature,
            signatureClear: true,
            dirty: false,
            wordings: getWordings( { WORDINGS }, props.locale || 'en-US' )
        }
    }

    render() {
        const { label, backgroundColor, containerCss, height, width, readonly } = this.props

        const { imgData } = this.state

        // Set canvas options width white background by default because some media doesn't support transaparent background.
        const canvasOptions = {
            style: { margin: 0 },
            onEnd: this.onEnd,
            backgroundColor: backgroundColor || 'rgb(255, 255, 255)'
        }

        return (
            <div className={containerCss}>

                <Radium.Style scopeSelector='.canvas-wrapper' rules={Styles.canvas_wrapper} />

                <div className='form-group'>
                    {label ? <label>{label}</label> : null}
                    <div>
                        <div className='form-control canvas-wrapper text-center mgb-5'>
                            {
                                !readonly ? (
                                    <SignaturePad
                                        ref={ref => this.signaturePad = ref} options={canvasOptions}
                                        height={height} width={width}
                                        redrawOnResize={true}
                                    />
                                ) : (
                                        <img src={imgData} />
                                    )
                            }
                        </div>
                        {!readonly ? this.generateBtnsBar() : null}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        if ( !!this.signaturePad && !!this.props.defaultSignature ) {
            this.signaturePad.fromDataURL( this.props.defaultSignature )
        }

        window.addEventListener( 'resize', this.handleResize )
    }

    componentWillUnmount() {
        window.removeEventListener( 'resize', this.handleResize )
    }

    private generateBtnsBar = (): JSX.Element => {
        const { wordings, dirty, imgData } = this.state

        const leftBtn: ButtonsBar.BtnGroupsProps = {
            btns: [
                {
                    clickAction: this.clear,
                    cssClass: BUTTON_TYPE.FONT,
                    text: wordings.clear,
                    disabled: !imgData
                },
                {
                    clickAction: this.reset,
                    cssClass: BUTTON_TYPE.FONT,
                    text: wordings.reset,
                    disabled: !dirty
                }
            ],
            cssClass: 'btn-group-xs'
        }

        const rightBtn: ButtonsBar.BtnGroupsProps = {
            btns: [
                {
                    clickAction: this.save,
                    cssClass: BUTTON_TYPE.PRIMARY,
                    text: wordings.saveToProfile,
                    disabled: !dirty
                }
            ],
            cssClass: 'btn-group-xs',
            style: { float: 'right' }
        }

        return <ButtonsBar btnGroups={[leftBtn, rightBtn]} locale={this.props.locale} />
    }

    private clear = (): void => {
        this.signaturePad.clear()

        this.setState( {
            dirty: false,
            signatureClear: this.signaturePad.isEmpty(),
            imgData: null,
        }, () => this.props.clearSignature && this.props.clearSignature() )
    }

    private reset = (): void => {
        this.signaturePad.fromDataURL( this.state.imgData )
        this.setState( { imgData: this.props.defaultSignature } )
    }

    private save = (): void => {
        this.props.saveSignature && this.props.saveSignature( this.signaturePad.toDataURL( this.state.imgData ) )
    }

    private onEnd = (): void => {
        this.setState( { dirty: true }, () => {
            this.props.onChange && this.props.onChange( this.signaturePad.toDataURL( this.state.imgData ) )
        } )
    }

    private handleResize = ( event: any ): void => {
        if ( !this.clearTimeout ) {
            this.clearTimeout = window.setTimeout( () => {
                this.clearTimeout = null
                this.state.imgData && this.signaturePad.fromDataURL( this.state.imgData )
            }, 500 )
        } else {
            window.clearTimeout( this.clearTimeout )
        }
    }
}

export default Signature
// Modules
import * as React from 'react'
import SignaturePad from 'react-signature-pad-wrapper'
import * as Radium from 'radium'

// Components
import ButtonsBar from '@amalto/buttons-bar'

// Utils
import { getWordings } from '@amalto/helpers'
import { BUTTON_TYPE } from '@amalto/service-helpers'

// Styles
import { Styles } from './styles'

module Signature {
    export interface Props {

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

    }
}

function Signature( props: Signature.Props ) {
    const { label, backgroundColor, containerCss, height, width, readonly } = props

    const _signaturePad = React.useRef( null )
    let _clearTimeout = null

    const [imgData, setImgData] = React.useState( props.defaultSignature )
    const [signatureClear, setSignatureClear] = React.useState( true )
    const [dirty, setDirty] = React.useState( false )
    const [wordings, setWordings] = React.useState( getWordings( {}, props.locale ) )

    const [clearTriggered, setClearTriggered] = React.useState( false )
    const [resetTriggered, setResetTriggered] = React.useState( false )
    const [onEndTriggered, setOnEndTriggered] = React.useState( false )
    const [shouldTriggerOnChange, setShouldTriggerOnChange] = React.useState( false )

    const onEnd = (): void => { setOnEndTriggered( true ) }

    // Set canvas options width white background by default because some media doesn't support transaparent background.
    const canvasOptions = {
        style: { margin: 0 },
        onEnd: onEnd,
        backgroundColor: backgroundColor || 'rgb(255, 255, 255)'
    }

    // Initialize
    React.useEffect( () => {
        if ( !!_signaturePad.current && !!props.defaultSignature ) {
            _signaturePad.current.fromDataURL( props.defaultSignature )
        }

        window.addEventListener( 'resize', handleResize )

        return () => window.removeEventListener( 'resize', handleResize )
    }, [] )

    // Set wordings
    React.useEffect( () => {
        setWordings( getWordings( {}, props.locale ) )
    }, [props.locale] )

    // Trigger on end event
    React.useEffect( () => {
        if ( onEndTriggered ) {
            setDirty( true )
            setImgData( _signaturePad.current.toDataURL() )
            setOnEndTriggered( false )
            setShouldTriggerOnChange( true )
        }
    }, [onEndTriggered] )

    // Trigger on change props
    React.useEffect( () => {
        if ( shouldTriggerOnChange ) {
            props.onChange && props.onChange( imgData )
            setShouldTriggerOnChange( false )
        }
    }, [shouldTriggerOnChange] )


    // Trigger clear
    React.useEffect( () => {
        if ( clearTriggered ) {
            props.clearSignature && props.clearSignature()
            setClearTriggered( false )
        }
    }, [clearTriggered] )

    // Trigger reset
    React.useEffect( () => {
        if ( resetTriggered ) {
            _signaturePad.current.fromDataURL( imgData )
            setResetTriggered( false )
        }
    }, [resetTriggered] )

    // Clear signature component
    const clear = (): void => {
        _signaturePad.current.clear()

        setDirty( false )
        setSignatureClear( _signaturePad.current.isEmpty() )
        setImgData( null )
        setClearTriggered( true )
    }


    // Reset signature
    const reset = (): void => {
        setImgData( props.defaultSignature )
        setResetTriggered( true )
    }

    // Save trigger
    const save = (): void => {
        props.saveSignature && props.saveSignature( _signaturePad.current.toDataURL( imgData ) )
    }

    // Generate buttons bar
    const generateBtnsBar = (): JSX.Element => {
        const leftBtn: ButtonsBar.BtnGroupsProps = {
            btns: [
                {
                    clickAction: clear,
                    cssClass: BUTTON_TYPE.FONT,
                    text: wordings.clear,
                    disabled: !imgData
                },
                {
                    clickAction: reset,
                    cssClass: BUTTON_TYPE.FONT,
                    text: wordings.reset
                }
            ],
            cssClass: 'btn-group-xs'
        }

        const rightBtn: ButtonsBar.BtnGroupsProps = {
            btns: [
                {
                    clickAction: save,
                    cssClass: BUTTON_TYPE.PRIMARY,
                    text: wordings.saveToProfile,
                    disabled: !dirty
                }
            ],
            cssClass: 'btn-group-xs',
            style: { float: 'right' }
        }

        return <ButtonsBar btnGroups={[leftBtn, rightBtn]} locale={props.locale} />
    }

    const handleResize = (): void => {
        if ( !_clearTimeout ) {
            _clearTimeout = window.setTimeout( () => {
                _clearTimeout = null
                imgData && _signaturePad.current.fromDataURL( imgData )
            }, 500 )
        } else {
            window.clearTimeout( _clearTimeout )
        }
    }

    return (
        <div className={containerCss}>

            <Radium.Style scopeSelector='.canvas-wrapper' rules={Styles.canvas_wrapper} />

            <div className='form-group'>
                {label ? <label>{label}</label> : null}
                <div>
                    <div className='form-control canvas-wrapper text-center mgb-5'>
                        {
                            !readonly
                                ? (
                                    <SignaturePad
                                        ref={_signaturePad} options={canvasOptions}
                                        height={height} width={width}
                                        redrawOnResize={true}
                                    />
                                )
                                : (
                                    <img src={imgData} />
                                )
                        }
                    </div>
                    {!readonly ? generateBtnsBar() : null}
                </div>
            </div>
        </div>
    )
}

export default Signature
// Modules
import * as React from 'react'
import * as SignaturePad from 'react-signature-pad-wrapper'
import classNames from 'classnames'

// Utils
import { getWordings } from '@amalto/helpers'

// Constants
import { WORDINGS } from './constants/wordings'

module Signature {
    export interface Props extends React.ClassAttributes<Signature> {

        /** Signature label. */
        label?: string | JSX.Element;

        /** Default signature loaded. */
        defaultSignature?: string;

        /** Set signature background-color, set transparant background only on compatible media. */
        backgroundColor?: string;

        /** Canvas height. */
        height?: number;

        /**
         * Canvas width.
         */
        width?: number;

        /** Container class. */
        containerCss?: string;

        /** Save signature data. */
        saveSignature: ( data: any ) => void;

        /**
         * Clear save image callback.
         */
        clearSignature?: () => void;

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
        imgData: string[];
        currentImgDataIdx: number;
        signatureClear: boolean;
        dirty: boolean;
        wordings?: { [id: string]: string };
    }
}

class Signature extends React.Component<Signature.Props, Signature.State> {

    private signaturePad = null

    constructor( props: Signature.Props ) {
        super( props )
        this.state = {
            savedType: null,
            imgData: !props.defaultSignature ? [] : [props.defaultSignature],
            currentImgDataIdx: -1,
            signatureClear: true,
            dirty: false,
            wordings: getWordings( { WORDINGS }, props.locale || 'en-US' )
        }
    }

    render() {
        const { label, backgroundColor, containerCss, height, width } = this.props

        const { dirty, currentImgDataIdx, wordings } = this.state

        const canvasOptions = {
            onEnd: this.onEnd,
            backgroundColor: backgroundColor || 'rgb(255, 255, 255)'
        }

        const style = {
            height,
            width
        }

        return (
            <div className={containerCss}>
                <div className='form-group pt-3'>
                    <label>{label}</label>
                    <div className='form-control' style={{ height: '100%' }}>
                        <SignaturePad
                            ref={ref => this.signaturePad = ref} options={canvasOptions}
                            height={height} width={width}
                            redrawOnResize={true}
                        />
                        <div className='btn-toolbar btn-group-toggle'>
                            <div className='btn-group' style={{ width: '100%' }}>

                                <div style={{ float: 'left' }}>

                                    <button type='button'
                                        className={classNames( 'btn btn-font btn-trans', {
                                            'not-allowed': !dirty
                                        } )} onClick={this.clear}>
                                        {wordings.clear}
                                    </button>

                                    <button type='button'
                                        className={classNames( 'btn btn-warning btn-trans', {
                                            'not-allowed': !dirty
                                        } )} onClick={e => this.undo()}
                                        disabled={currentImgDataIdx < 0 || !dirty}>
                                        {wordings.undo}
                                    </button>

                                </div>

                                <div style={{ float: 'right' }}>

                                    <button type='button'
                                        className={classNames( 'btn btn-primary btn-trans', {
                                            'not-allowed': !dirty
                                        } )}
                                        onClick={e => this.save()}
                                        disabled={!dirty}>
                                        {wordings.saveAsPNG}
                                    </button>

                                    <button type='button'
                                        className={classNames( 'btn btn-primary btn-trans', {
                                            'not-allowed': !dirty
                                        } )}
                                        onClick={e => this.save()}
                                        disabled={!dirty}>
                                        {wordings.saveAsJPEG}
                                    </button>

                                    <button type='button' className={classNames( 'btn btn-primary btn-trans', {
                                        'not-allowed': !dirty
                                    } )} onClick={e => this.save()} disabled={!dirty}>{wordings.saveAsSVG}</button>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        if ( !!this.signaturePad && !!this.props.defaultSignature ) {
            this.signaturePad.fromDataURL( this.props.defaultSignature )
            console.info( this.signaturePad )
        }
    }

    private onEnd = ( event: any ): void => {

        if ( event.target && event.target.getContext ) {
            const currentValue: string = event.target.getContext( '2d' ).canvas.toDataURL()

            const updatedImgData = this.state.imgData.concat( [currentValue] )

            this.state.signatureClear && this.setState( {
                dirty: true,
                imgData: updatedImgData,
                currentImgDataIdx: this.state.currentImgDataIdx + 1
            }, () => {
                this.signaturePad.fromDataURL( this.state.imgData[this.state.currentImgDataIdx] )
            } )
        }
    }

    private undo = (): void => {
        const updatedImgData = [...this.state.imgData]

        updatedImgData.pop()
        this.setState( {
            dirty: this.state.currentImgDataIdx - 1 < 0 ? false : true,
            imgData: updatedImgData,
            currentImgDataIdx: this.state.currentImgDataIdx - 1
        }, () => {
            if ( this.state.currentImgDataIdx < 0 ) {
                this.signaturePad.clear()
            } else {
                this.signaturePad.fromDataURL( this.state.imgData[this.state.currentImgDataIdx] )
            }
        } )
    }

    private clear = (): void => {
        this.signaturePad.clear()

        this.setState( {
            dirty: false,
            signatureClear: this.signaturePad.isEmpty(),
            imgData: [],
            currentImgDataIdx: -1
        }, () => this.props.clearSignature && this.props.clearSignature() )
    }

    private save = (): void => {
        this.props.saveSignature( this.signaturePad.toDataURL( this.state.imgData[this.state.currentImgDataIdx] ) )
    }
}

export default Signature
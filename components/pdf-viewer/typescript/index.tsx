import * as React from 'react'
import * as ReactDOM from 'react-dom'

import * as PDFJS from 'pdfjs-dist'

//utils
import { compileWordings } from 'helpers'

//components
import Spinner from 'spinner'
import PagingControls from 'paging-controls'

const WORDINGS = {

    'pdfviewer.error.loading': {
        'en-US': 'PDF loading error',
        'fr-FR': 'Erreur de chargement du PDF'
    }

}

namespace PdfViewer {
    export interface Props extends React.Props<PdfViewer> {
        /** Pdf to be displayed. */
        pdfSource: PDFSource;
        /** Class of the PdfViewer component. */
        containerClass?: string;
        /** Css properties to apply to PdfViewer. */
        style?: React.CSSProperties;
        /** Update value to force update. */
        reloadTick?: number;
        /** Spinner url source for the loader component. */
        spinnerSrc: string;
        /** Locale to be used. */
        locale: string;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<PdfViewer>;
    }

    export interface State {
        wordings?: { [key: string]: string };
        pdf?: PDFDocumentProxy;
        loading?: boolean;
        loadingError?: boolean;
        currentPage?: number;
    }
}

/**
 * Display pdf content.
 */
class PdfViewer extends React.Component<PdfViewer.Props, PdfViewer.State> {


    private pdfCtn: HTMLCanvasElement

    constructor( props: PdfViewer.Props ) {
        super( props )

        this.state = {
            wordings: compileWordings( WORDINGS, props.locale ),
            pdf: undefined,
            loading: false,
            loadingError: false,
            currentPage: 1
        }
    }

    render() {

        const { containerClass, style, spinnerSrc } = this.props

        const { loading, loadingError } = this.state

        return (

            <div className={containerClass} style={style}>

                {
                    loading ? <div className="padded"><Spinner src={spinnerSrc} /></div> : ( loadingError ? (
                        <div className="padded">
                            <div className="text-medium danger-color" style={{ lineHeight: '22px' }}>
                                <span className="fa fa-exclamation-triangle right-spaced" />
                                <span>{this.state.wordings['pdfviewer.error.loading']}</span>
                            </div>
                        </div> ) : (
                            <div>
                                {this.getPagingControls()}
                                <canvas ref={canvas => this.pdfCtn = canvas} />
                            </div>
                        )
                    )
                }

            </div>

        )
    }

    componentDidMount() {
        if ( this.props.pdfSource ) {
            this.loadPDF()
        }
    }

    componentWillUnmount() {
        if ( this.state.pdf ) {
            this.state.pdf.destroy()
        }
    }

    componentDidUpdate( prevProps: PdfViewer.Props ) {
        if ( prevProps.reloadTick !== this.props.reloadTick && this.props.pdfSource ) {
            this.loadPDF()
        }
    }

    private getPagingControls = () => {
        const { pdf, currentPage } = this.state

        if ( pdf ) {
            return (
                <div className="btn-toolbar-centered bottom-spaced">
                    <PagingControls containerClass="btn-group btn-group-sm"
                        totalPages={pdf.numPages || 1}
                        currentPage={currentPage}
                        handlePageChange={this.renderPage}
                        locale={this.props.locale}
                    />
                </div>
            )
        }

        return null

    }

    private loadPDF = async () => {

        this.setState( {
            loading: true
        } )

        const { pdfSource } = this.props

        try {
            const pdf = await PDFJS.getDocument( pdfSource )

            this.setState( {
                pdf,
                loading: false
            }, () => {
                this.renderPage( 1 )
            } )

        }
        catch ( e ) {
            console.error( 'Failed loading PDF', e )

            this.setState( {
                loading: false,
                loadingError: true
            } )
        }

    }

    private renderPage = async ( pageNumber: number, scale?: number ) => {

        const { pdf } = this.state

        const renderedScale = scale || 1.5

        if ( pdf ) {

            try {
                const page = await pdf.getPage( pageNumber )

                let viewport = page.getViewport( renderedScale )

                let canvas = this.pdfCtn
                let context = canvas.getContext( '2d' )

                canvas.height = viewport.height
                canvas.width = viewport.width

                let renderContext = {
                    canvasContext: context,
                    viewport: viewport
                }

                await page.render( renderContext )

                this.setState( {
                    currentPage: pageNumber
                } )
            }
            catch ( e ) {
                console.error( 'Failed rendering PDF page', e )
            }

        }

    }

}


export default PdfViewer

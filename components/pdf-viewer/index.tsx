// Modules
import * as React from 'react'
import * as PDFJS from 'pdfjs-dist'

// Utils
import { compileWordings } from '@amalto/helpers'

// Wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings'

// Components
import Spinner from '@amalto/spinner'
import PagingControls from '@amalto/paging-controls'

/**
 * Display pdf content.
 */
namespace PdfViewer {
    export interface Props extends React.Props<PdfViewer> {
        /** Pdf data. More details on [PDFSource](http://localhost:6060/#pdfsource). */
        pdfSource: PDFSource;
        /** Class of the PdfViewer component. */
        containerClass?: string;
        /** React CSS properties object to apply to PdfViewer. */
        style?: React.CSSProperties;
        /** Update value to force update. */
        reloadTick?: number;
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

class PdfViewer extends React.Component<PdfViewer.Props, PdfViewer.State> {


    private pdfCtn: HTMLCanvasElement

    constructor( props: PdfViewer.Props ) {
        super( props )

        this.state = {
            wordings: compileWordings( MULTILANGUAGE_WORDINGS, props.locale ),
            pdf: undefined,
            loading: false,
            loadingError: false,
            currentPage: 1
        }
    }

    render() {

        const { containerClass, style } = this.props

        const { loading, loadingError } = this.state

        return (

            <div className={containerClass} style={style}>

                {
                    loading ? <div className="padded"><Spinner /></div> : ( loadingError ? (
                        <div className="padded">
                            <div className="text-medium danger-color" style={{ lineHeight: '22px' }}>
                                <span className="fa fa-exclamation-triangle right-spaced" />
                                <span>{this.state.wordings['pdfviewer.error.loading']}</span>
                            </div>
                        </div> ) : (
                            <div>
                                {this.getPagingControls()}
                                <canvas ref={dom => this.pdfCtn = dom} />
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

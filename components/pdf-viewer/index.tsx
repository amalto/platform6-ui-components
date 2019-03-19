// Modules
import * as React from 'react'
import * as PDFJS from 'pdfjs-dist'

PDFJS.workerSrc = require( 'pdfjs-dist/build/pdf.worker.entry.js' )

// Utils
import { getWordings } from '@amalto/helpers'

// Components
import Spinner from '@amalto/spinner'
import PagingControls from '@amalto/paging-controls'

/**
 * Display pdf content.
 * 
 * PdfViewer uses [WebStorage](#webstorage)'s properties
 * which are accessible at the root component of your service.
 */
namespace PdfViewer {
    export interface Props {
        /** Pdf data. More details on [PDFSource](#pdfsource). */
        pdfSource: PDFSource;
        /** CSS class wrapping the component. */
        containerClass?: string;
        /** React CSS properties object to apply to PdfViewer. */
        style?: React.CSSProperties;
        /** Update value to force update. */
        reloadTick?: number;
        /**
         * Language to use on the component. e.g: <span className='quote'>en-US</span>.
         * Locales available at [Locale](#locale).
         * Accessible via [WebStorage](#webstorage).
         */
        locale: string;
    }

    export interface State {
        wordings?: { [key: string]: string };
        pdf?: PDFDocumentProxy;
        loading?: boolean;
        loadingError?: boolean;
        currentPage?: number;
    }
}

function PdfViewer( props: PdfViewer.Props ) {
    const { containerClass, style, locale } = props

    const [shouldRenderPage, setShouldRenderPage] = React.useState( false )
    const [wordings, setWordings] = React.useState( {} as any )
    const [loading, setLoading] = React.useState( false )
    const [loadingError, setLoadingError] = React.useState( false )
    const [currentPage, setCurrentPage] = React.useState( 1 )
    const [pdf, setPdf] = React.useState( undefined )
    const pdfCtn = React.useRef( null )

    React.useEffect( () => {
        setWordings( getWordings( {}, props.locale ) )
    }, [props.locale] )

    React.useEffect( () => {
        if ( !props.pdfSource ) {
            loadPDF( props, { setLoading, setPdf, setShouldRenderPage, setLoadingError } )
        }

        return pdf && pdf.destroy()
    }, [] )

    React.useEffect( () => {
        if ( props.pdfSource ) {
            loadPDF( props, { setLoading, setPdf, setShouldRenderPage, setLoadingError } )
        }
    }, [props.reloadTick] )

    React.useEffect( () => {
        if ( !!shouldRenderPage ) {
            renderPage( pdf, pdfCtn, setCurrentPage, 1 )
        }
    }, [shouldRenderPage] )

    const handlePageChange = ( pageNumber: number, scale?: number ): void => {
        renderPage( pdf, pdfCtn, setCurrentPage, pageNumber, scale )
    }

    return (

        <div className={containerClass} style={style}>

            {
                loading ? <div className="padded"><Spinner /></div> : ( loadingError ? (
                    <div className="padded">
                        <div className="text-medium danger-color" style={{ lineHeight: '22px' }}>
                            <span className="fas fa-exclamation-triangle right-spaced" />
                            <span>{wordings.pdfLoadingError}</span>
                        </div>
                    </div> ) : (
                        <div>
                            {getPagingControls( pdf, currentPage, handlePageChange, locale )}
                            <canvas ref={pdfCtn} />
                        </div>
                    )
                )
            }

        </div>

    )
}

function getPagingControls( pdf: PDFDocumentProxy, currentPage: number, handlePageChange: ( pageNumber: number, scale?: number ) => void, locale: string ): JSX.Element {
    if ( pdf ) {
        return (
            <div className="btn-toolbar-centered bottom-spaced">
                <PagingControls containerClass="btn-group btn-group-sm"
                    totalPages={pdf.numPages || 1}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    locale={locale}
                />
            </div>
        )
    }

    return null

}

async function loadPDF(
    props: PdfViewer.Props,
    methods: {
        setLoading: ( loading: boolean ) => void,
        setPdf: ( pdf: PDFDocumentProxy ) => void,
        setShouldRenderPage: ( renderPage: boolean ) => void,
        setLoadingError: ( loadingError: boolean ) => void
    }
) {

    const { setLoading, setPdf, setShouldRenderPage, setLoadingError } = methods

    setLoading( true )

    const { pdfSource } = props

    try {
        const pdf = await PDFJS.getDocument( pdfSource )

        setPdf( pdf )
        setLoading( false )
        setShouldRenderPage( true )
    }
    catch ( e ) {
        console.error( 'Failed loading PDF', e )

        setLoading( false )
        setLoadingError( true )
    }

}

async function renderPage( pdf: PDFDocumentProxy, pdfCtn: React.MutableRefObject<HTMLCanvasElement>, setCurrentPage: ( page: number ) => void, pageNumber: number, scale?: number ) {

    const renderedScale = scale || 1.5

    if ( pdf ) {

        try {
            const page = await pdf.getPage( pageNumber )

            let viewport = page.getViewport( renderedScale )

            let canvas = pdfCtn.current
            let context = canvas.getContext( '2d' )

            canvas.height = viewport.height
            canvas.width = viewport.width

            let renderContext = {
                canvasContext: context,
                viewport: viewport
            }

            await page.render( renderContext )

            setCurrentPage( pageNumber )
        }
        catch ( e ) {
            console.error( 'Failed rendering PDF page', e )
        }

    }

}

export default PdfViewer

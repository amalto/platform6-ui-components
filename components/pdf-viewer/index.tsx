// Modules
import * as React from 'react';
import * as PDFJS from 'pdfjs-dist';

const worker = require('pdfjs-dist/build/pdf.worker.entry.js');

PDFJS.GlobalWorkerOptions.workerSrc = worker;

// Utils
import { compileWordings } from '@amalto/helpers';

// Wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings';

// Components
import Spinner from '@amalto/spinner';
import PagingControls from '@amalto/paging-controls';

/**
 * Display pdf content.
 *
 * PdfViewer uses [WebStorage](#webstorage)'s properties
 * which are accessible at the root component of your service.
 */
namespace PdfViewer {
  export interface Props extends React.ClassAttributes<PdfViewer> {
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
    pdf?: PDFJS.PDFDocumentProxy;
    loading?: boolean;
    loadingError?: boolean;
    currentPage?: number;
  }
}

class PdfViewer extends React.Component<PdfViewer.Props, PdfViewer.State> {
  private pdfCtn: HTMLCanvasElement;

  constructor(props: PdfViewer.Props) {
    super(props);

    this.state = {
      wordings: compileWordings(MULTILANGUAGE_WORDINGS, props.locale),
      pdf: undefined,
      loading: false,
      loadingError: false,
      currentPage: 1,
    };
  }

  render() {
    const { containerClass, style } = this.props;

    const { loading, loadingError, wordings } = this.state;

    return (
      <div className={containerClass} style={style}>
        {loading ? (
          <div className="padded">
            <Spinner />
          </div>
        ) : loadingError ? (
          <div className="padded">
            <div
              className="text-medium danger-color"
              style={{ lineHeight: '22px' }}
            >
              <span className="fas fa-exclamation-triangle right-spaced" />
              <span>{wordings.pdfLoadingError}</span>
            </div>
          </div>
        ) : (
          <div>
            {this.getPagingControls()}
            <canvas ref={(dom) => (this.pdfCtn = dom)} />
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    if (this.props.pdfSource) {
      this.loadPDF();
    }
  }

  componentWillUnmount() {
    const { pdf } = this.state;

    pdf?.destroy();
  }

  componentDidUpdate(prevProps: PdfViewer.Props) {
    const { pdfSource, reloadTick } = this.props;

    if (prevProps.reloadTick !== reloadTick && pdfSource) {
      this.loadPDF();
    }
  }

  private getPagingControls = () => {
    const { locale } = this.props;
    const { pdf, currentPage } = this.state;

    if (pdf) {
      return (
        <div className="btn-toolbar-centered bottom-spaced">
          <PagingControls
            containerClass="btn-group btn-group-sm"
            totalPages={pdf?.numPages ?? 1}
            currentPage={currentPage}
            handlePageChange={this.renderPage}
            locale={locale}
          />
        </div>
      );
    }

    return null;
  };

  private loadPDF = async () => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { pdfSource } = this.props;

        try {
          const pdf = await PDFJS.getDocument(pdfSource);

          this.setState({ pdf, loading: false }, () => this.renderPage(1));
        } catch (e) {
          console.error('Failed loading PDF', e);

          this.setState({
            loading: false,
            loadingError: true,
          });
        }
      },
    );
  };

  private renderPage = async (pageNumber: number, scale?: number) => {
    const { pdf } = this.state;
    const renderedScale = scale ?? 1.5;

    if (pdf) {
      pdf
        .getPage(pageNumber)
        .then((page) => {
          const viewport = page.getViewport(renderedScale);
          const canvas = this.pdfCtn;
          const context = canvas.getContext('2d');

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          return page.render(renderContext);
        })
        .then(() => this.setState({ currentPage: pageNumber }))
        .catch((e) => console.error('Failed rendering page', e));
    }
  };
}

export default PdfViewer;

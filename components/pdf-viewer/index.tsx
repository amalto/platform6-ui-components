import * as React from 'react';

/**
 * Display pdf content.
 *
 * PdfViewer uses [WebStorage](#webstorage)'s properties
 * which are accessible at the root component of your service.
 */
namespace PdfViewer {
  export interface Props extends React.ClassAttributes<PdfViewer> {
    /** CSS class wrapping the component. */
    containerClass?: string;
    /** Pdf base64 content. */
    data?: string;
    /** Form name */
    form?: string;
    /**
     * Container height
     * @default 1250
     */
    height?: number | string;
    /** Container name */
    name?: string;
    /** React CSS properties object to apply to PdfViewer. */
    style?: React.CSSProperties;
    /** Pdf url */
    url?: string;
    /**
     * Container width
     * @default 830
     */
    width?: number | string;
    /** Hide props from documentation */

    /** @ignore */
    children?: React.ReactNode;
    /** @ignore */
    key?: React.ReactText;
    /** @ignore */
    ref?: React.Ref<PdfViewer>;
  }
}

class PdfViewer extends React.Component<PdfViewer.Props> {
  constructor(props: PdfViewer.Props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.setPdfData = this.setPdfData.bind(this);
  }

  private getData(): string {
    const { data, url } = this.props;

    if (url) {
      return url;
    }

    return `data:application/pdf;base64,${data}`;
  }

  private setPdfData(): JSX.Element | null {
    const { containerClass, form, height, name, style, width } = this.props;

    try {
      return (
        <object
          className={containerClass}
          data={this.getData()}
          form={form}
          height={height ?? 1250}
          name={name}
          style={style}
          type="application/pdf"
          width={width ?? 830}
        ></object>
      );
    } catch (e) {
      console.error('Error while displaying pdf', e);
    }
  }

  render(): JSX.Element | null {
    return this.setPdfData();
  }
}

export default PdfViewer;

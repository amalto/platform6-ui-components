// Modules
import * as React from 'react';
import { FormattedNumber } from 'react-intl';
import { default as classNames } from 'classnames';

// Utils
import { compileWordings } from '@amalto/helpers';

// Wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings';

/**
 * Page navigation toolbar.
 *
 * PagingControls uses [WebStorage](#webstorage)'s properties
 * which are accessible at the root component of your service.
 */
module PagingControls {
  export interface Props extends React.ClassAttributes<PagingControls> {
    /** CSS class wrapping the component. */
    containerClass?: string;
    /** Current page selected. */
    currentPage: number;
    /** Total page */
    totalPages: number;
    /** Method triggered when changing page. */
    handlePageChange: (newPage: number | string) => void;
    /** Get previous and next context from the <span className='quote'>handlePageChange</span> props. */
    byContext?: {
      prevContextToken: string;
      nextContextToken: string;
    };
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
    ref?: React.Ref<PagingControls>;
  }

  export interface State {
    wordings?: { [key: string]: string };
  }
}

class PagingControls extends React.Component<
  PagingControls.Props,
  PagingControls.State
> {
  private goToPageInput: HTMLInputElement;

  constructor(props: PagingControls.Props) {
    super(props);
    this.state = {
      wordings: compileWordings(MULTILANGUAGE_WORDINGS, props.locale),
    };
    this.goToPageInput = undefined;
  }

  render() {
    const { wordings } = this.state;

    const { containerClass, currentPage, totalPages, byContext } = this.props;

    //basic paging control by page number
    let prevDisabled = currentPage === 1;
    let nextDisabled = totalPages === 1 || currentPage === totalPages;

    //paging control by context tokens
    if (byContext) {
      prevDisabled = !byContext.prevContextToken;
      nextDisabled = !byContext.nextContextToken;
    }

    return totalPages !== 1 ? (
      <div className={containerClass}>
        {byContext ? null : (
          <button
            type="button"
            disabled={prevDisabled}
            className="btn btn-primary btn-trans"
            onClick={this.goToFirstPage}
          >
            <span className="fas fa-fw fa-fast-backward"></span>
          </button>
        )}

        <button
          type="button"
          disabled={prevDisabled}
          className="btn btn-primary btn-trans"
          onClick={this.goToPrevPage}
        >
          <span className="fas fa-fw fa-backward"></span>
        </button>

        <span className="btn btn-primary btn-trans text-element no-border-right">
          <span className="right-spaced">{wordings.page}</span>
          <strong className="right-spaced">
            {byContext ? (
              <FormattedNumber value={currentPage} />
            ) : (
              <input
                type="text"
                size={totalPages.toString().length}
                value={currentPage}
                onChange={this.handleGoToPageInput}
                ref={(input) => (this.goToPageInput = input)}
                onFocus={() => {
                  this.goToPageInput.select();
                }}
              />
            )}
          </strong>
          <span className="right-spaced">{wordings.of}</span>
          <span>
            <FormattedNumber value={totalPages} />
          </span>
        </span>

        <button
          type="button"
          disabled={nextDisabled}
          className="btn btn-primary btn-trans"
          onClick={this.goToNextPage}
        >
          <span className="fas fa-fw fa-forward"></span>
        </button>

        {byContext ? null : (
          <button
            type="button"
            disabled={nextDisabled}
            className="btn btn-primary btn-trans"
            onClick={this.goToLastPage}
          >
            <span className="fas fa-fw fa-fast-forward"></span>
          </button>
        )}
      </div>
    ) : null;
  }

  private handleGoToPageInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { totalPages, handlePageChange } = this.props;
    if (
      /^\d+$/.test(event.target.value) &&
      parseInt(event.target.value) > 0 &&
      parseInt(event.target.value) <= totalPages
    ) {
      handlePageChange(parseInt(event.target.value));
    } else {
      this.goToPageInput.blur();
    }
  };

  private goToFirstPage = (event: any): void => {
    $(event.currentTarget).blur(); //removes active state on the button
    this.props.handlePageChange(1);
  };

  private goToNextPage = (event: any): void => {
    $(event.currentTarget).blur();

    const { byContext, handlePageChange } = this.props;

    if (byContext) {
      handlePageChange(byContext.nextContextToken);
    } else {
      handlePageChange(this.props.currentPage + 1);
    }
  };

  private goToPrevPage = (event: any): void => {
    $(event.currentTarget).blur();

    const { byContext, handlePageChange } = this.props;

    if (byContext) {
      handlePageChange(byContext.prevContextToken);
    } else {
      handlePageChange(this.props.currentPage - 1);
    }
  };

  private goToLastPage = (event: any): void => {
    $(event.currentTarget).blur();
    this.props.handlePageChange(this.props.totalPages);
  };
}

export default PagingControls;

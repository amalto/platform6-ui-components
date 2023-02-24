import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MapStateToProps, connect } from 'react-redux';

//utils & stores
import { compileWordings } from '@amalto/helpers';
import GlobalState from '../GlobalState';
import DialogState from './DialogState';

//wordings
import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings';

//modules
import { default as classNames } from 'classnames';

//actions
import { hideDialog } from './DialogActions';

export interface Props extends React.ClassAttributes<Dialog>, DialogState {}

export interface State {
  wordings?: { [id: string]: string };
}

class Dialog extends React.Component<any, State> {
  public static select: MapStateToProps<any, any> = (
    state: GlobalState /*, ownProps?: any*/,
  ): Props => {
    return state.dialog;
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      wordings: compileWordings(MULTILANGUAGE_WORDINGS, 'en-US'),
    };
  }

  render() {
    const {
      body,
      confirmAction,
      confirmButtonLevel,
      isLarge,
      itemsList,
      title,
    } = this.props;
    const { wordings } = this.state;

    let confirmButtonClasses = confirmButtonLevel
      ? 'btn btn-' + confirmButtonLevel
      : 'btn btn-danger';

    let actionButtons = confirmAction ? (
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-font btn-trans"
          onClick={this.cancelFunction}
        >
          {wordings.cancel}
        </button>
        <button
          type="button"
          className={confirmButtonClasses}
          onClick={this.confirmFunction}
        >
          {wordings.ok}
        </button>
      </div>
    ) : null;

    return (
      <div className="modal fade">
        <div className={classNames('modal-dialog', { 'modal-lg': isLarge })}>
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={this.cancelFunction}
              >
                <span>&times;</span>
              </button>
              <h4 className="modal-title">{title || ''}</h4>
            </div>
            <div className="modal-body">
              {body || ''}
              {itemsList && itemsList.length ? (
                <ul className="basic-list top-margin no-bottom-margin">
                  {itemsList.map((item, idx) => {
                    return <li key={idx}>{item}</li>;
                  })}
                </ul>
              ) : null}
            </div>
            {actionButtons}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.isShowing) {
      $(ReactDOM.findDOMNode(this)).modal('show');
    } else {
      $(ReactDOM.findDOMNode(this)).modal('hide');
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isShowing) {
      $(ReactDOM.findDOMNode(this)).modal('show');
    } else {
      $(ReactDOM.findDOMNode(this)).modal('hide');
    }
    $(ReactDOM.findDOMNode(this)).on('shown.bs.modal', (e) =>
      this.modalCallbackFunction(e, nextProps),
    );
  }

  componentWillUnmount() {
    $(ReactDOM.findDOMNode(this)).on('shown.bs.modal', (e) =>
      this.modalCallbackFunction(e, this.props as Props),
    );
  }

  private modalCallbackFunction = (event: any, props: Props): void => {
    event.stopPropagation();
    props?.modalReadyCallback();
  };

  private cancelFunction = (event: any): void => {
    event.stopPropagation();

    this.props.dispatch(hideDialog());
    if (this.props.cancelAction) {
      this.props.dispatch(this.props.cancelAction);
    }
  };

  private confirmFunction = (event: any): void => {
    event.stopPropagation();

    this.props.dispatch(hideDialog());
    if (this.props.confirmAction) {
      this.props.dispatch(this.props.confirmAction);
    }
  };
}

export default connect(Dialog.select)(Dialog);

// Modules
import * as React from 'react';
import { default as classNames } from 'classnames';

/**
 * This component is generally used next to input's label. See [RadioInput](#radioinput)
 */
namespace Help {
  export interface Props extends React.ClassAttributes<Help> {
    /** CSS class wrapping the component. */
    containerClass?: string;
    /** CSS properties. */
    style?: React.CSSProperties;
    /** Content of the help tooltip. */
    text: string;

    /** Hide props from documentation */

    /** @ignore */
    children?: React.ReactNode;
    /** @ignore */
    key?: React.ReactText;
    /** @ignore */
    ref?: React.Ref<Help>;
  }
}

class Help extends React.Component<Help.Props, any> {
  private _helpPopup = (HTMLSpanElement = null);

  render() {
    return (
      <span
        className={classNames(
          'fas fa-fw fa-question-circle default-color',
          this.props.containerClass,
        )}
        data-content={this.props.text}
        ref={(dom) => (this._helpPopup = dom)}
        style={this.props.style}
      ></span>
    );
  }

  componentDidMount() {
    $(this._helpPopup).popover({
      container: 'body',
      trigger: 'hover',
      html: true,
    });
  }

  componentWillUnmount() {
    $(this._helpPopup).popover('destroy');
  }
}

export default Help;

import * as React from 'react';
import { default as classNames } from 'classnames';

/**
 * Customisable Container.
 */
module Container {
  export interface Props extends React.ClassAttributes<Container> {
    /** Container css */
    mainCss?: string;

    /** Container style */
    mainStyle?: React.CSSProperties;

    /** Background color */
    backgroundColor: string;

    /** Dimension */
    height?: number | string;

    children?: React.ReactNode;

    /** Hide props from documentation */

    /** @ignore */
    key?: React.ReactText;
    /** @ignore */
    ref?: React.Ref<Container>;
  }
}

class Container extends React.Component<Container.Props, any> {
  constructor(props: Container.Props) {
    super(props);
  }

  render() {
    const { mainCss, mainStyle, backgroundColor, height, children } = this.props;

    return (
      <section className={mainCss} style={{ backgroundColor, height, ...mainStyle }}>
        {children}
      </section>
    );
  }
}

export default Container;

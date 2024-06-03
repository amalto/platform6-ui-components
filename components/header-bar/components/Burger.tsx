import * as React from 'react';
import { default as classNames } from 'classnames';
import Radium from 'radium';

import { styles } from '../styles/burger';

/**
 * Customisable Burger.
 */
module Burger {
  export interface Props extends React.ClassAttributes<Burger> {
    /** Burger css */
    mainCss?: string;

    /** Burger style */
    mainStyle?: React.CSSProperties;

    /** Burger click action */
    burgerAction: () => void;

    /** Hide props from documentation */

    /** @ignore */
    children?: React.ReactNode;
    /** @ignore */
    key?: React.ReactText;
    /** @ignore */
    ref?: React.Ref<Burger>;
  }
}

class Burger extends React.Component<Burger.Props, any> {
  constructor(props: Burger.Props) {
    super(props);
  }

  render() {
    const { mainCss, mainStyle, burgerAction } = this.props;

    return (
      <div
        className={mainCss}
        style={{
          display: 'table',
          position: 'relative',
          height: '100%',
          ...mainStyle,
        }}
      >
        <Radium.StyleRoot style={{ display: 'table-cell', verticalAlign: 'middle' }}>
          <button
            style={{
              padding: 20,
              height: '100%',
              border: 'none',
              backgroundColor: '#fff',
              outline: 'none',
              ...styles.hover,
            }}
            onClick={burgerAction}
            type="button"
          >
            <span className="fas fa-bars" style={{ color: '#3a3a3a' }} />
          </button>
        </Radium.StyleRoot>
      </div>
    );
  }
}

export default Radium(Burger);

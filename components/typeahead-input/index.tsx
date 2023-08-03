// Modules
import { isNotEmpty } from '@amalto/helpers';
import { default as classNames } from 'classnames';
import * as React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

/**
 * Typeahead input displaying a filtered dropdown list from your input and your collection.
 */
interface Props extends React.ClassAttributes<TypeaheadInput> {
  /** Div id. */
  id: string;
  /** Collection of item to be display inside the dropdown list. */
  collection: string[];
  /** Input's value. */
  value?: any;
  /** Input's <span className='quote'>onChange</span> event. */
  handleInputChange: (value: any) => void;
  /** Input's placeholder. */
  placeholder?: string;
  /** Current collection type. */
  selectedCollectionType?: string;
  /** Define the collection type which will display different results on the dropdown list. */
  collectionTypes?: string[];
  /** Update collection type. */
  setCollectionType?: (collectionType: string) => void;

  /** Hide props from documentation */

  /** @ignore */
  children?: React.ReactNode;
  /** @ignore */
  key?: React.ReactText;
  /** @ignore */
  ref?: React.Ref<TypeaheadInput>;
}

interface State {
  shouldDisplayDropdown: boolean;
}

interface RemoteConfig {
  url: string;
  prepare?: (
    query: string,
    settings: JQueryAjaxSettings,
  ) => JQueryAjaxSettings;
  wildcard?: string;
  rateLimitby?: string;
  rateLimitWait?: number;
  transform?: (response: any) => any;
}

class TypeaheadInput extends React.Component<
  Props,
  State
> {
  private root: HTMLDivElement | undefined;

  constructor(props: Props) {
    super(props);

    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.renderTypeahead = this.renderTypeahead.bind(this);
    this.state = {
      shouldDisplayDropdown:
        isNotEmpty(props.selectedCollectionType) &&
        !!props.collectionTypes &&
        !!props.setCollectionType,
    };
  }

  private handleInputBlur(event: any): void {
    const { handleInputChange } = this.props;
    const currentValue: string = event.target.value;

    if (!currentValue || currentValue.length === 0) {
      handleInputChange(null);
    }
  };

  private renderTypeahead(): JSX.Element {
    const {
      id,
      collection,
      handleInputChange,
      placeholder,
      value,
    } = this.props;

    return (
      <Typeahead<string>
        id={`${id}_typeahead`}
        inputProps={{ name: id, style: { flex: 'auto' } }}
        onBlur={this.handleInputBlur}
        onInputChange={handleInputChange}
        options={collection}
        placeholder={placeholder}
        selected={[value ?? '']}
      />
    );
  }

  componentDidMount(): void {
    const typeaheadWrapper =
      this.root.getElementsByClassName('rbt clearfix open')[0];

    typeaheadWrapper?.setAttribute('style', 'position: relative; flex: auto;');
  }

  render(): JSX.Element {
    const {
      id,
      collectionTypes,
      selectedCollectionType,
      setCollectionType,
    } = this.props;

    const { shouldDisplayDropdown } = this.state;

    return (
      <div
        id={id}
        className="clearfix"
        ref={(dom) => (this.root = dom)}
        style={{ display: 'flex' }}
      >
        {this.renderTypeahead()}
        {shouldDisplayDropdown ? (
          <div className="btn btn-group btn-group-sm mgt-0 mgl-0 padding-none input-suffix">
            <button
              type="button"
              className="btn btn-info dropdown-toggle full-width ellipsis"
              data-toggle="dropdown"
            >
              <span className="right-spaced">{selectedCollectionType}</span>
              <span
                className="caret"
                style={{
                  right: 5,
                  position: 'absolute',
                  top: '50%',
                }}
              ></span>
            </button>

            <ul className="dropdown-menu">
              {collectionTypes.map((type) => (
                <li
                  key={`collection-${type}-line`}
                  className={classNames({
                    active: selectedCollectionType === type,
                  })}
                >
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCollectionType(type);
                    }}
                  >
                    {type}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

export default TypeaheadInput;

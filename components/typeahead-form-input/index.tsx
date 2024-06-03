// Modules
import * as React from 'react';
import { WrappedFieldProps, Field, BaseFieldProps, WrappedFieldMetaProps } from 'redux-form';
import { default as classNames } from 'classnames';

// Components
import Help from '@amalto/help';
import Typeahead from '@amalto/typeahead-input';

/**
 * Typeahead input used on a [redux-form](#reduxform).
 */
namespace TypeaheadFormInput {
  export interface Props extends BaseFieldProps {
    /** Input's name. */
    name: string;
    /** Collection of item to be display inside the dropdown list. */
    collection: string[];
    /** Form input label. */
    label?: string | JSX.Element;
    /** Input's placeholder. */
    placeholder?: string;
    /** Tooltip help displayed when hovering the <span className='quote'>?</span> icon next to label. */
    help?: string;
    /** CSS class wrapping the component. */
    containerClass?: string;
    /**
     * Remove the bottom margin which is the default height of the error message
     * displayed when input is invalid.
     * @default false
     */
    collapseErrorSpace?: boolean;

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
    ref?: React.Ref<TypeaheadFormInput>;

    /** redux-form props */

    /** @ignore */
    component?: any;
    /** @ignore */
    format?: any;
    /** @ignore */
    normalize?: any;
    /** @ignore */
    props?: any;
    /** @ignore */
    parse?: any;
    /** @ignore */
    validate?: any;
    /** @ignore */
    warn?: any;
    /** @ignore */
    withRef?: any;
  }
}

class TypeaheadFormInput extends React.Component<TypeaheadFormInput.Props> {
  private renderInput = (field: WrappedFieldProps<any>) => {
    const {
      name,
      containerClass,
      collection,
      placeholder,
      selectedCollectionType,
      collectionTypes,
      setCollectionType,
    } = this.props;

    const { input, meta } = field;

    return (
      <div
        className={classNames('form-group', containerClass, {
          invalid: meta.touched && !!meta.error,
        })}
      >
        {this.renderLabel()}
        <Typeahead
          id={name}
          collection={collection}
          value={input.value}
          handleInputChange={input.onChange}
          placeholder={placeholder}
          selectedCollectionType={selectedCollectionType}
          collectionTypes={collectionTypes}
          setCollectionType={setCollectionType}
        />
        {this.renderErrorMsg(meta)}
      </div>
    );
  };

  private renderLabel = (): JSX.Element | null => {
    const { help, label } = this.props;

    return label ? (
      <label>
        {label}
        {help && <Help text={help} />}
      </label>
    ) : null;
  };

  private renderErrorMsg = (meta: WrappedFieldMetaProps<any>): JSX.Element | null => {
    const { collapseErrorSpace } = this.props;

    if (meta.touched && !!meta.error) {
      return <p className="validation-error-message">{meta.error}</p>;
    }

    return collapseErrorSpace ? null : <p className="validation-error-message">&nbsp;</p>;
  };

  render() {
    const { name, format, normalize, parse, validate, warn } = this.props;
    const baseFieldProps: BaseFieldProps = {
      name,
      format,
      normalize,
      parse,
      validate,
      warn,
    };

    return name ? <Field {...baseFieldProps} component={this.renderInput} /> : null;
  }
}

export default TypeaheadFormInput;

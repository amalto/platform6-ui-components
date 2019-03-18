/**
 * Created by franckmontaigne on 04/08/15.
 */

// Modules
import * as React from 'react'

//components & models
import { Option } from './models/Option'
import DropdownInput from './components/DropdownInput'

module MultiSelect {
    export interface Props {

        /** Input label name. */
        name: string;

        /** Input's label. */
        label: string | JSX.Element;

        /** Choice list. */
        options: Option[];

        /**
         * Whether or not the input is disabled.
         * @default false
         */
        // disabled?: boolean;

        /** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
        help?: string;

        /** CSS class wrapping the component. */
        containerClass?: string;

        /** CSS class applied to every input from the list. */
        inputClass?: string;

        fieldLineHeight?: number;

        /** Allow multiple selection. */
        multiple?: boolean;

        /** Current selection. If multiple is set to true, must be an array of string. */
        value?: string | string[];

        /** Initial selection. If multiple is set to true, must be an array of string. */
        initialValue?: string | string[];

        /** Triggered when selecting an option. */
        handleChange: ( event: any ) => void;

        /**
         * Language to use on the component. e.g: <span className='quote'>en-US</span>.
         * Locales available at [Locale](#locale).
         * Accessible via [WebStorage](#webstorage).
         * @default: 'en-US'
         */
        locale?: string;
    }

    export interface State {
        locale?: string;
    }
}

function MultiSelect( props: MultiSelect.Props ) {
    const {
        label,
        value,
        options,
        handleChange,
        multiple,
        fieldLineHeight,
        help,
        containerClass,
        inputClass
    } = props

    const renderDropdownInput = (
        filterDisplayName: string | JSX.Element,
        value?: string | string[],
        optionsLabel?: string[]
    ) => {
        const dropdownProps: DropdownInput.Props = {
            filterDisplayName,
            value,
            name,
            label,
            options,
            optionsLabel,
            handleChange,
            multiple,
            fieldLineHeight,
            help,
            containerClass,
            inputClass
        }

        return <DropdownInput {...dropdownProps} />
    }

    return renderDropdownInput( label, value, options.map( o => o.label ) )
}

export default MultiSelect
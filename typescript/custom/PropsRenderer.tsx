// Modules
import * as React from 'react'
import Group from 'react-group'
const javascriptStringify = require('javascript-stringify')

// Components
import Table from 'react-styleguidist/lib/rsg-components/Table'
import Name from 'react-styleguidist/lib/rsg-components/Name'
import Type from 'react-styleguidist/lib/rsg-components/Type'
import Text from 'react-styleguidist/lib/rsg-components/Text'
import Code from 'react-styleguidist/lib/rsg-components/Code'
import Markdown from 'react-styleguidist/lib/rsg-components/Markdown'
import Para from 'react-styleguidist/lib/rsg-components/Para'
import JsDoc from 'react-styleguidist/lib/rsg-components/JsDoc'
import Argument from 'react-styleguidist/lib/rsg-components/Argument'
import Arguments from 'react-styleguidist/lib/rsg-components/Arguments'

// Utils
import { unquote, getType, showSpaces } from 'react-styleguidist/lib/rsg-components/Props/util'

module PropsRenderer {
    export interface Props extends React.ClassAttributes<PropsRenderer> {
        props: any[];
    }
}

class PropsRenderer extends React.Component<PropsRenderer.Props, any> {
    constructor( props: PropsRenderer.Props ) {
        super( props )
        this.state = {}
    }

    render() {
        const columns = [
            { caption: 'Prop name', render: this.renderName },
            {
                caption: 'Type',
                render: this.renderTypeColumn
            },
            {
                caption: 'Default',
                render: this.renderDefault
            },
            {
                caption: 'Description',
                render: this.renderDescription
            },
        ]

        return <Table columns={columns} rows={this.props.props} getRowKey={this.getRowKey} />
    }

    /** Data */
    private renderDefault = ( prop ): string | JSX.Element => {
        const defaultValueBlacklist = ['null', 'undefined']

        // Workaround for issue https://github.com/reactjs/react-docgen/issues/221
        // If prop has defaultValue it can not be required
        if (prop.defaultValue) {
            if (prop.type || prop.flowType) {
                const propName = prop.type ? prop.type.name : prop.flowType.type
    
                if (defaultValueBlacklist.indexOf(prop.defaultValue.value) > -1) {
                    return <Code>{showSpaces(unquote(prop.defaultValue.value))}</Code>
                } else if (propName === 'func' || propName === 'function') {
                    return <Text
                        size="small"
                        color="light"
                        underlined
                        title={showSpaces(unquote(prop.defaultValue.value))}>
                        Function
                    </Text>
                } else if (propName === 'shape' || propName === 'object') {
                    try {
                        // We eval source code to be able to format the defaultProp here. This
                        // can be considered safe, as it is the source code that is evaled,
                        // which is from a known source and safe by default
                        // eslint-disable-next-line no-eval
                        const object = eval(`(${prop.defaultValue.value})`)

                        return (
                            <Text size="small" color="light" underlined title={javascriptStringify.stringifyObject(object, null, 2)}>
                                Shape
                            </Text>
                        )
                    } catch (e) {
                        // eval will throw if it contains a reference to a property not in the
                        // local scope. To avoid any breakage we fall back to rendering the
                        // prop without any formatting
                        return (
                            <Text size="small" color="light" underlined title={prop.defaultValue.value}>
                                Shape
                            </Text>
                        )
                    }
                }
            }
    
            return <Code>{showSpaces(unquote(prop.defaultValue.value))}</Code>
        }
        // else if (prop.required) {
        //     return (
        //         <Text size="small" color="light">
        //             Required
        //         </Text>
        //     )
        // }
        return ''
    }

    private renderDescription = ( prop ): JSX.Element => {
        const { description, tags = {} } = prop
        const extra = this.renderExtra(prop)
        const args = [...(tags.arg || []), ...(tags.argument || []), ...(tags.param || [])]
        const returnDocumentation = (tags.return && tags.return[0]) || (tags.returns && tags.returns[0])
    
        return (
            <div>
                {description && <Markdown text={description} />}
                {extra && <Para>{extra}</Para>}
                <JsDoc {...tags} />
                {args.length > 0 && <Arguments args={args} heading />}
                {returnDocumentation && <Argument {...returnDocumentation} returns />}
            </div>
        )
    }

    private renderEnum = ( prop ): JSX.Element => {
        if (!Array.isArray(getType(prop).value)) {
            return <span>{getType(prop).value}</span>
        }
    
        const values = getType( prop ).value.map( ( { value } ) => (
            <Code key={value}>{showSpaces(unquote(value))}</Code>
        ) )
        return (
            <span>
                One of:{' '}
                <Group separator=", " inline>
                    {values}
                </Group>
            </span>
        )
    }

    private renderUnion = ( prop ): JSX.Element => {
        if ( !Array.isArray( getType( prop ).value ) ) {
            return <span>{getType(prop).value}</span>
        }
    
        const values = getType( prop ).value.map( ( value, index ) => (
            <Type key={`${value.name}-${index}`}>{this.renderType( value )}</Type>
        ))
        return (
            <span>
                One of type:{' '}
                <Group separator=", " inline>
                    {values}
                </Group>
            </span>
        )
    }

    private renderShape = ( props ): JSX.Element[] => {
        const rows = []

        for ( const name in props ) {
            const prop = props[name]
            const defaultValue = this.renderDefault( prop )
            const description = prop.description
            rows.push(
                <div key={name}>
                    <Name>{name}</Name>
                    {': '}
                    <Type>{this.renderType( prop )}</Type>
                    {defaultValue && ' — '}
                    {defaultValue}
                    {description && ' — '}
                    {description && <Markdown text={description} inline />}
                </div>
            )
        }
        return rows
    }

    private renderExtra = ( prop ): JSX.Element | JSX.Element[] => {
        const type = getType( prop )
    
        if ( !type ) return null

        switch ( type.name ) {
            case 'enum':
                return this.renderEnum( prop )
            case 'union':
                return this.renderUnion( prop )
            case 'shape':
                return this.renderShape( prop.type.value )
            case 'arrayOf':
                if ( type.value.name === 'shape' ) {
                    return this.renderShape( prop.type.value.value )
                }
                return null
            case 'objectOf':
                if ( type.value.name === 'shape' ) {
                    return this.renderShape( prop.type.value.value )
                }
                return null
            default:
                return null
        }
    }

    private renderType = ( type ): string => {
        if ( !type ) return 'unknown'

        const { name } = type

        switch ( name ) {
            case 'arrayOf':
                return `${type.value.name}[]`
            case 'objectOf':
                return `{${this.renderType( type.value )}}`
            case 'instanceOf':
                return type.value
            default:
                return name
        }
    }
    
    private renderFlowType = ( type ): string | JSX.Element => {
        if (!type) return 'unknown'
    
        const { name, raw, value } = type
    
        switch (name) {
            case 'literal':
                return value
            case 'signature':
                return this.renderComplexType( type.type, raw )
            case 'union':
            case 'tuple':
                return this.renderComplexType( name, raw )
            default:
                return raw || name
        }
    }

    private renderComplexType = ( name, title ): JSX.Element => {
        return (
            <Text size="small" underlined title={title}>
                <Type>{name}</Type>
            </Text>
        )
    }

    /** Utils */
    private getRowKey = ( row ) => {
        return row.name;
    }

    /** Components */
    private renderName = (prop): JSX.Element => {
        const { name, tags = {} } = prop

        return <Name deprecated={!!tags.deprecated}>
            {
                prop.required ? <div className='props-name mandatory'>{name}</div> : name
            }
        </Name>
    }

    private renderTypeColumn = (prop): JSX.Element => {
        if (prop.flowType) {
            return <Type>{this.renderFlowType( getType( prop ) )}</Type>
        }
        return <Type>{this.renderType( getType (prop ) )}</Type>
    }
}

export default PropsRenderer
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { arrayMin, arrayMax } from '@amalto/helpers'

import * as classNames from 'classnames'

module SelectablesContainer {
    export interface Props extends React.Props<SelectablesContainer> {
        orderedItems: JSX.Element[];
        selectedItems: number[];
        onSelect: ( selectedItems: number[] ) => void;
        contextMenuContent?: JSX.Element;
        displayContextMenu?: ( content: any, positionX?: number, positionY?: number ) => void;
        disableItemSelection?: boolean;
        disableContextMenu?: boolean;
    }
}


class SelectablesContainer extends React.Component<SelectablesContainer.Props, any> {
    constructor( props: SelectablesContainer.Props ) {
        super( props )
    }

    render() {
        let selectableProps: React.HTMLProps<HTMLDivElement> = {}

        if ( !this.props.disableItemSelection ) {
            selectableProps.onClick = this.handleItemSelection
        }

        let selectableItems = this.props.orderedItems.map( ( selectable, idx ) => {
            return (
                <span key={selectable.key && `${ selectable.key }_selectable` || idx} className={
                    classNames( 'selectable', {
                        'selected': this.props.selectedItems.indexOf( idx ) !== -1
                    } )
                } data-item-index={idx}
                    {...selectableProps}>
                    {selectable}
                </span>
            )
        } )

        let additionalProps: React.HTMLProps<HTMLDivElement> = {}

        if ( !this.props.disableContextMenu ) {
            additionalProps.onContextMenu = this.displayContextMenu
        }

        return (
            <div {...additionalProps}>
                {selectableItems}
            </div>
        )
    }

    componentDidMount() {
        if ( this.props.selectedItems.length === 1 ) {
            let element = ReactDOM.findDOMNode( this )
            let $selectedElement = $( element ).find( '[data-item-index="' + this.props.selectedItems[0] + '"]' )
            window.setTimeout( () => {
                $( 'html' ).animate( { scrollTop: $selectedElement.position().top }, 500 )
            }, 500 )
        }
    }

    private displayContextMenu = ( event: any ) => {
        event.preventDefault()

        if ( this.props.selectedItems.length > 0 && this.props.contextMenuContent ) {
            this.props.displayContextMenu( this.props.contextMenuContent, event.clientX, event.clientY )
        }
    }

    private handleItemSelection = ( event: any ) => {
        event.preventDefault()

        const { selectedItems, onSelect } = this.props

        let itemIndex = parseInt( event.currentTarget.getAttribute( 'data-item-index' ), 10 )
        let idx = selectedItems.indexOf( itemIndex )

        //cmd + click or ctrl + click cases
        if ( event.metaKey || event.ctrlKey ) {
            //let's just be sure the user hasn't got its entire butt on the keyboard :)
            if ( !event.shiftKey ) {
                //simply toggle the item from the selectedItems array
                if ( idx === -1 ) {
                    //if not already in, we add it
                    onSelect( selectedItems.concat( itemIndex ) )
                }
                else {
                    //else we remove it from the array
                    //copy of the array
                    let updatedItems = selectedItems.slice()
                    //remove the found item on the copy
                    updatedItems.splice( idx, 1 )

                    onSelect( updatedItems )
                }
            }
        }
        //shift + click
        else if ( event.shiftKey ) {

            //if we click on an already selected item, do nothing, else go in that if
            if ( idx === -1 ) {
                if ( selectedItems.length >= 1 ) {

                    let selectedIdx = itemIndex

                    //case only one item selected
                    let currentMin = selectedItems[0]
                    let currentMax = currentMin

                    //case multiple items already selected => set proper min & max to build the largest interval
                    if ( selectedItems.length > 1 ) {
                        currentMin = arrayMin( selectedItems )
                        currentMax = arrayMax( selectedItems )
                    }

                    let min = Math.min( selectedIdx, currentMin )
                    let max = Math.max( selectedIdx, currentMax )

                    //build the interval
                    let interval = []
                    let i = min
                    for ( i; i <= max; i++ ) {
                        interval.push( i )
                    }

                    onSelect( interval )


                }
                else {
                    onSelect( [itemIndex] )
                }

                window.getSelection().removeAllRanges()
            }

        }
        else {
            //simply replace the selectedItems array with a new one containing only the new selected item
            onSelect( [itemIndex] )
        }
    }

}

export default SelectablesContainer

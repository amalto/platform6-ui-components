// Modules
import * as React from 'react'
import * as classNames from 'classnames'
import * as uuid from 'uuid'

module TableRenderer {
    export interface Props extends React.ClassAttributes<TableRenderer> {
        columns: {
            caption: string;
            render: ( row: any ) => JSX.Element;
        }[],
        rows: any,
        getRowKey: ( row: any ) => string;
    }

    export interface State {

    }
}

class TableRenderer  extends React.Component<TableRenderer.Props, TableRenderer.State> {

    constructor( props: TableRenderer.Props ) {
        super( props )
        this.state = {}
    }

    render() {
        const { columns, rows, getRowKey } = this.props

        return <div className='flex flex-col'>
            <div className='flex flex-wrap mgb-15 bottom-border bold text-medium'>
                {columns.map( ({ caption }, idx) => (
                    <div key={caption} className={classNames( 'flex', {
                        'flex-1': idx < 3,
                        'flex-3': idx === 3
                    })}>{caption}</div>
                ) )}
            </div>
            {
                rows.map( row => (
                    <div key={uuid.v4()} className='flex flex-wrap text-medium'>
                        {columns.map( ({ render }, idx) => (
                            <div key={idx} className={classNames( 'flex', {
                                'flex-1': idx < 3,
                                'flex-3': idx === 3
                            })}>
                                {render( row )}
                            </div>
                        ) )}
                    </div>
                ) )
            }
        </div>
    }
}

export default TableRenderer
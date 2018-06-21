// Modules
import * as React from 'react'
import ButtonsBar from '../../components/buttons-bar'
import * as uuid from 'uuid'

import { MULTILANGUAGE_WORDINGS } from '../../components/wordings'
import { getWordings } from '../../components/helpers'

const WORDINGS = getWordings( MULTILANGUAGE_WORDINGS, 'en-US' )

module WordingsList {
    export interface Props extends React.ClassAttributes<WordingsList> {
        wordings: {
            [id: string]: {
                [id: string]: string
            }
        }
    }

    export interface State {
        searchValue?: string;
        list?: string[][];
        filteredList?: string[][];
    }
}

class WordingsList extends React.Component<WordingsList.Props, WordingsList.State> {
    constructor( props: WordingsList.Props ) {
        super( props )
        this.state = {
            searchValue: '',
            list: [],
            filteredList: []
        }
    }

    componentDidMount() {
        this.initList()
    }

    render() {
        return <div>
            {this.generateBtnBar()}
            {this.renderTab( this.props.wordings )}
        </div>
    }

    private initList = (): void => {
        const { wordings } = this.props
        const keys: string[] = Object.keys( wordings )
        const list = []

        keys.forEach( k1 => {
            list.push( [k1].concat( Object.keys( wordings[k1] ).map( k2 => wordings[k1][k2] ) ) )
        } )

        this.setState( { list, filteredList: list } as WordingsList.State, () => this.handleSearch( '' ) )
    }

    private generateBtnBar = (): JSX.Element => {
        const totalBtn: ButtonsBar.BtnGroupsProps = {
            btns: [
                {
                    content: <div className='bold font-color'>{`${this.state.list.length} wordings`}</div>
                }
            ]
        }
    
        return <div className='mgb-15'>
            <ButtonsBar btnGroups={[totalBtn]}
                searchValue={this.state.searchValue}
                handleSearch={this.handleSearch}
                locale='en-US'
            />
        </div>
    }

    private renderLine = ( idx: number, line: string[] ): JSX.Element => {
        return <div key={idx} className='selectable'>
            <div className='card-item inline-item'>
                <div className='card-item-content flex flex-row flex-wrap '>
                    {
                        line.map( value => <div key={uuid.v4()}
                            className='flex-1 card-item-value inline-item-value dg-item-data-value multiline'>
                            <div>{value}</div>
                        </div> )
                    }
                </div>
            </div>
        </div>
    }

    private renderTab = ( wordings: { [id: string]: { [id: string]: string } } ): JSX.Element => {
        const keys: string[] = Object.keys( wordings )
        const locales: string[] = Object.keys( wordings[keys[0]] )

        return <div>
            <div className='flex flex-row dg-inline-headers'>
                <div className='flex-1 dg-inline-header-item'><div>{WORDINGS.key}</div></div>
                {Object.keys( locales ).map( k => <div key={k} className='flex-1 dg-inline-header-item'><div>{locales[k]}</div></div> )}
            </div>
            <div className='cards-container row inline-items text-medium'>
                <div>
                    {this.state.filteredList.map( (l, idx) => this.renderLine( idx, l ) )}
                </div>
            </div>
        </div>
    }

    private handleSearch = ( searchValue: string ): void => {
        const { list } = this.state
        const filteredList = list.filter( line => {
            return line.some( item => {
                const regExp: RegExp = new RegExp( searchValue )
                
                return regExp.test( item )
            } )
        } ).sort( ( a, b ) => {
            if ( a[0] > b[0] ) return 1
            else if ( b[0] > a[0] ) return -1
            return 0
        } )

        this.setState( { filteredList } as WordingsList.State )
    }
}

export default WordingsList
import MainState from './MainState'
import ServicesState from './ServiceState'
import { DataGridState } from './DataGridState'

interface GlobalState {

    main: MainState;
    services: ServicesState;
    datagrid: DataGridState;
}

export default GlobalState
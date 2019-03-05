import * as React from 'react'
import classNames from 'classnames'

module Icon {
    export interface Props {
        iconClass?: string;
        colorClass?: string;
    }
}

// Use React 16.6.x Hooks
function Icon( props: Icon.Props ) {
    const [classname, setClassname] = React.useState( '' )

    // Set icon classname
    React.useEffect( () => {
        setClassname( classNames( props.iconClass, props.colorClass ) )
    }, [props.iconClass, props.colorClass] )

    return <span className={classname} />
}

export default Icon
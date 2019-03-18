// Modules
import * as React from 'react'
import * as classNames from 'classnames'

/**
 * This component is generally used next to input's label. See [RadioInput](#radioinput)
 */
namespace Help {
    export interface Props {
        /** CSS class wrapping the component. */
        containerClass?: string;
        /** CSS properties. */
        style?: React.CSSProperties;
        /** Content of the help tooltip. */
        text: string
    }
}

function Help( props: Help.Props ) {
    const helpPopup: React.MutableRefObject<HTMLSpanElement> = React.useRef( null )

    React.useEffect( () => {

        $( helpPopup.current ).popover(
            {
                container: 'body',
                trigger: 'hover',
                html: true
            }
        )

        return () => $( helpPopup ).popover( 'destroy' )
    }, [] )

    return (
        <span className={
            classNames(
                'fas fa-fw fa-question-circle default-color',
                props.containerClass
            )
        }
            data-content={props.text}
            ref={helpPopup}
            style={props.style}
        >
        </span>
    )
}

export default Help
import * as React from 'react'

export const styles: { [id: string]: React.CSSProperties } = {
    itemList: {
        marginTop: 2,
        listStyle: 'none',
        padding: 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    },
    menuLink: {
        display: 'block',
        padding: '9px 10px',
        textAlign: 'center',
        borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomRightRadius: 4, borderBottomLeftRadius: 4
    }
}
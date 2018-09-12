export const Styles = {
    selectTextInput: {
        position: 'relative'
    },
    selectTextInputBtnPreffix: {
        width: '77%',
        marginRight: '3%',
        float: 'left'
    },
    caret: {
        position: 'absolute',
        cursor: 'pointer',
        top: 8,
        right: 8
    },
    'options-list': {
        borderBottom: '1px solid #e8ebed',
        borderRight: '1px solid #e8ebed',
        borderLeft: '1px solid #e8ebed',
        userSelect: 'none',
        position: 'absolute',
        width: '100%',
        zIndex: 100,
        backgroundColor: '#FFF',
        overflowX: 'hidden',
        overflowY: 'auto',
        'div:hover': {
            backgroundColor: '#89BC55',
            color: '#FFF'
        }
    },
    'option-item': {
        padding: '5px 10px',
        cursor: 'pointer',
        wordBreak: 'break-all'
    }
}
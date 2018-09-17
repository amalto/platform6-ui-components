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
            color: '#262626',
            textDecoration: 'none',
            backgroundColor: '#f5f5f5'
        }
    },
    'option-item': {
        padding: '5px 10px',
        cursor: 'pointer',
        wordBreak: 'break-all'
    },
    'option-item-disabled': {
        color: '#5c606b',
        textDecoration: 'none',
        backgroundColor: 'transparent',
        cursor: 'not-allowed',
        fontStyle: 'italic'
    },
    'option-item-selected': {
        backgroundColor: '#89BC55 !important',
        color: '#FFF !important',
        'div': {
            backgroundColor: '#89BC55 !important',
            color: '#FFF !important'
        }
    }
}
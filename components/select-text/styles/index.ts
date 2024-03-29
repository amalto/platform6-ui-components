export const Styles = {
  selectTextInput: {
    position: 'relative',
  },
  selectTextInputBtnPreffix: {
    width: '77%',
    marginRight: '3%',
    float: 'left',
  },
  caret: {
    position: 'absolute',
    cursor: 'pointer',
    top: 8,
    right: 8,
  },
  'options-list': {
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
      backgroundColor: '#f5f5f5',
    },
  },
  'option-item': {
    padding: '3px 10px',
    cursor: 'pointer',
    wordBreak: 'break-all',
  },
  'option-item-disabled': {
    color: '#5c606b',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    cursor: 'not-allowed',
    fontStyle: 'italic',
    div: {
      color: '#5c606b',
      backgroundColor: 'transparent',
    },
  },
  'option-item-selected': {
    backgroundColor: '#61A653',
    color: '#FFF',
    div: {
      backgroundColor: '#61A653',
      color: '#FFF',
    },
  },
};

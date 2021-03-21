const COLOR ={
  PRIMARY: 'royalBlue',
  INTENSE: 'blue',
  MILD: 'cornflowerBlue',
  PALE: 'lavender',
  LIGHT: 'aliceblue',
  DARK: 'navy',
  NEUTRAL: 'lightSlateGray'
};

const STYLE = { 
  COLOR: COLOR,
  PARAGRAPH: {
    marginTop: '1.5em',
    textIndent: '2rem',
  },
  LINK: {
    cursor: 'pointer',
    color: COLOR.INTENSE,
    textDecoration: 'none',
  },
  MENU_LINK: {
    display: 'inline-block',
    padding: '0.5em 1em 0.25em',
    background: 'none',
    borderTopLeftRadius: '0.25em',
    borderTopRightRadius: '0.25em',
    color: COLOR.DARK,
    display: 'inline-block',
    padding: '0.5em 1em'
  },
  MENU_LINK_SELECTED: {
    background: 'white'
  },
  BODY: {
    background: COLOR.NEUTRAL,
    font: '14px tahoma',
    padding: '1em',
  },
  DARK: {
    padding: '0.5em 1em',
    backgroundColor: COLOR.DARK,
    color: COLOR.PALE,
  },
  PAGE: {
    background: 'white',
    width: '100%',
    maxWidth: '60em',
    boxShadow: '0 0 4px black',
    display: 'block',
    margin: '0 auto',
  },
  BUTTON: {
    background: COLOR.PALE,
    color: COLOR.DARK,
    padding: '0.25em 1em',
    borderRadius: '0.4em',
    boxShadow: `1px 1px 3px black, 1px 1px 3px ${COLOR.LIGHT} inset`,
    minWidth: '5em',
    hover: {
      background: COLOR.MILD + ' !important',
    }
  },
  BUTTON_HOT: {
    background: COLOR.PRIMARY,
    color: COLOR.PALE,
  },
  CODE: {
    fontFamily: 'courier',
    background: COLOR.LIGHT,
    color: COLOR.DARK,
    padding: '1em 0 1em 1.5em',
    margin: '1em auto',
    maxWidth: '50em',
    overflow: 'auto'
  }
};

export default STYLE;
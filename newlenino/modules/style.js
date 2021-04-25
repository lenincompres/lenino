export const COLOR = {
  LINK: 'rgb(0, 102, 102)',
  LINK_DARK: '#003333',
  BACKGROUND: 'rgb(68, 85, 51)',
  HIGHLIGHT: 'rgb(0, 180, 180)',
  PAGE: '#F5DC9A'
};

export const SHADOW = {
  NORMAL: '1px 1px 3px black',
  INSET: '1px 1px 3px black inset',
  HIGHLIGHT: '0 0 9px white, 0 0 9px white inset'
}

export const STYLE = {
  PAGE: {
    backgroundColor: COLOR.PAGE,
    boxShadow: SHADOW.NORMAL,
    fontSize: '1.1em',
    width: 'calc(100% - 1em)',
    padding: '0.86em',
    borderRadius: '0.25em',
    margin: '0.25em',
    position: 'relative',
  },
  FLEX: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  }
}

domstyle({
  a: {
    color: COLOR.LINK,
    hover: {
      color: COLOR.HIGHLIGHT
    },
    _fa: {
      color: 'white',
      width: '2em',
      height: '2em',
      padding: '0.5em',
      margin: '0 0.25em',
      textAlign: 'center',
      borderRadius: '0.25em',
      verticalAlign: 'text-bottom',
      boxShadow: SHADOW.NORMAL,
      hover: {
        boxShadow: SHADOW.HIGHLIGHT
      }
    }
  }
})
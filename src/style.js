export const COLOR = {
  LINK: '#055',
  LINK_DARK: '#003333',
  BACKGROUND: 'rgb(68, 85, 51)',
  HIGHLIGHT: 'rgb(0, 180, 180)',
  PAGE: '#F5DC9A',
  PALE: '#d6cec0',
  FADED:'rgba(255,225,200,0.75)'
};

export const SHADOW = {
  TEXT: '1px 1px 1px black',
  NORMAL: '1px 1px 3px black',
  INSET: '1px 1px 3px black inset',
  HIGHLIGHT: '0 0 9px white, 0 0 9px white inset'
}

export const PAGE = {
  backgroundColor: COLOR.PAGE,
  boxShadow: SHADOW.NORMAL,
  fontSize: '1.1em',
  width: 'calc(100% - 1em)',
  padding: '0.86em',
  borderRadius: '0.25em',
  margin: '0.25em',
  position: 'relative',
};

export const FLEX = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  alignContent: 'flex-start',
};
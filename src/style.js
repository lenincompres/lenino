export const COLOR = {
  LINK: '#055',
  LINK_DARK: '#003333',
  BACKGROUND: 'rgb(68, 85, 51)',
  HIGHLIGHT: 'rgb(0, 180, 180)',
  PAGE: '#F5DC9A',
  PALE: '#d6cec0',
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

let slideDelay = 0;

export const SLIDE = (from = "top", delay, interval = 200) => {
  if (typeof from === "number") {
    delay = from;
    from = "top"
  };
  if (delay === undefined) delay = slideDelay++;
  return {
    pointerEvents: "default",
    position: "relative",
    maxHeight: "100em",
    [from]: {
      through: ["-2em", "1em", 0],
      interval: interval,
      delay: delay * interval / 3,
      transition: "ease",
      callBack: () => slideDelay--,
    },
    opacity: {
      through: [0, 1],
      interval: interval,
      delay: delay * interval / 3,
      transition: "ease",
    },
  }
};
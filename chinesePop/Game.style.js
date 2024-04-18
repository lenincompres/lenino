const paper = 'rgb(240, 255, 222)';
const veil = (v = 0, a = .5) => `rgba(${v}, ${v}, ${v}, ${a})`;
const style = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  timer: {
    fontSize: '2.5vh',
    top: '4.75em',
    backgroundColor: veil(255, .32),
    position: 'absolute',
    width: '100%',
    left: '0',
    boxSizing: 'border-box',
    div: {
      height: '.25em',
      borderRadius: '.25em',
      margin: '0 auto'
    }
  },
  level: {
    position: 'absolute',
    fontSize: '.4vmin',
    top: '16vh',
    right: '2.5vh',
    h1: {
      fontSize: '18em',
      lineHeight: '.5em',
      color: 'darkest',
      textShadow: '0 0 5px lightest',
    }
  },
  controls: {
    fontSize: '3vmin',
    fontFamily: 'Satisfy, cursive',
    display: 'none',
    width: '100%',
    position: 'absolute',
    marginTop: '9em',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    width: '90vw',
    zIndex: '3',
    div: {
      display: 'inline-block',
      fontSize: '9em',
      fontWeight: 'bold',
      margin: '.34em',
      cursor: 'pointer',
      color: 'darkest',
      textShadow: '0 0 5px lightest',
      _disabled: {
        color: 'transparent',
        opacity: .5,
        pointerEvents: 'none !important'
      },
      _new: {
        color: 'shiny'
      }
    }
  },
  tiles: {
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    width: '100vw',
    maxWidth: '500px',
    fontSize: '3.5vw',
    li: {
      width: '1em',
      height: '1em',
      backgroundColor: paper,
      borderRadius: '.1em',
      cursor: 'pointer',
      position: 'relative',
      fontSize: '1.2em',
      display: 'inline-block',
      fontFamily: 'satisfy, cursive',
      transition: '.2s',
      char: {
        fontSize: '.6em',
        lineHeight: '2em',
      },
      pinyin: {
        position: 'absolute',
        bottom: '.5em',
        fontSize: '.15em',
        display: 'none',
      },
      $hover: {
        backgroundColor: paper,
        boxShadow: 'black 1px 1px 1px'
      },
      $active: {
        opacity: .68,
        boxShadow: 'black 1px 1px 1px inset',
      },
      _blank: {
        backgroundColor: 'rgba(0, 16, 0, .24)',
        boxShadow: 'none',
        cursor: 'auto',
        boxShadow: '0 0 5px lightest',
      },
      _wrong: {
        backgroundColor: 'hot',
        color: 'shiny',
      },
      _learn: {
        pinyin: {
          display: 'block',
        }
      }
    }
  },
  rocks: {
    position: 'absolute',
    bottom: '0',
    width: '5em',
    height: '10em',
    background: 'no-repeat url("assets/images/rocks.png")',
    backgroundSize: 'auto 100%',
    backgroundPosition: 'center 0',
    _hidden: {
      display: 'none'
    }
  },
  mistakes: {
    position: 'absolute',
    bottom: '3.34em',
    fontSize: '3vh',
    whiteSpace: 'nowrap',
    zIndex: 3,
    li: {
      width: '1.5em',
      height: '2.5em',
      margin: '-1em -.25em 0',
      backgroundImage: 'url("assets/images/fire.gif")',
      backgroundSize: 'auto 100%',
      backgroundPosition: 'center 0',
      display: 'inline-block'
    }
  },
  goal: {
    fontSize: '2.5vh',
    height: '4.34em',
    backgroundColor: paper,
    position: 'absolute',
    bottom: '0',
    width: '100%',
    left: '0',
    boxSizing: 'border-box',
    cursor: 'pointer',
    transitionTimingFunction: 'ease-out',
    overflow: 'hidden',
    transition: '.1s',
    transitionTimingFunction: 'ease-out',
    hint: {
      color: 'cool',
      fontSize: '1.15em',
      padding: '.5em 1em',
    },
    desc: {
      fontSize: '1em',
      padding: '.68em',
      position: 'absolute',
      width: '100%',
      bottom: '0',
      whiteSpace: 'nowrap'
    },
    _animate: {
      height: '0',
      '*': {
        display: 'none'
      }
    }
  },
  records: {
    pointerEvents: 'initial',
    display: 'none',
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: '5em 1em 4em',
    zIndex: 3,
    overflow: 'auto',
    backgroundColor: veil(0, .86),
    color: 'cool',
    li: {
      padding: '.5em',
      margin: '.25em',
      '__*': {
        display: 'inline-block',
        margin: '0 .5em'
      },
      $after: {
        display: 'inline-block',
        minWidth: '4.5em',
        content: '"Cleared"',
        fontSize: '.86em',
        textAlign: 'left',
        backgroundSize: 'auto 100%',
        backgroundPosition: 'right 0',
        backgroundRepeat: 'no-repeat'
      },
      '$first-child': {
        color: 'shiny',
        $after: {
          content: '"New"'
        }
      },
      _perfect: {
        color: 'light',
        $after: {
          content: '"Perfect"',
          backgroundImage: 'url("assets/images/rocks.png")'
        }
      },
      _burn: {
        color: 'hot',
        $after: {
          content: '"Failed"',
          backgroundImage: 'url("assets/images/fire.gif")'
        }
      }
    },
    _show: {
      display: 'block'
    }
  },
  _over: {
    timer: {
      display: 'none'
    },
    level: {
      top: 'auto',
      right: 'auto',
      position: 'absolute',
      fontSize: '3vmin',
      cursor: 'pointer'
    },
    controls: {
      display: 'block',
    },
    tiles: {
      li: {
        pointerEvents: 'none !important',
        backgroundColor: veil(0, 0),
        color: 'cool',
        textShadow: '0 0 5px black'
      },
      _perfect: {
        li: {
          color: 'lightest',
          textShadow: '0 0 10px white'
        }
      },
      _burn: {
        li: {
          color: 'black',
          textShadow: '0 0 5px hot'
        }
      },
      _new: {
        li: {
          color: 'shiny',
          textShadow: '1px 1px 1px black'
        }
      },
    }
  },
  '@media only screen and (min-width: 600px)': {
    _over: {
      level: {
        fontSize: '18px'
      }
    }
  },
  '@media only screen and (max-height: 600px)': {
    tiles: {
      width: '68vmin'
    },
    _over: {
      level: {
        fontSize: '2.5vh'
      }
    }
  }
};
export default style;
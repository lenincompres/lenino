export const INSTAGRAM = {
  width: '100%',
  minWidth: '780px',
  margin: 0,
  backgroundColor: '#4b270f',
  a: {
    href: 'http://instagram.com/lenino',
    target: '_blank',
    img: {
      verticalAlign: 'top',
      height: '25px',
      margin: '10px',
      position: 'absolute',
      src: 'assets/instagram_logo.png'
    },
  },
  script: {
    src: 'https://cdn.lightwidget.com/widgets/lightwidget.js'
  },
  iframe: {
    display: 'inline-block !important',
    width: '100%',
    border: 0,
    overflow: 'hidden',
    src: '//lightwidget.com/widgets/f00bc46ac23859a5aacb66ac5f4e54be.html',
    scrolling: "no",
    allowtransparency: "true",
    class: "lightwidget-widget",
  }
};

export default INSTAGRAM;
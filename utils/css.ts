export const clusterCss = function (warna: string) {
  return useCss({
    'position': 'relative',
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'width': '35px',
    'height': '35px',
    'borderRadius': '50%',
    'backgroundColor': warna,
    'transition': 'width height 2s',
    'cursor': 'pointer',
    'color': 'white',
    '&:before, &:after': {
      content: '" "',
      display: 'block',
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      top: '50%',
      left: '50%',
      borderRadius: '50%',
      backgroundColor: warna,
    },
    '&:before': {
      width: '40px',
      height: '40px',
      opacity: 0.4,
      zIndex: -1,
    },
    '&:after': {
      width: '45px',
      height: '45px',
      opacity: 0.2,
      zIndex: -1,
    },
  })
}

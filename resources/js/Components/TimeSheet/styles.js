export const container = (theme) => ({
  display: 'flex',
  width: '100%',
  height: '700px',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  backgroundColor: theme.palette.background.default,
});

export const innerContainer = (theme) => ({
  maxWidth: '900px',
  width: '100%',
  height: '500px'
});
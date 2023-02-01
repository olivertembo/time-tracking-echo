export const container = (theme) => ({
  display: 'flex',
  width: '100%',
  height: '700px',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  margin: theme.spacing(1),
});

export const innerContainer = (theme) => ({
  width: '100%',
  height: theme.spacing(50),
});
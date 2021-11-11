import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    height: '87vh',
    display: 'flex',
    flexDirection: 'column',
  },
  textWishes: {
    padding: '10px 25px',
    marginTop: 'auto !important',
    marginBottom: '20px !important',
    maxWidth: '300px',
    alignSelf: 'flex-end',
    background: 'rgba( 255, 255, 255, 0.25 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 10px )',
    borderRadius: '10px',

    '& .MuiTypography-root': {
      fontSize: '14px',
    },
  },
}));

export default useStyles;

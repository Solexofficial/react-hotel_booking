import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '70px',
    padding: '30px',
    background: '#fff',
    width: 380,
  },
  btnSubmit: {
    '&.MuiButtonBase-root': {
      marginTop: '30px',
    },
  },
  btnReset: {
    '&.MuiButtonBase-root': {
      marginTop: '15px',
    },
  },
}));

export default useStyles;

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    height: '826px',
    display: 'flex',
    flexDirection: 'column',
  },
  textWishes: {
    marginTop: 'auto !important',
    marginBottom: '20px !important',
    maxWidth: '300px',
    fontSize: '14px !important',
    alignSelf: 'flex-end',
  },
}));

export default useStyles;

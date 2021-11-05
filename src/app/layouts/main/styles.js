import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    height: '826px',
    display: 'flex',
    flexDirection: 'column',
  },
  textWishes: {
    marginTop: 'auto',
    marginBottom: '20px',
    maxWidth: '300px',
    fontSize: '14px',
    alignSelf: 'flex-end',
  },
}));

export default useStyles;

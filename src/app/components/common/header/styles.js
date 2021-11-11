import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    background: '#fff',
    flexGrow: 1,
    zIndex: 1000,
    boxShadow: '0 10px 20px rgba(31,32,65,.05)',
  },
  headerWrapper: {
    borderRadius: '5px',
    '&.MuiAppBar-root': {
      boxShadow: 'none',
    },
  },
  headerInner: {
    justifyContent: 'space-between',
    boxShadow: 'none',
  },

  headerTitle: {
    '&.MuiTypography-root': {
      textTransform: 'uppercase',
      marginLeft: '13px',
      flexGrow: 1,
    },
  },

  headerLink: {
    textDecoration: 'none',
  },

  headerLinkLogo: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
  },

  headerLinkButton: {
    '&.MuiButton-root': {
      marginRight: '10px',
      boxShadow: 'none',
    },
  },
}));

export default useStyles;

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '10px',
    flexGrow: 1,
    zIndex: 1000,
  },
  headerWrapper: {
    borderRadius: '5px',
  },
  headerInner: {
    justifyContent: 'space-between',
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

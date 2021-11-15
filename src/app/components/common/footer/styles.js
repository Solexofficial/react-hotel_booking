import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 'auto',
    padding: '75px 0 50px',
    background: '#fff',
    borderTop: '1px solid rgba(31,32,65,.25);',
  },

  footerMainWrapper: {
    padding: '30px 0',
  },

  footerNav: {
    display: 'flex',
  },

  footerNavTitle: {
    '&.MuiTypography-root': {
      marginBottom: '10px',
      fontSize: '14px',
      textTransform: 'uppercase',
    },
  },

  footerLogo: {
    maxWidth: '33.33%',
  },

  footerNavLink: {
    textDecoration: 'none',
    color: 'inherit',
    fontSize: '14px',
    '&:hover': {
      color: '#1976d2',
    },
    transition: 'color 0.2s linear',
  },

  footerDivider: {
    '&.MuiDivider-root': {
      margin: '20px 0',
    },
  },

  footerSubContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  footerSocial: {
    display: 'flex',
    alignItems: 'center',
  },

  footerSocialTextLink: {
    '&.MuiTypography-root': {
      marginLeft: '10px',
    },
  },
}));

export default useStyles;

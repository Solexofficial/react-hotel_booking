import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '100px 0 50px',
  },
  footerContainer: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  footerLogo: {
    maxWidth: '33.33%',
  },

  footerLinkLogo: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
  },
  footerLogoTitle: {
    '&.MuiTypography-root': {
      textTransform: 'uppercase',
      marginLeft: '13px',
      flexGrow: 1,
    },
  },
  footerNav: {
    display: 'flex',
  },
}));

export default useStyles;

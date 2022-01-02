import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  filterFormItem: {
    '&.MuiGrid-item': {
      marginBottom: '10px',
      '& .MuiFormControl-root': {
        marginBottom: '15px',
        '& .MuiFormControlLabel-root .MuiFormControlLabel-label': {
          marginBottom: '10px',
          fontSize: '14px',
        },
      },
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },

  filterFormTitle: {
    '&.MuiTypography-root': {
      marginBottom: '10px',
      fontSize: '12px',
      textTransform: 'uppercase',
    },
  },
}));

export default useStyles;

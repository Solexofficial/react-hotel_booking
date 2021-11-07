import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core';

export function useForm(initialData, validateOnChange = false, validate) {
  const [data, setData] = useState(initialData || {});
  const [errors, setErrors] = useState({});

  const handleInputChange = useCallback(e => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  }, []);

  const resetForm = () => {
    setData(initialData);
    setErrors({});
  };

  return {
    data,
    setData,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
      marginBottom: '10px',
      '&:first-child': {
        marginTop: '20px',
      },
    },
  },
}));

export function Form({ children, ...rest }) {
  const classes = useStyles();
  return (
    <form className={classes.root} autoComplete='off' {...rest}>
      {children}
    </form>
  );
}

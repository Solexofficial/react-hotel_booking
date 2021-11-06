import { FormControl, IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';

const withPassword = Component => props => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleMouseDownPassword = e => {
    e.preventDefault();
  };

  return (
    <FormControl>
      <Component
        {...props}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={toggleShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};

export default withPassword;

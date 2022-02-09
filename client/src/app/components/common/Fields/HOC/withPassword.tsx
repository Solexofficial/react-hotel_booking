import { IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material';

type InjectedProps = {
  type: string;
  InputProps: { endAdornment: JSX.Element };
};

const withPassword =
  <MuiTextFieldProps extends InjectedProps>(Component: React.ComponentType<MuiTextFieldProps>) =>
  (props: MuiTextFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
      setShowPassword(prevState => !prevState);
    };

    const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
    };

    return (
      <Component
        {...(props as MuiTextFieldProps)}
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
    );
  };

export default withPassword;

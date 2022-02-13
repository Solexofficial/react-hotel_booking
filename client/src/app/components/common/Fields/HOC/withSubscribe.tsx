import { IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useCallback, useState } from 'react';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material';

type InjectedProps = {};

const withSubscribe =
  <P extends InjectedProps>(Component: React.ComponentType<P>) =>
  (props: MuiTextFieldProps) => {
    const [data, setData] = useState('');
    const handleSubscribe = () => {
      setData('');
    };

    const handleChange = useCallback(event => {
      setData(event.target.value);
    }, []);

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
    };

    return (
      <Component
        {...(props as P)}
        onChange={handleChange}
        value={data}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='subscribe'
                onClick={handleSubscribe}
                onMouseDown={handleMouseDown}
                edge='end'
                color='primary'
              >
                <SendIcon color='primary' />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  };

export default withSubscribe;

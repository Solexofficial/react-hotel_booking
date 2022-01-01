import { IconButton, InputAdornment } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import React, { useCallback, useState } from 'react';

const withSubscribe = Component => props => {
  const [data, setData] = useState('');
  const handleSubscribe = () => {
    console.log('subscribed');
    console.log(data);
    setData('');
  };

  const handleChange = useCallback(event => {
    setData(event.target.value);
  }, []);

  const handleMouseDown = e => {
    e.preventDefault();
  };

  return (
    <Component
      {...props}
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

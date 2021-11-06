import { Box } from '@mui/system';
import React, { useCallback, useState } from 'react';

const withPassword = Component => props => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = useCallback(() => {
    setShowPassword(prevState => !prevState);
  });

  return (
    <Box>
      <Component {...props} type={showPassword ? 'text' : 'password'} />
      {
        <button type='button' onClick={toggleShowPassword}>
          SHOW PASS
        </button>
      }
    </Box>
  );
};

export default withPassword;

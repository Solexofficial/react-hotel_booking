import { Avatar as MuiAvatar } from '@mui/material';
import React from 'react';

const Avatar = ({ alt, src, className }) => {
  return <MuiAvatar alt={alt} src={src} className={className} />;
};

export default Avatar;

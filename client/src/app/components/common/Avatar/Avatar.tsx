import { Avatar as MuiAvatar } from '@mui/material';
import React from 'react';

type AvatarProps = {
  alt: string;
  src: string;
  className?: string;
};

const Avatar: React.FC<AvatarProps> = ({ alt, src, className }) => {
  return <MuiAvatar alt={alt} src={src} className={className} />;
};

export default Avatar;

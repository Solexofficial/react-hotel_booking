import { Grid } from '@mui/material';
import React from 'react';
import RoomCard from './roomCard';

const RoomsList = () => {
  const roomsList = [
    { numberRoom: '888', rentPerDay: 9990, rate: 5, countReviews: 145, lux: true },
    { numberRoom: '888', rentPerDay: 9990, rate: 5, countReviews: 145 },
    { numberRoom: '888', rentPerDay: 9990, rate: 5, countReviews: 145 },
    { numberRoom: '888', rentPerDay: 9990, rate: 5, countReviews: 145 },
  ];
  return (
    <Grid container xs={12} spacing={1}>
      {roomsList.map(room => (
        <Grid item xs={4}>
          <RoomCard {...room} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RoomsList;

import { Grid } from '@mui/material';
import React from 'react';
import RoomCard from './roomCard';

const RoomsList = () => {
  const roomsList = [
    { numberRoom: '888', rentPerDay: 9990, rate: 5, countReviews: 145, lux: true },
    { numberRoom: '123', rentPerDay: 9990, rate: 5, countReviews: 145 },
    { numberRoom: '321', rentPerDay: 9990, rate: 5, countReviews: 145 },
    { numberRoom: '423', rentPerDay: 9990, rate: 5, countReviews: 145 },
  ];
  return (
    <Grid container spacing={1}>
      {roomsList.map(room => (
        <Grid item xs={4} key={room.numberRoom}>
          <RoomCard {...room} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RoomsList;

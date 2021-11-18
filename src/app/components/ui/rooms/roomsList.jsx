import { Grid } from '@mui/material';
import React from 'react';
import RoomCard from './roomCard';

const RoomsList = ({ rooms }) => {
  return (
    <Grid container spacing={2}>
      {rooms.map(room => (
        <Grid item xs={4} key={room.id}>
          <RoomCard {...room} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RoomsList;

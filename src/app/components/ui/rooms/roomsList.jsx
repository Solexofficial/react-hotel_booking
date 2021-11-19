import { Grid } from '@mui/material';
import React from 'react';
import RoomCard from './roomCard';

const RoomsList = ({ rooms }) => {
  return (
    <>
      {/* <ul className='rooms__list'>
        {rooms.map(room => (
          <li className='rooms__list-item'>
            <RoomCard {...room} />
          </li>
        ))}
      </ul> */}
      <Grid xs={12} container spacing={2}>
        {rooms.map(room => (
          <Grid item xs={4} md={6} key={room.id}>
            <RoomCard {...room} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default RoomsList;

import { Card } from '@mui/material';
import React from 'react';

const RoomCard = ({ numberRoom, rentPerDay, rate, countReviews }) => {
  console.log(numberRoom, rentPerDay, rate, countReviews);
  return (
    <Card>
      <p>Number: {numberRoom}</p>
      <p>rentPerDay: {rentPerDay}</p>
      <p>rate: {rate}</p>
      <p>countReviews: {countReviews}</p>
    </Card>
  );
};

export default RoomCard;

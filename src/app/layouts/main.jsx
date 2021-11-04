import { Box, Container } from '@mui/material';
import React from 'react';
import Header from '../components/common/header';
import ImageSlider from '../components/common/slider';
import Text from '../components/common/typography/text';
import SearchRoomsForm from '../components/ui/searchRoomsForm';

const Main = () => {
  return (
    <>
      <ImageSlider />
      <Container>
        <Header />
        <Box style={{ height: 826, display: 'flex', flexDirection: 'column' }}>
          <SearchRoomsForm />
          <Text
            align='right'
            style={{
              fontSize: '14px',
              marginTop: 'auto',
              marginBottom: '20px',
              maxWidth: '300px',
              alignSelf: 'flex-end',
            }}
          >
            Лучшие номера для вашей работы, отдыха и просто вдохновения
          </Text>
        </Box>
      </Container>
    </>
  );
};

export default Main;

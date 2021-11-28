import React from 'react';
import Header from '../common/header/header';
import Container from '../common/container';
import Footer from '../common/footer/footer';
import Breadcrumbs from '../common/breadcrumbs';
import SlickSlider from '../common/imageSlider/cardSlickSlider';

const roomImages = [
  {
    url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    key: 'image1',
  },
  {
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    key: 'image2',
  },
  {
    url: 'https://images.unsplash.com/photo-1584132905271-512c958d674a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    key: 'image3',
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const RoomPage = ({ roomId }) => {
  return (
    <>
      <Header />
      <Container>
        <Breadcrumbs />
        <SlickSlider {...sliderSettings} className='room-page__gallery'>
          {roomImages.map(img => (
            <img className='room-page__gallery-item--img' src={img.url} alt='roomsPhoto' />
          ))}
        </SlickSlider>
        <h1>Room page id: {roomId}</h1>
      </Container>
      <Footer />
    </>
  );
};

export default RoomPage;

import { Grid, Link } from '@material-ui/core';
import { GitHub } from '@mui/icons-material';
import React from 'react';
import NavList from '../../ui/navList';
import Container from '../container';
import Divider from '../divider';
import { InputField } from '../form/fields';
import withSubscribe from '../form/withSubscribe';
import Logo from '../logo/logo';
import Text from '../typography/text';
import Title from '../typography/title';
import useStyles from './styles';

const Footer = () => {
  const SubscribeInput = withSubscribe(InputField);
  const classes = useStyles();

  const navigationRoutes = [
    { path: '/', name: 'О нас' },
    { path: '/', name: 'Новости' },
    { path: '/', name: 'Служба поддержки' },
    { path: '/', name: 'Услуги' },
  ];

  const aboutRoutes = [
    { path: '/', name: 'О сервисе' },
    { path: '/', name: 'Наша команда' },
    { path: '/', name: 'Вакансии' },
    { path: '/', name: 'Инвесторы' },
  ];

  const supportRoutes = [
    { path: '/', name: 'Соглашения' },
    { path: '/', name: 'Сообщества' },
    { path: '/', name: 'Связь с нами' },
  ];

  return (
    <footer className={classes.root}>
      <Container>
        <Grid container spacing={2} className={classes.footerMainWrapper}>
          <Grid item xs={3}>
            <Logo />
            <Text variant='subtitle2'>
              Бронирование номеров в лучшем отеле 2021 года по версии ассоциации «Отельные взгляды»
            </Text>
          </Grid>
          <Grid item xs={6} component='nav' className={classes.footerNav}>
            <NavList label='Навигация' routes={navigationRoutes} direction='column' />
            <NavList label='О нас' routes={aboutRoutes} direction='column'  />
            <NavList label='Служба поддержки' routes={supportRoutes} direction='column' />
          </Grid>
          <Grid item xs={3}>
            <form className='footer__newsletter'>
              <Title isBold component='h3' variant='subtitle2' className={classes.footerNavTitle}>
                Подписка
              </Title>
              <Text variant='subtitle2'>Получайте специальные предложения и новости сервиса</Text>
              <div className='footer__input-newsletter'>
                <div className='field'>
                  <div className='field__wrapper'>
                    <SubscribeInput size='small' placeholder='Email' name='email' type='email' />
                  </div>
                </div>
              </div>
            </form>
          </Grid>
        </Grid>
      </Container>
      <Divider variant='fullWidth' className={classes.footerDivider} />
      <Container>
        <div className={classes.footerSub}>
          <div className={classes.footerSubContainer}>
            <Text variant='text'>Copyright © 2021 Toxin отель. Все права защищены.</Text>
            <Link underline='none' href='https://github.com/Solexofficial' rel='noopener noreferrer' target='_blank'>
              <div className={classes.footerSocial}>
                <GitHub />
                <Text component='span' className={classes.footerSocialTextLink}>
                  Solexofficial
                </Text>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

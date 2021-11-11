import { Grid, Link } from '@material-ui/core';
import { GitHub } from '@mui/icons-material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeLogo from '../../icons/logo';
import Container from '../container';
import Divider from '../divider';
import { InputField } from '../form/fields';
import withSubscribe from '../form/withSubscribe';
import Text from '../typography/text';
import Title from '../typography/title';
import useStyles from './styles';

const Footer = () => {
  const SubscribeInput = withSubscribe(InputField);
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Container>
        <Grid container spacing={2} className={classes.footerMainWrapper}>
          <Grid item xs={3}>
            <NavLink to='/' className={classes.footerLinkLogo}>
              <HomeLogo viewBox='0 0 40 40' />
              <Title variant='h6' component='h2' className={classes.footerLogoTitle}>
                Toxin
              </Title>
            </NavLink>
            <Text variant='subtitle2'>
              Бронирование номеров в лучшем отеле 2021 года по версии ассоциации «Отельные взгляды»
            </Text>
          </Grid>
          <Grid item xs={6} component='nav' className={classes.footerNav}>
            <Grid spacing={6} container direction='row'>
              <Grid item direction='column'>
                <Title isBold component='h3' variant='subtitle2' className={classes.footerNavTitle}>
                  Навигация
                </Title>
                <Grid item className='footer__list-item'>
                  <NavLink to='/' className={classes.footerNavLink}>
                    О нас
                  </NavLink>
                </Grid>
                <Grid item className='footer__list-item'>
                  <NavLink to='/' className={classes.footerNavLink}>
                    Новости
                  </NavLink>
                </Grid>
                <Grid item className='footer__list-item'>
                  <NavLink to='/' className={classes.footerNavLink}>
                    Служба поддержки
                  </NavLink>
                </Grid>
                <Grid item className='footer__list-item'>
                  <NavLink to='/' className={classes.footerNavLink}>
                    Услуги
                  </NavLink>
                </Grid>
              </Grid>
              <Grid item direction='column' className='footer__item'>
                <Title isBold component='h3' variant='subtitle2' className={classes.footerNavTitle}>
                  О нас
                </Title>
                <Grid item className='footer__list-item'>
                  <NavLink to='/' className={classes.footerNavLink}>
                    О сервисе
                  </NavLink>
                </Grid>
                <Grid item className='footer__list-item'>
                  <NavLink to='/' className={classes.footerNavLink}>
                    Наша команда
                  </NavLink>
                </Grid>
                <Grid item className='footer__list-item'>
                  <NavLink to='/' className={classes.footerNavLink}>
                    Вакансии
                  </NavLink>
                </Grid>
                <Grid item className='footer__list-item'>
                  <NavLink to='/' className={classes.footerNavLink}>
                    Инвесторы
                  </NavLink>
                </Grid>
              </Grid>
              <Grid item direction='column' className='footer__item'>
                <Title isBold component='h3' variant='subtitle2' className={classes.footerNavTitle}>
                  Служба поддержки
                </Title>
                <Grid item className='footer__list-item'>
                  <NavLink to='/' className={classes.footerNavLink}>
                    Соглашения
                  </NavLink>
                </Grid>
                <Grid item className='footer__list-item'>
                  <NavLink to='/' className={classes.footerNavLink}>
                    Сообщества
                  </NavLink>
                </Grid>
                <Grid item className='footer__list-item'>
                  <NavLink to='/' className={classes.footerNavLink}>
                    Связь с нами
                  </NavLink>
                </Grid>
              </Grid>
            </Grid>
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
            <Text variant='text'>Copyright © 2021 Toxin отель. Все права зачищены.</Text>
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

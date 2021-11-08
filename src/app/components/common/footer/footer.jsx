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
    <>
      <footer className={classes.root}>
        <Container>
          <div className='footer__main'>
            <div className={classes.footerContainer}>
              <div className={classes.footerLogo}>
                <NavLink to='/' className={classes.footerLinkLogo}>
                  <HomeLogo viewBox='0 0 40 40' />
                  <Title variant='h6' component='h2' className={classes.footerLogoTitle}>
                    Toxin
                  </Title>
                </NavLink>
                <Text variant='subtitle2'>
                  Бронирование номеров в лучшем отеле 2019 года по версии ассоциации «Отельные взгляды»
                </Text>
              </div>
              <nav className={classes.footerNav}>
                <ul className='footer__item'>
                  <h3 className='footer__title'>Навигация</h3>
                  <li className='footer__list-item'>
                    <a className='footer__list-link' href='#!'>
                      О нас
                    </a>
                  </li>
                  <li className='footer__list-item'>
                    <a className='footer__list-link' href='#!'>
                      Новости
                    </a>
                  </li>
                  <li className='footer__list-item'>
                    <a className='footer__list-link' href='#!'>
                      Служба поддержки
                    </a>
                  </li>
                  <li className='footer__list-item'>
                    <a className='footer__list-link' href='#!'>
                      Услуги
                    </a>
                  </li>
                </ul>
                <ul className='footer__item'>
                  <h3 className='footer__title'>О нас</h3>
                  <li className='footer__list-item'>
                    <a className='footer__list-link' href='#!'>
                      О сервисе
                    </a>
                  </li>
                  <li className='footer__list-item'>
                    <a className='footer__list-link' href='#!'>
                      Наша команда
                    </a>
                  </li>
                  <li className='footer__list-item'>
                    <a className='footer__list-link' href='#!'>
                      Вакансии
                    </a>
                  </li>
                  <li className='footer__list-item'>
                    <a className='footer__list-link' href='#!'>
                      Инвесторы
                    </a>
                  </li>
                </ul>
                <ul className='footer__item'>
                  <h3 className='footer__title'>Служба поддержки</h3>
                  <li className='footer__list-item'>
                    <a className='footer__list-link' href='#!'>
                      Соглашения
                    </a>
                  </li>
                  <li className='footer__list-item'>
                    <a className='footer__list-link' href='#!'>
                      Сообщества
                    </a>
                  </li>
                  <li className='footer__list-item'>
                    <a className='footer__list-link' href='#!'>
                      Связь с нами
                    </a>
                  </li>
                </ul>
              </nav>
              <form className='footer__newsletter'>
                <h3 className='footer__title'>Подписка</h3>
                <p className='footer__info'>Получайте специальные предложения и новости сервиса</p>
                <div className='footer__input-newsletter'>
                  <div className='field'>
                    <div className='field__wrapper'>
                      <SubscribeInput placeholder='Email' name='email' type='email' />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Container>
        <Divider variant='fullWidth' />
        <Container>
          <div className='footer__sub'>
            <div className='footer__sub-container'>
              <p className='footer__copyright'>Copyright © 2019 Toxin отель. Все права зачищены.</p>
              <nav className='footer__soc-list'>
                <ul className='footer__item'>
                  <li className='footer__soc-item'>
                    <a
                      className='footer__soc-link'
                      href='https://twitter.com/'
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      <img className='footer__soc-ico' src='/Toxin/twitter.62ede93e.svg' alt='Twitter' />
                    </a>
                  </li>
                  <li className='footer__soc-item'>
                    <a
                      className='footer__soc-link'
                      href='https://www.facebook.com/'
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      <img className='footer__soc-ico' src='/Toxin/fb.1976a669.svg' alt='FaceBook' />
                    </a>
                  </li>
                  <li className='footer__soc-item'>
                    <a
                      className='footer__soc-link'
                      href='https://www.instagram.com/'
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      <img className='footer__soc-ico' src='/Toxin/ig.5706be58.svg' alt='Instagram' />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;

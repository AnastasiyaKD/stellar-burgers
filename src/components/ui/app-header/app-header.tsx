import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <BurgerIcon type={'primary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.link_active : styles.link
                }
                to={'/'}
              >
                Конструктор
              </NavLink>
            </p>
          </>
          <>
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.link_active : styles.link
                }
                to={'/feed'}
              >
                Лента заказов
              </NavLink>
            </p>
          </>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.link_active : styles.link
              }
              to={'/profile'}
            >
              {userName || 'Личный кабинет'}
            </NavLink>
          </p>
        </div>
      </nav>
    </header>
  );
};

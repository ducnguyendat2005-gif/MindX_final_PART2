import React from 'react';
import styles from './Header.module.scss';

import logo from '../../assets/logo (1).png';
import searchIcon from '../../assets/search-icon.png';
import cartIcon from '../../assets/Frame 427318762.png';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headStart}>
        <div className={styles.logo}>
          <img src={logo} alt="Byway logo" />
          <span>Byway</span>
        </div>
        <p>Categories</p>
        <div className={styles.searchContainer}>
          <img src={searchIcon} alt="search" />
          <input type="text" className={styles.searchBox} placeholder="Search courses" />
        </div>
        <p>Teach on Byway</p>
      </div>

      <div className={styles.funcBar}>
        <img src={cartIcon} alt="cart" />
        <div className={styles.buttonContainer}>
          <button
            onClick={() => window.location.href = '/sign-in'}
            className={styles.loginBtn}
          >
            Log In
          </button>
          <button
            onClick={() => window.location.href = '/sign-up'}
            className={styles.signupBtn}
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
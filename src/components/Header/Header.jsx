import React from 'react';
import styles from './Header.module.scss';

import logo from '../../assets/logo (1).png';
import searchIcon from '../../assets/search-icon.png';
import cartIcon from '../../assets/Frame 427318762.png';
import { useNavigate } from 'react-router-dom'
import { useState ,useEffect,useRef } from 'react';

function Header() {
  const navigate = useNavigate()
   const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  return (
    <header className={styles.header}>
      <div className={styles.headStart}>
        <div className={styles.logo} onClick={()=>(navigate('/home'))}>
          <img src={logo} alt="Byway logo" />
          <span>Byway</span>
        </div>
        <div className={styles.categoriesWrapper} ref={dropdownRef}>
        <button
          className={`${styles.categoriesBtn} ${open ? styles.active : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="true"
        >
          Categories
          <svg
            className={`${styles.chevron} ${open ? styles.chevronUp : ""}`}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
 
        {open && (
          <div className={styles.dropdown}>
              <button onClick={() => navigate('/signin')} className={styles.dropdownItem}>Sign In</button>
              <button onClick={() => navigate('/signup')} className={styles.dropdownItem}>Sign Up</button>
              <button onClick={() => navigate('/course-page')} className={styles.dropdownItem}>All Courses</button>
          </div>
        )}
      </div>
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
            onClick={() =>{navigate('/signin')}}
            className={styles.loginBtn}
          >
            Log In
          </button>
          <button
            onClick={() => navigate('/signup')}
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
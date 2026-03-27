import React from 'react'
import styles from './SignIn.module.scss'
import google from '../../assets/google.jpg';
import microsoft from '../../assets/microsoft.png';
import facebook from '../../assets/facebook.png';
import background from '../../assets/2db5e36f46d740f4e31aba5b5364cdf2ea7d24db.jpg'
import Header from '../../components/Header/Header.jsx'

const SignIn = () => {
  return (
    <>
    <Header></Header>
    <div className={styles.mainPage}>
      {/* Sign-in form */}
      <div className={styles.signInField}>
        <p className={styles.title}>Sign in to your account</p>
 
        <div className={styles.fieldGroup}>
          <p className={styles.fieldLabel}>Email</p>
          <input
            type="text"
            placeholder="Username or Email id"
            className={styles.inputBox}
          />
        </div>
 
        <div className={styles.fieldGroup}>
          <p className={styles.fieldLabel}>Password</p>
          <input
            type="password"
            placeholder="Password"
            className={styles.inputBox}
          />
        </div>
 
        <button className={styles.signInBtn}>Sign in</button>
 
        <div className={styles.sepLine}>
          <span className={styles.sepSpan}>Or sign in with</span>
        </div>
 
        <div className={styles.signInOther}>
          <button className={styles.brandButton}>
            <img src={google} alt="Google" />
          </button>
          <button className={styles.brandButton}>
            <img src={facebook} alt="Facebook" />
          </button>
          <button className={styles.brandButton}>
            <img src={microsoft} alt="Microsoft" />
          </button>
        </div>
      </div>
 
      {/* Side image */}
      <img
        className={styles.sideImage}
        src={background}
        alt="Side visual"
      />
    </div>
    </>
  )
}

export default SignIn
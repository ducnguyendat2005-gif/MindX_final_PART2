import React from "react";
import { useState } from "react";
import styles from "./SignUp.module.scss";
import background from "../../assets/af8ea6962e98d38a250ef334d5e66706b6031b27 (1).jpg";
import google from "../../assets/google.jpg";
import microsoft from "../../assets/microsoft.png";
import facebook from "../../assets/facebook.png";
import Header from "../../components/Header/Header.jsx";

const handleSaveAcc = (FName, LName, userName, email, password, cPass) => {
  if (password === cPass) {
    setpError("Password is not the same, please try again");
  }
};

const SignUp = () => {
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [cPass, setcPass] = useState("");

  return (
    <>
      {/* <Header></Header> */}
      <div className={styles.mainPage}>
        <img src={background} alt="Side visual" />

        <div className={styles.signUpSection}>
          <p>Sign up to your account</p>

          <div className={styles.firstName}>
            <p>Full name</p>
            <input
              type="text"
              placeholder="First name"
              onChange={(f) => setFName(f.target.value)}
            />
          </div>

          <div className={styles.lastName}>
            <input
              type="text"
              placeholder="Last name"
              onChange={(l) => setLName(l.target.value)}
            />
          </div>

          <div className={styles.username}>
            <p>Username</p>
            <input
              type="text"
              placeholder="Username"
              onChange={(u) => setuserName(u.target.value)}
            />
          </div>

          <div className={styles.email}>
            <p>Email</p>
            <input
              type="text"
              placeholder="Email ID"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          <div className={styles.password}>
            <p>Password</p>
            <input
              type="password"
              placeholder="Password"
              onChange={(p) => setPassword(p.target.value)}
            />
          </div>

          <div className={styles.confirmPassword}>
            <p>Confirm Password</p>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(c) => setcPass(c.target.value)}
            />
            {cPass && <p style={{ color: "red" }}>{cPass}</p>}
          </div>

          <button onClick={handleSaveAcc}>Create Account</button>

          <div className={styles.sepLine}>
            <span>Or sign up with</span>
          </div>

          <div className={styles.signInOther}>
            <button>
              <img src={google} alt="Google" />
            </button>
            <button>
              <img src={facebook} alt="Facebook" />
            </button>
            <button>
              <img src={microsoft} alt="Microsoft" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

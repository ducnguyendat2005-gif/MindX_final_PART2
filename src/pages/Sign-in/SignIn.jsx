import { ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";
import { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.scss';

export default function SignInPage() {
  const [accData, setAccData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState(false);;
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/accounts");
        if (!response.ok) throw new Error(`Lỗi: ${response.status}`);
        const data = await response.json();
        setAccData(data);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSignin = (e) =>{
    e.preventDefault();
    const found = accData.find(
      (acc) => acc.Email === email && acc.pass === password
    );
      if (!found) {
      setLoginError(true); // tách state riêng như đã nói
    } else {
      const { password: _, ...safeUser } = found;
      localStorage.setItem('loggedInUser', JSON.stringify(safeUser));
      window.dispatchEvent(new Event('userUpdated')); // ← thêm dòng này
      navigate('/');

  }
}
  const clearError = () => {
  setLoginError(false);
};

    if (loading) return <p>Đang tải...</p>;
    if (fetchError) return <p>Lỗi: {fetchError}</p>;
  return (
    <div className="signin-wrapper">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="signin-form-panel"
        >
          <div className="signin-form-inner">
            <div className="signin-heading">
              <h1>Sign in to your account</h1>
            </div>

            <form className="signin-form" onSubmit={(e) => handleSignin(e)}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Username or Email ID"
                  onChange = {(e) => {setEmail(e.target.value) ; if (e.target.value) clearError();}}
                  style = {{borderColor: loginError ? 'red' : '',outlineColor: loginError ? 'red' : ''}}
                />
                {loginError && <p style={{fontSize:"14px",color:"red"}}>Wrong email or password</p>}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  onChange = {(e) => {setPassword(e.target.value) ; if (e.target.value) clearError();}}
                  style = {{borderColor: loginError ? 'red' : '',outlineColor: loginError ? 'red' : ''}}
                />
                {loginError && <p style={{fontSize:"14px",color:"red"}}>Wrong email or password</p>}
              </div>

              <button type="submit" className="signin-btn">
                Sign In
                <ArrowRight className="btn-icon" />
              </button>
            </form>

            <div className="divider">
              <span>Sign in with</span>
            </div>

            <div className="social-buttons">
              <button className="social-btn">
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" />
                <span className="social-btn__label social-btn__label--facebook">Facebook</span>
              </button>
              <button className="social-btn">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                <span className="social-btn__label social-btn__label--google">Google</span>
              </button>
              <button className="social-btn">
                <img src="https://www.svgrepo.com/show/448239/microsoft.svg" alt="Microsoft" />
                <span className="social-btn__label social-btn__label--microsoft">Microsoft</span>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="signin-image-panel"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000"
            alt="Collaboration"
            referrerPolicy="no-referrer"
          />
          <div className="signin-image-overlay" />
        </motion.div>
      </div>
  );
}
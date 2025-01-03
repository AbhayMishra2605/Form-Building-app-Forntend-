import "./module.login.css";
import { backIcon } from "../data";
import { loginState } from "../data";
import { loginRight } from "../data";
import { loginBottom } from "../data";
import { googleIcon } from "../data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../Services";
import { useEffect } from "react";
function LoginPage() {
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(()=>{
    const token=localStorage.getItem('token');
    if(token){
      navigate('/dashboard');
    }
  })
  const handleLoginSubmit = async(e) => {
    e.preventDefault();

    const res= await login(loginFormData);
    const data = await res.json();
    if(res.status===200){
      

      localStorage.setItem('token',data.token);
      navigate('/dashboard')
    }
    else if(res.status === 400){
      alert('Worng email or password');
    }else{
      alert('Login failed');
    }

    
    
    setLoginFormData({
        email: "",
        password: "",
    });
  };


  useEffect(() => {
    const preventZoom = (event) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
      }
    };
    document.addEventListener("wheel", preventZoom, { passive: false });
    document.addEventListener("keydown", preventZoom, { passive: false });
    return () => {
      document.removeEventListener("wheel", preventZoom);
      document.removeEventListener("keydown", preventZoom);
    };
  }, []);
  return (
    <div className="loginPage">
      <img src={backIcon} className="backIcon" onClick={()=>{navigate(-1)}} />
      <img src={loginState} className="loginBackgoundImageLeft" />
      <img src={loginRight} className="loginBackgoundImageRight" />
      <img src={loginBottom} className="loginBackgoundImageBottom" />

      <div className="loginPageForm">
        <form onSubmit={handleLoginSubmit}>
          <label>Email</label>
          <br />
          <input
            type="text"
            name="email"
            value={loginFormData.email}
            onChange={(e) => {
              setLoginFormData({
                ...loginFormData,
                [e.target.name]: e.target.value,
              });
            }}
            placeholder="Enter your email"
            required={true}
          />
          <br />
          <label>Password</label>
          <br />
          <input type="password" name="password"  value={loginFormData.password}
            onChange={(e) => {
              setLoginFormData({
                ...loginFormData,
                [e.target.name]: e.target.value,
              });
            }} placeholder="........"
            required={true} />
          <br />
          <button className="loginBtn" type="submit">
            Log in
          </button>
          <h3>OR</h3>
          <button className="googleBtn">
            <img src={googleIcon} />
            Sign In with Google
          </button>
        </form>
        <div className="loginPara">
        <p className='loginPara'>Already have an account ? <span onClick={()=>{navigate('/register')}}>Sign Up</span></p>
</div>

      </div>
    </div>
  );
}


export default LoginPage;

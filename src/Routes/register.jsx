import './module.register.css';
import { backIcon, loginState, loginRight, loginBottom, googleIcon } from '../data';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../Services';
import { useEffect } from 'react';

function RegisterPage() {
    const navigate = useNavigate();
    const [registerFormData, setRegisterFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [conformPassword, setConformPassword] = useState('');
    const [error, setError] = useState(false); 

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        // Password validation regex
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

        if (!passwordRegex.test(registerFormData.password)) {
            let error =
                "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
            setError(error);
            return;
        }

        if (registerFormData.password !== conformPassword) {
            let error = "Enter the same password in both fields.";
            setError(error);
            return;
        }

        // Clear the error message
        setError(false);

        try {
            const res = await register(registerFormData);
            const data = await res.json();

            if (res.status === 200) {
                localStorage.setItem("token", data.token);
                navigate("/dashboard");
            } else if (res.status === 400) {
                alert("User already exists");
            } else {
                alert("Registration failed");
            }

            // Reset the form fields
            setRegisterFormData({
                email: '',
                password: '',
                name: '',
            });
            setConformPassword('');
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred. Please try again.");
        }
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
        <div className="registerPage">
            <img src={backIcon} className="registerbackIcon" alt="Back Icon" onClick={() => { navigate('/login') }} />
            <img src={loginState} className="registerBackgoundImageLeft" alt="Background Left" />
            <img src={loginRight} className="registerBackgoundImageRight" alt="Background Right" />
            <img src={loginBottom} className="registerBackgoundImageBottom" alt="Background Bottom" />

            <div className="registerPageForm">
                <form onSubmit={handleRegisterSubmit}>
                    <label>Username</label>
                    <br />
                    <input
                        type="text"
                        name="name"
                        value={registerFormData.name}
                        onChange={(e) => {
                            setRegisterFormData({
                                ...registerFormData,
                                [e.target.name]: e.target.value,
                            });
                        }}
                        className="registerName"
                        placeholder="Enter your username"
                        required
                    />
                    <br />
                    <label>Email</label>
                    <br />
                    <input
                        type="text"
                        name="email"
                        value={registerFormData.email}
                        onChange={(e) => {
                            setRegisterFormData({
                                ...registerFormData,
                                [e.target.name]: e.target.value,
                            });
                        }}
                        className="registerEmail"
                        placeholder="Enter your email"
                        required
                    />
                    <br />
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        value={registerFormData.password}
                        onChange={(e) => {
                            setRegisterFormData({
                                ...registerFormData,
                                [e.target.name]: e.target.value,
                            });
                        }}
                        className="registerPassword"
                        placeholder="Enter your password"
                        required
                    />
                    <br />
                    <label
                        style={{ color: error ? 'red' : 'white' }}
                    >
                        Confirm Password
                    </label>
                    <br />
                    <input
                        type="password"
                        name="conformPassword"
                        value={conformPassword}
                        onChange={(e) => setConformPassword(e.target.value)}
                        placeholder="Confirm your password"
                        required
                        className={error ? 'errorInput' : 'registerComformpassword'}
                    />
                    <div
                        style={{
                            color: "red",
                            height: "1.5vw",
                            fontSize: "1.2vw",
                        }}
                    >
                        {error}
                    </div>
                    <br />

                    <button className="registerBtn" type="submit">
                        Sign Up
                    </button>
                    <h3>OR</h3>
                    <button className="googleBtn" type="button">
                        <img src={googleIcon} alt="Google Icon" />
                        Sign In with Google
                    </button>
                </form>
                <p className="registerPara">
                    Already have an account? <span onClick={() => { navigate('/login') }}>Login</span>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;

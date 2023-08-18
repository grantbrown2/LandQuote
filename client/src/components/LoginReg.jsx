import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Logo from '../styles/LandQuoteLogo.png'
import '../styles/LoginReg.css'
const LoginReg = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formToggle, setFormToggle] = useState(true);
    const navigate = useNavigate();

    const [duplicateEmailError, setDuplicateEmailError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const registerHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/register", {
            email,
            password,
            confirmPassword 
        }, { withCredentials: true })
            .then(res => {
                navigate("/home");
            })
            .catch(err => {
                console.log(err);
                const { errors } = err.response.data;
                if (err.response.data.message) {
                    setDuplicateEmailError(err.response.data.message);
                } else {
                    setDuplicateEmailError('');
                }
                setEmailError(errors.email ? errors.email.message : '');
                setPasswordError(errors.password ? errors.password.message : '');
                setConfirmPasswordError(errors.confirmPassword ? errors.confirmPassword.message : '');
            });
    }

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/login", {
            email,
            password
        }, { withCredentials: true })
            .then(res => {
                const token = res.data.token;
                // Store the token in cookies
                Cookies.set('token', token, {expires: 1});
                // Set the token as the default Authorization header for future requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                navigate("/home");
            })
            .catch(err => {
                console.log(err);
                setEmailError(err.response.data);
            })
    }

    const handleFormToggle = () => {
        setFormToggle(!formToggle);
    }

    const handleInputChange = (e) => {
        const input = e.target;
        if (input.value.trim() !== "") {
            input.classList.add("has-content");
        } else {
            input.classList.remove("has-content");
        }
    }

    return (
        <div className="test">
        <img src={Logo} alt="Logo" className='logo-login'/>
            <div className='loginreg-container'>
                <i style={{ "--clr": "black" }}></i>
                <i style={{ "--clr": "black" }}></i>
                <i style={{ "--clr": "black" }}></i>
                <div className="slider-box">
                    <input id='slider' type='checkbox' checked={formToggle} onChange={handleFormToggle}/>
                    <label className='login-label' htmlFor='slider'>Login</label>
                    <label className='register-label' htmlFor='slider'>Register</label>
                    <span className="slider"></span>
                </div>
                <ul className="social-icon2">

                </ul>
                {formToggle ? (
                    <>
                        <div className="login-form">
                            <form onSubmit={loginHandler}>
                                {emailError && <p className='text-danger'>{emailError}</p>}
                                <div className="input-container-login">
                                    <input type="email" className="input-field-login" id="email" name="email" onChange={e => {setEmail(e.target.value); handleInputChange(e); }} />
                                    <label htmlFor="email" className='input-label-login'>Email:</label>
                                </div>
                                <div className="input-container-login">
                                    <input type="password" className="input-field-login" id="password" name="password" onChange={e => {setPassword(e.target.value); handleInputChange(e); }} />
                                    <label htmlFor="password" className='input-label-login'>Password:</label>
                                </div>
                                <button type="submit" className="submit-button">Login</button>
                            </form>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="registration-form">
                            <form onSubmit={registerHandler} className='register'>
                                {emailError && <p className='email-error'>{emailError}</p>}
                                {duplicateEmailError && <p className='email-error'>{duplicateEmailError}</p>}
                                <div className="input-container-login">
                                    <input type="email" className="input-field-login" id="email" name="email" onChange={e => {setEmail(e.target.value);  handleInputChange(e); }} />
                                    <label htmlFor="email" className='input-label-login'>Email:</label>
                                </div>
                                {passwordError && <p className='password-error'>{passwordError}</p>}
                                <div className="input-container-login">
                                    <input type="password" className="input-field-login" id="password" name="password" onChange={e => {setPassword(e.target.value);  handleInputChange(e); }} />
                                    <label htmlFor="password" className='input-label-login'>Password:</label>
                                </div>
                                {confirmPasswordError && <p className='confirmPassword-error'>{confirmPasswordError}</p>}
                                <div className="input-container-login">
                                    <input type="password" className="input-field-login" id="confirmPassword" name="confirmPassword" onChange={e => {setConfirmPassword(e.target.value);  handleInputChange(e); }} />
                                    <label htmlFor="confirmPassword" className='input-label-login'>Confirm Password:</label>
                                </div>
                                <button type="submit" className="submit-button">Register</button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
        
    )
}

export default LoginReg;
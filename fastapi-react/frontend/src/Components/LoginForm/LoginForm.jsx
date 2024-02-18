import React from 'react';
import './LoginForm.css';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import { useState, useRef, useEffect } from 'react';

function LoginForm() {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [pwd, setPwd] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default action of the form ????

        if (user === 'admin' && pwd === 'admin') {
            setSuccess(true);
            setErrMsg('');
            setPwd('');
            setUser('');
            userRef.current.focus();
        } else {
            setErrMsg('Invalid username or password');
            setSuccess(false);
            setPwd('');
            setUser('');
            userRef.current.focus();
        }
    };

    return (
        <div className="wrapper">
            {success ? (
                <div className='success-msg'>
                    <h3>Login Successful</h3>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className='input-box'>
                        <input
                            type='text'
                            placeholder='Username'
                            ref={userRef}
                            autoComplete='off'
                            id='username'
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                        <FaUser className='icon' />
                    </div>
                    <div className='input-box'>
                        <input
                            type='password'
                            placeholder='Password'
                            id='password'
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <FaUnlockAlt className='icon' />
                    </div>

                    <div className='remember-forgot'>
                        <label><input type="checkbox" />Remember me</label>
                        Forgot password?
                    </div>

                    <button type='submit'>Login</button>

                    <div className='register-link'>
                        <p>Don't have an account? <Link to="/register"> Register</Link> </p>
                    </div>
                </form>
            )}
        </div>
    );
}

export default LoginForm;

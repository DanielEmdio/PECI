import React from 'react';
import './RegisterForm.css';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import { useState, useRef, useEffect } from 'react';
import api from "../../api";

function RegisterForm() {
    const userRef = useRef();
    //const errRef = useRef();

    const [user, setUser] = useState('');
    //const [errMsg, setErrMsg] = useState('');
    const [pwd, setPwd] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    /*
      useEffect(() => {
        setErrMsg('');
      }, [user, pwd]);
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        /*
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
        */
        const loginform = { username: user, password: pwd };
        const response = await api.post("/addUserCustom", loginform);
        setPwd('');
        setUser('');
        setSuccess(true);
    };

    return (
        <div className="wrapper">
            {success ? (
                <div className='success-msg'>
                    <h3>Login Successful</h3>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h1>Sign in</h1>
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

                    <button type='submit'>Sign in</button>

                    <div className='register-link'>
                        <p>I have a account. <Link to="/"> Login</Link> </p>
                    </div>
                </form>
            )}
        </div>
    );
}

export default RegisterForm;

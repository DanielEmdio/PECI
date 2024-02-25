import React from 'react';
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
        <div className="wrapper w-96 bg-opacity-25 border-2 border-white border-opacity-20 backdrop-blur-md shadow-md text-white rounded-lg p-8 bg-black">
            {success ? (
                <div className='success-msg'>
                    <h3>Login Successful</h3>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h1 className='text-3xl text-center'>Login</h1>
                    <div className='input-box relative w-full h-12 my-8'>
                        <input
                            type='text'
                            placeholder='Username'
                            ref={userRef}
                            autoComplete='off'
                            id='username'
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            className='w-full h-full bg-transparent outline-none border-2 border-white border-opacity-20 rounded-full text-white text-base pl-20 pr-5 py-3'
                        />
                        <FaUser className='icon absolute right-4 top-1/2 transform -translate-y-1/2 text-base' />
                    </div>
                    <div className='input-box relative w-full h-12 my-8'>
                        <input
                            type='password'
                            placeholder='Password'
                            id='password'
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            className='w-full h-full bg-transparent outline-none border-2 border-white border-opacity-20 rounded-full text-white text-base pl-20 pr-5 py-3'
                        />
                        <FaUnlockAlt className='icon absolute right-4 top-1/2 transform -translate-y-1/2 text-base' />
                    </div>

                    {/*
                    <div className='remember-forgot flex justify-between text-sm mt-[-15px] mb-[15px]'>
                        <label><input type="checkbox" className='form-checkbox text-white mr-1' />Remember me</label>
                        Forgot password?
                    </div>
                    */}
                    <button type='submit' className='w-full h-12 bg-white border-none outline-none rounded-full shadow-md cursor-pointer text-base font-bold text-gray-700'>Login</button>

                    <div className='register-link text-sm text-center mt-5 mb-4'>
                        <p>Don't have an account? <Link to="/register"> Register</Link> </p>
                    </div>
                </form>
            )}
        </div>
    );
}

export default LoginForm;

import { useState, useRef, useEffect } from 'react';
import { FaUnlockAlt } from "react-icons/fa";
import * as utils from "../../Utils/utils";
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { api } from "../../api";
import React from 'react';
import { MdOutlineMail } from "react-icons/md";

function RegisterPt() {

    utils.checkAuthentication();
    
    const userRef = useRef();


    // details will be dictionary with the following keys: name, email, description, tags, photo, price, slots, lang, hours, education, bg
    const [details, setDetails] = useState({ name: '', email: '', description: '', tags: [], photo: '', price: '', slots: '', lang: '', hours: '', education: '', bg: '' });
    //const [file, setFile] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = (form) => {
        // prevent form submission
        form.preventDefault();

        // details will be dictionary with the following keys: name, email, description, tags, photo, price, slots, lang, hours, education, bg
        api.post("/users/registerPTdetails", {token: utils.getCookie("token"),details}).then((r) => {
            const data = r.data;

            // check for errors
            if (data["result"] !== "ok") {
                setErrMsg(data["error"]);
                return;
            }

            utils.goToHome();
        }).catch((_) => { });
    };

    return (
        <div className="w-96 bg-opacity-25 border-2 border-white border-opacity-20 backdrop-blur-md shadow-md text-white rounded-lg p-8 bg-black">
            <form onSubmit={handleSubmit}>
                <h1 className='text-3xl text-center'>Please fill in the form!</h1>
                <div role="tablist" className="tabs tabs-lifted my-3">
                    <Link to={"/register/athlete"} role="tab" className="tab text-white">Athlete</Link>
                    <Link to={"/register/trainer"} role="tab" className="tab tab-active">Trainer</Link>
                </div>
                <div className='input-box relative w-full h-12 my-3'>
                    <input
                        type='text'
                        placeholder='Username'
                        ref={userRef}
                        autoComplete='off'
                        id='username'
                        onChange={(e) => setDetails({...details, name: e.target.value})}
                        value={user}
                        required
                        className='w-full h-full bg-transparent outline-none border-2 border-white border-opacity-20 rounded-full text-white text-base pl-20 pr-5 py-3'
                    />
                    <FaUser className='icon absolute right-4 top-1/2 transform -translate-y-1/2 text-base' />
                </div>
                <div className='input-box relative w-full h-12 my-3'>
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
                <div className='input-box relative w-full h-12 my-3'>
                    <input
                        type='text'
                        placeholder='Email'
                        ref={userRef}
                        autoComplete='off'
                        id='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        className='w-full h-full bg-transparent outline-none border-2 border-white border-opacity-20 rounded-full text-white text-base pl-20 pr-5 py-3'
                    />
                    <MdOutlineMail className='icon absolute right-4 top-1/2 transform -translate-y-1/2 text-base' />
                </div>

                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-3">
                            <label for="date" className="mb-3 block text-base font-medium">
                                Date:
                            </label>
                            <input type="date" name="date" id="date"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-3">
                            <label for="time" className="mb-3 block text-base font-medium">
                                Time:
                            </label>
                            <input type="time" name="time" id="time"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                </div>

                <label for="time" className="mb-3 block text-base font-medium">
                    Probative:
                </label>
                <input onChange={(e) => setFile(e.target.value)} value={file} required type="file" className="file-input file-input-bordered w-full max-w-xs text-black mb-3" />


                <div className='text-red-500 text-center mb-2'> {errMsg} </div>
                <button type='submit' className='w-full h-12 bg-white border-none outline-none rounded-full shadow-md cursor-pointer text-base font-bold text-gray-700'>Register</button>

                <div className='register-link text-sm text-center mt-3'>
                    <p>I have a account. <Link to="/login" className='link link-success'> Login</Link> </p>
                </div>
            </form>
        </div>
    );
}

export default RegisterPt;

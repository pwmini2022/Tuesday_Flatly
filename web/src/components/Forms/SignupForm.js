import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import Popup from '../Buttons/Popup';

import '../styles.css';
import { signup } from '../utils/apiCalls';
import { user } from '../utils/Atoms';

function SignupForm() {
    const [userCred, setUserCred] = useRecoilState(user)
    const [wrong, setWrong] = useState({
        noInputs: false,
        wrongEmail: false
    });
    const [userCredentials, setUserCredentials] = useState({
        "username": "",
        "email": "",
        "password": "",
    });

    const handleClick = () => {
        if (!userCredentials.username || !userCredentials.email || !userCredentials.password) {
            setWrong({...wrong, noInputs: true});
        } else if (!userCredentials.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setWrong({noInputs: false, wrongEmail: true});
        } else {
            setWrong({noInputs: false, wrongEmail: false});
            signup(userCredentials).then(res => {
                setUserCred({
                    username: res.username,
                    email: res.email
                });
            })
        }
    }

    return (
        <div>
            <form>
                <label>Username</label>
                <input type="text" className="loginForm" placeholder='Username' onChange={e => 
                    setUserCredentials({...userCredentials, username: e.target.value})}/>

                <label>Email</label>
                <input type="text" className="loginForm" placeholder='Password' onChange={e => 
                    setUserCredentials({...userCredentials, email: e.target.value})}/>

                <label>Password</label>
                <input type="password" className="loginForm" placeholder='Password' onChange={e => 
                    setUserCredentials({...userCredentials, password: e.target.value})}/>

                <input type="button" value="Sign Up" onClick={() => handleClick()} className='login-btn'/>
            </form>

            {wrong.noInputs ? <Popup text="Please fill the form"></Popup> : <></>}
            {wrong.wrongEmail ? <Popup text="Please provide valid email address"></Popup> : <></>}
        </div>
    )
}   

export default SignupForm;
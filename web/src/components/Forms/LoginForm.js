import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Popup from '../Buttons/Popup';

import '../styles.css';
import { login } from '../utils/apiCalls';
import { logged, token } from '../utils/Atoms';

function LoginForm() {
    const [jwt, setJWT] = useRecoilState(token);
    const [log, setLog] = useRecoilState(logged);
    const [error, setError] = useState({
        noInput: false,
        wrongInput: false
    });
    const [userCredentials, setUserCredentials] = useState({
        "username": "",
        "password": ""
    });

    const handleClick = () => {
        if (!userCredentials.username || !userCredentials.password){
            setError({noInput: true, wrongInput: false});
        } else {
            setError({noInput: false, wrongInput: false});
            login(userCredentials).then(res => {
                if (res) {
                    setJWT(res.jwttoken);
                    setLog(true);
                } else {
                    setError({noInput: false, wrongInput: true})
                }
            })
        }
    }

    return (
        <div>
            <form>
                <label>Username</label>
                <input type="text" className="loginForm" placeholder='Username' onChange={e => 
                    setUserCredentials({...userCredentials, username: e.target.value})}/>

                <label>Password</label>
                <input type="password" className="loginForm" placeholder='Password' onChange={e => 
                    setUserCredentials({...userCredentials, password: e.target.value})}/>

                <input type="button" value="Log In" onClick={() => handleClick()} className='login-btn'/>

                <Link to="/signup">Create an account</Link>
            </form>
            
            {error.noInput ? <Popup text="Please fill the form"></Popup> : <></>}
            {error.wrongInput ? <Popup text="Username or password is incorrect"></Popup> : <></>}
        </div>
    )
}   

export default LoginForm;
import logo from '../../logo.svg';
import React from 'react';
import { useRecoilState } from 'recoil';
import {
    Routes,
    Route,
    Outlet,
    Link,
    useSearchParams
  } from "react-router-dom";

import '../styles.css';
import { logged, token, user } from '../utils/Atoms';

function LoggedHeader() {
    const [log, setLog] = useRecoilState(logged);
    const [userCred, setUserCred] = useRecoilState(user);
    const [jwt, setJWT] = useRecoilState(token);
    
    return (
        <div className='header'>
            <div className='left'>
                <img src={logo} width="100"></img>
                <Link to="/"><p>Flatly</p></Link>
            </div>
            <div className='right'>
                <Link to="/"><p>Home</p></Link>
                <Link to="/flats"><p>Flats</p></Link>
                <Link to="/bookings"><p>Bookings</p></Link>
                <Link to="/login"><p onClick={() => {
                    setLog(false);
                    setUserCred({username: "", email: ""});
                    setJWT("");
                }}>Log Out</p></Link>
            </div>
        </div>
    )
}   

export default LoggedHeader;
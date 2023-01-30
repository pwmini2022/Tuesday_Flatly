import logo from '../../logo.svg';
import React from 'react';
import {
    Routes,
    Route,
    Outlet,
    Link,
    useSearchParams
  } from "react-router-dom";

import '../styles.css';

function LoginHeader() {
    return (
        <div className='header'>
            <div className='left'>
                <img src={logo} width="100"></img>
                <Link to="/"><p>Flatly</p></Link>
            </div>
            <div className='right'>
                <Link to="/"><p>Home</p></Link>
                <Link to="/login"><p>Log In</p></Link>
            </div>
        </div>
    )
}   

export default LoginHeader;
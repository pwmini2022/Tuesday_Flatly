import logo from '../logo.svg';
import React from 'react';

import './styles.css';

function LoginHeader() {
    return (
        <div>
            <div className='header'>
                <div className='left'>
                    <img src={logo} width="100"></img>
                    <p>Flatly</p>
                </div>
                <div className='right'>
                    <p>Home</p>
                    <p>Login</p>
                </div>
            </div>
        </div>
    )
}   

export default LoginHeader;
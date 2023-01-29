import React from 'react';
import LoginHeader from './LoginHeader';
import LoginForm from './LoginForm';
 
import './styles.css';

function LoginScreen() {
    return (
        <div>
            <LoginHeader/>
            <LoginForm/>
        </div>
    )
}   

export default LoginScreen;
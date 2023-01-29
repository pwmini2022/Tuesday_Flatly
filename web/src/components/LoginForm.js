import React from 'react';

import './styles.css';

function LoginForm() {
    return (
        <div>
            <form>
                <label>Username</label>
                <input type="text" className="loginForm" placeholder='Username / Email'/>

                <label>Password</label>
                <input type="password" className="loginForm" placeholder='Password'/>

                <input type="button" value="Log In" className='login-btn'/>
            </form>
        </div>
    )
}   

export default LoginForm;
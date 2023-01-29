import logo from '../logo.svg';
import React from 'react';

import './styles.css';

function LoggedHeader() {
    return (
        <div>
            <div className='header'>
                <div className='left'>
                    <img src={logo} width="100"></img>
                    <p>Flatly</p>
                </div>
                <div className='right'>
                    <p>Home</p>
                    <p>Flats</p>
                    <p>Bookings</p>
                    <p>Log out</p>
                </div>
            </div>
        </div>
    )
}   

export default LoggedHeader;
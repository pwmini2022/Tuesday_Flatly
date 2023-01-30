import React, { useState } from 'react';

import '../styles.css';

function Popup(props) {
    return (
        <div className='popup'>
            { props.text }
        </div>
    )
}   

export default Popup;
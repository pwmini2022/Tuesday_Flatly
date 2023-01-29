import React, { useEffect, useState } from 'react';
import LoggedHeader from './LoggedHeader';
import img from '../img.jpg'

import { getBookings } from './utils/apiCalls'

import './styles.css'

const FLAT = {
    "uuid": "0442a088-8f82-440f-bf2d-862ec8e0759a",
    "admin_id": 2,
    "offer_id": 1,
    "startDate": "2023-01-25T14:38:43",
    "endDate": "2023-01-25T14:38:43",
    "first_name": "eks",
    "last_name": "dee"
}

function BookingViewScreen(props) {
    const [booking, setBooking] = useState({});
    // useEffect(() => {
    //     getBookings(props.ownerId, props.OfferId).then(_booking => {
    //         setBooking(_booking);
    //     })
    // }, []);

    return (
        <div>
            <LoggedHeader/>
            <div className='viewFlat'>
                <img src={img} width="400px"></img>

                <div className='flatDesc'>
                    <p><b>First Name:</b> {FLAT.first_name}</p>
                    <p><b>Last Name:</b> {FLAT.last_name}</p>   
                    <p><b>Start Date:</b> {FLAT.startDate}</p>
                    <p><b>End Date:</b> {FLAT.endDate}</p>
                
                    <div className='viewFlatBtn' >
                        <input type="button" value="Cancel"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingViewScreen;
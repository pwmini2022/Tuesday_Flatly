import React, { useEffect, useState } from 'react';
import LoggedHeader from './LoggedHeader';
import BookingItem from './BookingItem';

import { getBookings } from './utils/apiCalls'
 
import './styles.css';

function BookingsScreen() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        // getBookings().then(_bookings => {
        //     setBookings(_bookings);
        // })

        setBookings([{
            "uuid": "0442a088-8f82-440f-bf2d-862ec8e0759a",
            "admin_id": 2,
            "offer_id": 1,
            "startDate": "2023-01-25T14:38:43",
            "endDate": "2023-01-25T14:38:43",
            "first_name": "eks",
            "last_name": "dee"
        },{
            "uuid": "0442a088-8f82-440f-bf2d-862ec8e0759a",
            "admin_id": 2,
            "offer_id": 1,
            "startDate": "2023-01-25T14:38:43",
            "endDate": "2023-01-25T14:38:43",
            "first_name": "eks",
            "last_name": "dee"
        }
    ])
    }, []);

    

    return (
        <div>
            <LoggedHeader/>
            <h2>Your Bookings:</h2>
            <div>
                {bookings.map(_booking => {
                    return (
                        <BookingItem booking={_booking}></BookingItem>
                    )
                })}
            </div>  
        </div>
    )
}   

export default BookingsScreen;
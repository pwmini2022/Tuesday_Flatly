import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import BookingItem from './BookingItem';
import { token, user } from '../utils/Atoms';

import { getBookings } from '../utils/apiCalls'
 
import '../styles.css';

function BookingsScreen() {
    const [index, setIndex] = useState(0);
    const [jwt] = useRecoilState(token);
    const [bookings, setBookings] = useState([]);
    const [userCred] = useRecoilState(user);
    
    useEffect(() => {
        getBookings(jwt, NaN, userCred.id).then(_bookings => {
            setBookings(_bookings);
        })
    }, []);

    console.log(userCred)

    return (
        <div>
            <h2>Your Bookings:</h2>
            <div>
                {bookings.map(_booking => {
                    return (
                        <BookingItem booking={_booking}></BookingItem>
                    )
                })}
            </div>  
            
            <div className='pageBtn'>
                <input type="button" value="<" onClick={() => setIndex(index-1)}/>
                <input type="button" value=">" onClick={() => setIndex(index+1)}/>
            </div>
        </div>
    )
}   

export default BookingsScreen;
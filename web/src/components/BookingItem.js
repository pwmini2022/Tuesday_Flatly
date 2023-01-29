import React from 'react';
import img from '../img.jpg'

import './styles.css'

function BookingItem(props) {
    return (
        <div>
            <div className='apartmentList'>
                <img src={img} width="200px"/>
                <div>
                    <p className='text' id='topBooking'><b>Name:</b> {props.booking.first_name} {props.booking.last_name}</p>
                    <p className='text'><b>Start Date:</b> {props.booking.startDate}</p>
                    <p className='text'><b>End Date:</b> {props.booking.endDate}</p>
                </div>
                <input type="button" className='search-btn' id='viewBooking-btn' value="View"/>
            </div>
        </div>
    )
}   

export default BookingItem;
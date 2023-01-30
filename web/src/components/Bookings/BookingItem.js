import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../img.jpg'

import '../styles.css'

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
                <Link to={`/bookingsview/${props.booking.uuid}`} id='viewBooking-btn'><input type="button" className='search-btn' value="View"/></Link>
            </div>
        </div>
    )
}   

export default BookingItem;
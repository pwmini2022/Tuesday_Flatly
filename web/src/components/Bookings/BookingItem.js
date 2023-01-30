import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { getOfferImages } from '../utils/apiCalls';
import { token } from '../utils/Atoms';

import img from '../../img.jpg'

import '../styles.css'

function BookingItem(props) {
    const [jwt] = useRecoilState(token);
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        getOfferImages(jwt, props.booking.offer_uuid).then(_images => {
            console.log(_images)
            setImages(_images);
        }).catch(err => {
            console.error(JSON.stringify(err));
            setImages([]);
        })
    }, []);

    return (
        <div>
            <div className='apartmentList'>
                <img src={images[0] ? images[0] : img} width="200px"/>
                <div className='width'>
                    <p className='text'><b>Name:</b> {props.booking.first_name} {props.booking.last_name}</p>
                    <p className='text'><b>Start Date:</b> {props.booking.dateFrom}</p>
                    <p className='text'><b>End Date:</b> {props.booking.dateTo}</p>
                </div>
                <Link to={`/bookingsview/${props.booking.uuid}`} id='viewBooking-btn'><input type="button" className='search-btn' value="View"/></Link>
            </div>
        </div>
    )
}   

export default BookingItem;
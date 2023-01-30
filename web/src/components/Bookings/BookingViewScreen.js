import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useParams, Link } from 'react-router-dom';

import { getBookings, getOfferImages, deleteBooking } from '../utils/apiCalls'
import { token } from '../utils/Atoms';

import '../styles.css'
import img from '../../img.jpg'

function BookingViewScreen() {
    const [index, setIndex] = useState(0);
    const [jwt] = useRecoilState(token);
    const [booking, setBooking] = useState({});
    const { id } = useParams();
    const [images, setImages] = useState([]);

    useEffect(() => {
        getBookings(jwt, id, NaN).then(_booking => {
            setBooking(_booking[0]);
        })
        
        getOfferImages(jwt, booking.offer_uuid).then(_images => {
            setImages(_images);
        }).catch(err => {
            console.error(JSON.stringify(err));
            setImages([]);
        })
    }, []);

    return (
        <div>
            <div className='viewFlat'>
                <div className='displayInlineFlex'>
                    <input type="button" value="<" onClick={() => setIndex(index-1)}/>
                    <img src={images[index % images.length] ? images[index % images.length] : img} width="400px"></img>
                    <input type="button" value=">" onClick={() => setIndex(index+1)}/>
                </div>

                <div className='flatDesc'>
                    <p><b>First Name:</b> {booking.first_name}</p>
                    <p><b>Last Name:</b> {booking.last_name}</p>   
                    <p><b>Start Date:</b> {booking.dateFrom}</p>
                    <p><b>End Date:</b> {booking.dateTo}</p>
                    <p><b>Number of Adults:</b> {booking.numberOfAdults}</p>
                    <p><b>Number of Kids:</b> {booking.numberOfKids}</p>
                </div>
            </div>
            <div className='viewFlatBtn' >
                <Link to="/bookings"><input type="button" value="Cancel" onClick={() => {
                    deleteBooking(jwt, id);
                }}/></Link>
            </div>
        </div>
    )
}

export default BookingViewScreen;
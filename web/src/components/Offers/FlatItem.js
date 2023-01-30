import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { deleteOffer, getOfferImages } from '../utils/apiCalls';
import { token } from '../utils/Atoms';

import img from '../../img.jpg'

import '../styles.css'

function FlatItem(props) {
    const [jwt] = useRecoilState(token);
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        getOfferImages(jwt, props.flat.uuid).then(_images => {
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
                <img src={images[0] ? images[0] : img}  width="200px"/>
                <div className='width'>
                    <p className='text' id='top'><b>Apartment</b> {props.flat.name}</p>
                    <p className='text'><b>Location:</b> {props.flat.location}</p>
                    <p className='text'><b>Price:</b> {props.flat.price} $/night</p>
                </div>
                <Link to={`/flatsview/${props.flat.uuid}`} id='viewLeft-btn'><input type="button" className='search-btn' value="View"/></Link>
                <input type="button" className='search-btn' id='view-btn' value="DELETE" onClick={() => deleteOffer(props.index)}/>
            </div>
        </div>
    )
}   

export default FlatItem;
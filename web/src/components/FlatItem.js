import React from 'react';
import { deleteOffer } from './utils/apiCalls';
import img from '../img.jpg'

import './styles.css'

function FlatItem(props) {
    return (
        <div>
            <div className='apartmentList'>
                <img src={img} width="200px"/>
                <div>
                    <p className='text' id='top'><b>Apartment</b> {props.index}</p>
                    <p className='text'><b>Location:</b> {props.location}</p>
                </div>
                <input type="button" className='search-btn' id='viewLeft-btn' value="View"/>
                <input type="button" className='search-btn' id='view-btn' value="DELETE" onClick={() => deleteOffer(props.index)}/>
            </div>
        </div>
    )
}   

export default FlatItem;
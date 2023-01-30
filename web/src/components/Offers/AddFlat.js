import React, { useEffect, useState } from 'react';
import img from '../../img.jpg'

import { postOffer } from '../utils/apiCalls'

import '../styles.css'

function AddFlat() {
    const [flat, setFlat] = useState({
        "location": "",
        "startDate": 0,
        "endDate": 0,
        "numberOfKids": 0,
        "numberOfAdults": 0
    });

    const handleClick = () => {
        if (!flat.location && !flat.numberOfAdults && !flat.numberOfKids) {
            postOffer('ownerId', JSON.stringify(flat));
        }
    }

    return (
        <div>
            <div className='viewFlat'>
                <img src={img} width="400px"></img>
                <div id='viewFlatFlexAround'>
                    <div className='flatDesc' id='inputTop'>
                        <p><b>Location:</b></p> 
                        <p><b>Start Date:</b></p> 
                        <p><b>End Date:</b></p> 
                        <p><b>Number of kids:</b></p> 
                        <p><b>Number of adults:</b></p> 
                    </div>
                    <div className='inputs'>
                        <input type="text" onChange={e => {setFlat({...flat, location: e.target.value})}}/>
                        <input type="text" onChange={e => {setFlat({...flat, startDate: e.target.value})}}/>
                        <input type="text" onChange={e => {setFlat({...flat, endDate: e.target.value})}}/>
                        <input type="text" onChange={e => {setFlat({...flat, numberOfKids: e.target.value})}}/>
                        <input type="text" onChange={e => {setFlat({...flat, numberOfAdults: e.target.value})}}/>
                    </div>
                </div>
            </div>
            <div className='viewFlatBtn' id='viewFlatFlex'>
                <input type="button" value="SAVE" onClick={() => handleClick()}/>
            </div>
        </div>
    )
}

export default AddFlat;
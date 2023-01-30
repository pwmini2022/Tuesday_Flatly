import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { postOffer } from '../utils/apiCalls'
import { token, user } from '../utils/Atoms';

import '../styles.css'
import img from '../../img.jpg'

function AddFlat() {
    const [jwt] = useRecoilState(token);
    const [userCred] = useRecoilState(user);
    const [flat, setFlat] = useState({
        "location": "",
        "dateFrom": 0,
        "dateTo": 0,
        "numberOfKids": 0,
        "numberOfAdults": 0,
        "description": "",
        "name": "",
        "price": 0,
    });

    const handleClick = () => {
        console.log(flat)
        if (!flat.location && !flat.numberOfAdults && !flat.numberOfKids) {
            postOffer(jwt, userCred.id, [flat])
            .then(res => console.log(res))
            .catch(err => console.error(JSON.stringify(err)))
        }
    }

    return (
        <div>
            <div className='viewFlat'>
                <img src={img} width="400px"></img>
                <div id='viewFlatFlexAround'>
                    <div className='flatDesc' id='inputTop'>
                        <p><b>Name:</b></p> 
                        <p><b>Price:</b></p> 
                        <p><b>Location:</b></p> 
                        <p><b>Start Date:</b></p> 
                        <p><b>End Date:</b></p> 
                        <p><b>Number of kids:</b></p> 
                        <p><b>Number of adults:</b></p> 
                    </div>
                    <div className='inputs'>
                        <input type="text" onChange={e => {setFlat({...flat, name: e.target.value})}}/>
                        <input type="text" onChange={e => {setFlat({...flat, price: parseInt(e.target.value)})}}/>
                        <input type="text" onChange={e => {setFlat({...flat, location: e.target.value})}}/>
                        <input type="text" onChange={e => {setFlat({...flat, dateFrom: parseInt(e.target.value)})}}/>
                        <input type="text" onChange={e => {setFlat({...flat, dateTo: parseInt(e.target.value)})}}/>
                        <input type="text" onChange={e => {setFlat({...flat, numberOfKids: parseInt(e.target.value)})}}/>
                        <input type="text" onChange={e => {setFlat({...flat, numberOfAdults: parseInt(e.target.value)})}}/>
                    </div>
                </div>
            </div>
            <div className='addFlatDesc'>
                <input  type="text" value={flat.description} placeholder="Description" onChange={e => {setFlat({...flat, description: e.target.value})}}/>
            </div>
            <div className='viewFlatBtn'>
                <input type="button" value="SAVE" onClick={() => handleClick()}/>
            </div>
        </div>
    )
}

export default AddFlat;
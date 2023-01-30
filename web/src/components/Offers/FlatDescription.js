import React, { useEffect, useState } from 'react';
import { putOffer } from '../utils/apiCalls';

import '../styles.css'


function FlatDescription(props) {
    const [flat, setFlat] = useState({});
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        setFlat(props.flat);
        console.log(props.flat);
        console.log(flat)
    }, []);

    const handleClick = () => {
        setEdit(!edit);

        if(!edit) {
            putOffer(flat.id, JSON.stringify(flat));
        }
    }

    return (
        <div>
            <div className='flatDesc'>
                <p><b>Location:</b> {flat.location}</p>
                <p><b>Start Date:</b> {flat.dateFrom}</p>
                <p><b>End Date:</b> {flat.dateTo}</p>
            </div>
            <div className='flatDesc'>
                <p><b>Number of kids:</b> {edit ? <input type="text" value={flat.numberOfKids} onChange={e => 
                    setFlat({...flat, numberOfKids: e.target.value})}/> : flat.numberOfKids}</p>
                <p><b>Number of adults:</b> {edit ? <input type="text" value={flat.numberOfAdults} onChange={e => 
                    setFlat({...flat, numberOfAdults: e.target.value})}/> : flat.numberOfAdults}</p>
                <p><b>Price:</b> {edit ? <input type="text" value={flat.price} onChange={e => 
                    setFlat({...flat, price: e.target.value})}/> : flat.price}</p>
            </div>
            <div className='viewFlatBtn' id='viewFlatFlex'>
                <input type="button" value={edit ? "SAVE" : "EDIT"} onClick={() => handleClick()}/>
                <input type="button" value="DISABLE"/>
            </div>
        </div>
    )
}

export default FlatDescription;
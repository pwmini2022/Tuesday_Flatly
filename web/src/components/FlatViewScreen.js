import React, { useEffect, useState } from 'react';
import LoggedHeader from './LoggedHeader';
import FlatDescription from './FlatDescription';
import img from '../img.jpg'

import { getOffers } from './utils/apiCalls'

import './styles.css'

const FLAT = {
    "id": 1,
    "owner_id": 2,
    "location": "offer1",
    "startDate": "2023-01-25T01:00:00",
    "endDate": "2023-01-25T01:00:00",
    "numberOfKids": 90,
    "numberOfAdults": 3000
}

function FlatViewScreen(props) {
    const [flat, setFlat] = useState({});

    useEffect(() => {
        getOffers(props.id).then(_flats => {
            setFlat(_flats);
        })
    }, []);

    return (
        <div>
            <LoggedHeader/>
            <div className='viewFlat'>
                <img src={img} width="400px"></img>
                <h2>Apartment {FLAT.id}</h2>
            </div>
            <FlatDescription flat={FLAT}/>
        </div>
    )
}

export default FlatViewScreen;
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import FlatDescription from './FlatDescription';
import { useParams } from 'react-router-dom';

import { getOffers } from '../utils/apiCalls';
import { token } from '../utils/Atoms';

import '../styles.css';
import img from '../../img.jpg'

function FlatViewScreen() {
    const [jwt] = useRecoilState(token)
    const [flat, setFlat] = useState({});
    const { id } = useParams();
    
    useEffect(() => {
        getOffers(jwt, "uuid", id).then(_flats => {
            setFlat(_flats[0]);
        })
    }, []);

    return (
        <div>
            <div className='viewFlat'>
                <img src={img} width="400px"></img>
                <h2>{flat.name}</h2>
            </div>
            <FlatDescription flat={flat}/>
        </div>
    )
}

export default FlatViewScreen;
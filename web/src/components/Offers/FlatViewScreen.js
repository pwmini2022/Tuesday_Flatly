import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import { getOffers, putOffer, getOfferImages, getFlat } from '../utils/apiCalls';
import { token } from '../utils/Atoms';

import '../styles.css';
import img from '../../img.jpg'

function FlatViewScreen() {
    const [index, setIndex] = useState(0);
    const [jwt] = useRecoilState(token)
    const [flat, setFlat] = useState({});
    const [edit, setEdit] = useState(false);
    const { id } = useParams();
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        getFlat(jwt, id).then(_flats => {
            setFlat(_flats[0]);
        })

        getOfferImages(jwt, id).then(_images => {
            console.log(images)
            setImages(_images);
        }).catch(err => {
            console.error(JSON.stringify(err));
            setImages([]);
        })
    }, []);

    const handleClick = () => {
        setEdit(!edit);

        if(edit) {
            setFlat({
                dateFrom: parseInt(flat.dateFrom),
                dateTo: parseInt(flat.dateTo),
                description: flat.description,
                location: flat.location,
                name: flat.name,
                numberOfAdults: parseInt(flat.numberOfAdults),
                numberOfKids: parseInt(flat.numberOfKids),
                owner_id: flat.owner_id,
                price: parseInt(flat.price),
                uuid: flat.uuid
            })

            console.log(flat)
            putOffer(jwt, flat.uuid, JSON.stringify(flat));
        }
    }

    return (
        <div>
            <div className='viewFlat'>
                <div className='displayInlineFlex'>
                    <input type="button" value="<" onClick={() => setIndex(index-1)}/>
                    <img alt={"Apartment"} src={images[index % images.length] ? images[index % images.length] : img} style={{height: "500px"}} width="400px"/>
                    <input type="button" value=">" onClick={() => setIndex(index+1)}/>
                </div>
                <h2>{flat.name}</h2>
            </div>
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
                <div className='flatDesc' id='border'>
                    <p>{edit ? <input type="text" value={flat.description} id='desc' onChange={e => 
                        setFlat({...flat, description: e.target.value})}/> : flat.description}</p>
                </div>
                <div className='viewFlatBtn' id='viewFlatFlex'>
                    <input type="button" value={edit ? "SAVE" : "EDIT"} onClick={() => handleClick()}/>
                </div>
            </div>
        </div>
    )
}

export default FlatViewScreen;
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { postOffer, postOfferImage } from '../utils/apiCalls'
import { token, user } from '../utils/Atoms';

import { useFilePicker } from 'use-file-picker';

import '../styles.css'
import selectImage from '../../selectImage.png'

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

    const [openFileSelector, { filesContent }] = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true,
        maxFileSize: 50
    });

    const handleClick = () => {
        if (flat.location && flat.numberOfAdults && flat.numberOfKids &&
            flat.dateFrom && flat.dateTo && flat.name && flat.price) {
            postOffer(jwt, userCred.id, [flat])
            .then(res => {
                setFlat({
                    "location": "",
                    "dateFrom": 0,
                    "dateTo": 0,
                    "numberOfKids": 0,
                    "numberOfAdults": 0,
                    "description": "",
                    "name": "",
                    "price": 0,
                })

                return res;
            })
            .then(res => {
                console.log(res[0].uuid);

                // post all images after we know which uuid to attach to
                for (const fileContent of filesContent) {
                    postOfferImage(jwt, res[0].uuid, fileContent)
                        .then(res => {
                            console.log(res);
                        });
                }
            })
            .catch(err => console.error(JSON.stringify(err)))
        }
    }

    return (
        <div>
            <div className='viewAddFlat'>
                <img style={{cursor: "pointer"}} src={filesContent.length ? filesContent[0].content : selectImage} alt="Upload" width="400px" onClick={() => openFileSelector()} />

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
                        <input type="text" value={flat.name} onChange={e => {setFlat({...flat, name: e.target.value})}}/>
                        <input type="text" value={flat.price} onChange={e => {setFlat({...flat, price: parseInt(e.target.value)})}}/>
                        <input type="text" value={flat.location} onChange={e => {setFlat({...flat, location: e.target.value})}}/>
                        <input type="text" value={flat.dateFrom} onChange={e => {setFlat({...flat, dateFrom: parseInt(e.target.value)})}}/>
                        <input type="text" value={flat.dateTo} onChange={e => {setFlat({...flat, dateTo: parseInt(e.target.value)})}}/>
                        <input type="text" value={flat.numberOfKids} onChange={e => {setFlat({...flat, numberOfKids: parseInt(e.target.value)})}}/>
                        <input type="text" value={flat.numberOfAdults} onChange={e => {setFlat({...flat, numberOfAdults: parseInt(e.target.value)})}}/>
                    </div>
                </div>
            </div>
            <div className='flatDesc' id='border'>
                <input type="text" value={flat.description} placeholder="Description" onChange={e => {setFlat({...flat, description: e.target.value})}}/>
            </div>
            <div className='viewFlatBtn'>
                <input type="button" value="SAVE" onClick={() => handleClick()}/>
            </div>
        </div>
    )
}

export default AddFlat;
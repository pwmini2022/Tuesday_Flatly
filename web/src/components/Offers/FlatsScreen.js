import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import FlatItem from './FlatItem';
import SortBy from '../Buttons/SortByBtn';
import SearchParam from '../Buttons/SearchParam';
import NumOfItems from '../Buttons/NumOfItems';
import { currParam, token } from '../utils/Atoms';

import { getOffers } from '../utils/apiCalls';
 
import '../styles.css';

function FlatScreen() {
    const [flats, setFlats] = useState([]);
    const [jwt] = useRecoilState(token);
    const [selectedParam] = useRecoilState(currParam);
    const [params, setParams] = useState("");

    useEffect(() => {
        getOffers(jwt, selectedParam, params).then(_flats => {
            setFlats(_flats);
        }).catch(err => {
            console.error(JSON.stringify(err));
            setFlats([]);
        })
    }, []);

    return (
        <div>
            <h2>View Flats:</h2>
            <div>
                <div className='searchAndSort'>
                    <SearchParam/>
                    <input type="text" className='searchBox' onChange={e => {setParams(e.target.value)}}></input>
                    <input type="button" value="Search" className='search-btn' onClick={() => {
                        getOffers(jwt, selectedParam, params).then(_flats => {
                            setFlats(_flats);
                        });
                    }}/>
                    <div className='sortBy'>
                        <SortBy/>
                        <NumOfItems id="itemsPage"/>
                    </div>
                </div>

                {flats.map(flat => {
                    return (
                        <FlatItem key={flat.offerUuid} flat={flat}/>
                    )
                })}
            </div>  
        </div>
    )
}   

export default FlatScreen;
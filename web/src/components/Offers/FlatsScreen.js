import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import FlatItem from './FlatItem';
import SortBy from '../Buttons/SortByBtn';
import SearchParam from '../Buttons/SearchParam';
import NumOfItems from '../Buttons/NumOfItems';
import { currParam, token, sortBy } from '../utils/Atoms';

import { getOffers } from '../utils/apiCalls';
 
import '../styles.css';

function FlatScreen() {
    const [index, setIndex] = useState(0);
    const [flats, setFlats] = useState([]);
    const [jwt] = useRecoilState(token);
    const [sort] = useRecoilState(sortBy);
    const [selectedParam] = useRecoilState(currParam);
    const [params, setParams] = useState("");

    useEffect(() => {
        getOffers(jwt, selectedParam, params, sort).then(_flats => {
            setFlats(_flats);
        }).catch(err => {
            console.error(JSON.stringify(err));
            setFlats([]);
        })
    }, []);

    const refresh = (id) => {
        setFlats(flats.filter(flat => flat.uuid != id))
    }

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
                        <FlatItem key={flat.offerUuid} flat={flat} refresh={refresh}/>
                    )
                })}
            </div>
            <div className='pageBtn'>
                <input type="button" value="<" onClick={() => setIndex(index-1)}/>
                <input type="button" value=">" onClick={() => setIndex(index+1)}/>
            </div>
        </div>
    )
}   

export default FlatScreen;
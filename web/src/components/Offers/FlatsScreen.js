import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import FlatItem from './FlatItem';
import SortBy from '../Buttons/SortByBtn';
import SearchParam from '../Buttons/SearchParam';
import NumOfItems from '../Buttons/NumOfItems';
import { currParam, token, sortBy, numOfItems } from '../utils/Atoms';

import { getOffers } from '../utils/apiCalls';
 
import '../styles.css';

function FlatScreen() {
    const [index, setIndex] = useState(1);
    const [flats, setFlats] = useState([]);
    const [jwt] = useRecoilState(token);
    const [sort] = useRecoilState(sortBy);
    const [itemsPage] = useRecoilState(numOfItems);
    const [selectedParam] = useRecoilState(currParam);
    const [params, setParams] = useState("");
    const [err, setErr] = useState(false);

    useEffect(() => {
        getOffers(jwt, selectedParam, params, sort, index, itemsPage).then(_flats => {
            setFlats(_flats);
        }).catch(err => {
            console.error(JSON.stringify(err));
            setFlats([]);
            setErr(true)
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
                        getOffers(jwt, selectedParam, params, sort, index, itemsPage).then(_flats => {
                            setFlats(_flats);
                        });
                    }}/>
                    <div className='sortBy'>
                        <SortBy onClick={() => {
                            getOffers(jwt, selectedParam, params, sort, index, itemsPage).then(_flats => {
                                setFlats(_flats);
                            });
                        }}/>
                        <NumOfItems id="itemsPage"/>
                    </div>
                </div>

                {flats.map(flat => {
                    return (
                        <FlatItem key={flat.uuid} flat={flat} refresh={refresh}/>
                    )
                })}
            </div>
            <div className='pageBtn'>
                <input type="button" value="<" onClick={() => {
                    setIndex(index-1);
                    getOffers(jwt, selectedParam, params, sort, index, itemsPage).then(_flats => {
                        setFlats(_flats);
                    });
                }} disabled={index === 1}/>
                <input type="button" value=">" onClick={() => {
                    setIndex(index+1);
                    getOffers(jwt, selectedParam, params, sort, index, itemsPage).then(_flats => {
                        setFlats(_flats);
                    });
                }} disabled={err}/>
            </div>
        </div>
    )
}   

export default FlatScreen;
import React, { useEffect, useState } from 'react';
import LoggedHeader from './LoggedHeader';
import FlatItem from './FlatItem';
import SortBy from './SortByBtn';

import { getOffers } from './utils/apiCalls'
 
import './styles.css';

function FlatScreen() {
    const [flats, setFlats] = useState([]);
    useEffect(() => {
        // getOffers().then(_flats => {
        //     setFlats(_flats);
        // })

        setFlats([{
            "id": 1,
            "owner_id": 2,
            "location": "offer1",
            "startDate": "2023-01-25T01:00:00",
            "endDate": "2023-01-25T01:00:00",
            "numberOfKids": 90,
            "numberOfAdults": 3000
        }])
    }, []);

    

    return (
        <div>
            <LoggedHeader/>
            <h2>View Flats:</h2>
            <div>
                <div className='searchAndSort'>
                    <input type="text" className='searchBox'></input>
                    <input type="button" value="Search" className='search-btn'/>
                    <div className='sortBy'>
                        <SortBy/>
                    </div>
                </div>

                {flats.map(flat => {
                    return (
                        <FlatItem key={flat.id} index={flat.id} location={flat.location}/>
                    )
                })}
            </div>  
        </div>
    )
}   

export default FlatScreen;
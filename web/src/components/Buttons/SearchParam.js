import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useRecoilState } from 'recoil';
import { currParam } from '../utils/Atoms';

function SearchParam() {
    const [param, setParam] = useRecoilState(currParam);
    const [pressed, setPressed] = useState(false);

    return (
        <Dropdown onClick={() => setPressed(!pressed)}>
        <Dropdown.Toggle className='search-btn'>
            Option
        </Dropdown.Toggle>

        {pressed ? 
            <Dropdown.Menu className='sort-vals'>
            <Dropdown.Item className='val' onClick={() => setParam('location')}>Location</Dropdown.Item>
            <Dropdown.Item className='val' onClick={() => setParam('name')}>Name</Dropdown.Item>
            <Dropdown.Item className='val' onClick={() => setParam('dateFrom')}>Date From</Dropdown.Item>
            <Dropdown.Item className='val' onClick={() => setParam('dateTo')}>Date To</Dropdown.Item>
            <Dropdown.Item className='val' onClick={() => setParam('numberOfAdults')}>Number of Adults</Dropdown.Item>
            <Dropdown.Item className='val' onClick={() => setParam('numberOfKids')}>Number of Kids</Dropdown.Item>
            </Dropdown.Menu> : <></>}
        </Dropdown>
    );
}

export default SearchParam;
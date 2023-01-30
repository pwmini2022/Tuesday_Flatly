import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useRecoilState } from 'recoil';
import { sortBy } from '../utils/Atoms';

function SortBy() {
  const [pressed, setPressed] = useState(false);
  const [sort, setSort] = useRecoilState(sortBy)

  return (
    <Dropdown onClick={() => setPressed(!pressed)}>
      <Dropdown.Toggle className='search-btn'>
        Sort By
      </Dropdown.Toggle>

      {pressed ? 
        <Dropdown.Menu className='sort-vals'>
          <Dropdown.Item className='val' onClick={() => setSort('price')}>Price: Ascending</Dropdown.Item>
          <Dropdown.Item className='val' onClick={() => setSort('-price')}>Price: Descending</Dropdown.Item>
          <Dropdown.Item className='val' onClick={() => setSort('name')}>Name: Ascending</Dropdown.Item>
          <Dropdown.Item className='val' onClick={() => setSort('-name')}>Name: Descending</Dropdown.Item>
        </Dropdown.Menu> : <></>}
    </Dropdown>
  );
}

export default SortBy;
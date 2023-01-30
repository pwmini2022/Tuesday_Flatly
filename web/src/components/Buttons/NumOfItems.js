import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useRecoilState } from 'recoil';
import { numOfItems } from '../utils/Atoms';

function NumOfItems() {
  const [pressed, setPressed] = useState(false);
  const [items, setItems] = useRecoilState(numOfItems);

  return (
    <Dropdown onClick={() => setPressed(!pressed)}>
      <Dropdown.Toggle className='search-btn'>
        Items/Page
      </Dropdown.Toggle>

      {pressed ? 
        <Dropdown.Menu className='sort-vals'>
          <Dropdown.Item className='val' onClick={() => setItems(10)}>10</Dropdown.Item>
          <Dropdown.Item className='val' onClick={() => setItems(25)}>25</Dropdown.Item>
          <Dropdown.Item className='val' onClick={() => setItems(50)}>50</Dropdown.Item>
        </Dropdown.Menu> : <></>}
    </Dropdown>
  );
}

export default NumOfItems;
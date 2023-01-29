import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function SortBy() {
  const [pressed, setPressed] = useState(false);

  return (
    <Dropdown onClick={() => setPressed(!pressed)}>
      <Dropdown.Toggle className='search-btn'>
        Sort By
      </Dropdown.Toggle>

      {pressed ? 
        <Dropdown.Menu className='sort-vals'>
          <Dropdown.Item className='val'>Price: Ascending</Dropdown.Item>
          <Dropdown.Item className='val'>Price: Descending</Dropdown.Item>
          <Dropdown.Item className='val'>Name: Ascending</Dropdown.Item>
          <Dropdown.Item className='val'>Name: Descending</Dropdown.Item>
        </Dropdown.Menu> : <></>}
    </Dropdown>
  );
}

export default SortBy;
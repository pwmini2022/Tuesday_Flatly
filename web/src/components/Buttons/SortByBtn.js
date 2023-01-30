import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useRecoilState } from 'recoil';
import { sortBy } from '../utils/Atoms';

function SortBy(props) {
  const [pressed, setPressed] = useState(false);
  const [sort, setSort] = useRecoilState(sortBy)

  return (
    <Dropdown onClick={() => {
      setPressed(!pressed);
    }}>
      <Dropdown.Toggle className='search-btn'>
        Sort By
      </Dropdown.Toggle>

      {pressed ? 
        <Dropdown.Menu className='sort-vals'>
          <Dropdown.Item className='val' onClick={() => {
              setSort('price');
              props.onClick();
              setPressed(false);
            }}>Price: Ascending</Dropdown.Item>
          <Dropdown.Item className='val' onClick={() => {
              setSort('-price');
              props.onClick();
              setPressed(false);
            }}>Price: Descending</Dropdown.Item>
          <Dropdown.Item className='val' onClick={() => {
              setSort('name');
              props.onClick();
              setPressed(false);
            }}>Name: Ascending</Dropdown.Item>
          <Dropdown.Item className='val' onClick={() => {
              setSort('-name');
              props.onClick();
              setPressed(false);
            }}>Name: Descending</Dropdown.Item>
        </Dropdown.Menu> : <></>}
    </Dropdown>
  );
}

export default SortBy;
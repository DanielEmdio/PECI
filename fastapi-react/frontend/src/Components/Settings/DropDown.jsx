import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function DropDown() {
  const [selectedItem, setSelectedItem] = useState('Payment Method');

  const handleSelect = (e) => {
    setSelectedItem(e.target.textContent);
  };

  const toggleStyles = {
    backgroundColor: '#10b981',
    color: 'white',
    borderColor: '#10b981',
    fontWeight: 'bold'
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" style={toggleStyles}>
        {selectedItem}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleSelect}>MbWay</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;

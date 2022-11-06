import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        // TODO: handle error response
      });
  }, [optionType]);

  // TODO: replace 'null' with ToppingOptions when available
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    );
  });

  return <Row>{optionItems}</Row>;
}

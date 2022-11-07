import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails';

const ScoopOption = ({ name, imagePath }) => {
  const { updateItemCount } = useOrderDetails();
  const [isInvalid, setIsInvalid] = useState(false);
  const handleChange = (e) => {
    const spinnerValue = e.target.value;
    if (
      spinnerValue == '' ||
      spinnerValue < 0 ||
      spinnerValue > 10 ||
      spinnerValue.split('.').length > 1
    ) {
      setIsInvalid(true);
      updateItemCount(name, 0, 'scoops');
    } else {
      setIsInvalid(false);
      updateItemCount(name, parseInt(spinnerValue), 'scoops');
    }
  };

  return (
    <Col sx={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column sx="6" style={{ testAligh: 'right' }}>
          {name}
        </Form.Label>
        <Col sx="5" style={{ textAlign: 'left' }}>
          <Form.Control
            className={isInvalid ? 'is-invalid' : ''}
            type="number"
            defaultValue={0}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;

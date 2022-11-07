import { Col, Form, Row } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails';

const ToppingOption = ({ name, imagePath }) => {
  const { updateItemCount } = useOrderDetails();
  const handleChange = (e) =>
    updateItemCount(name, e.target.checked ? 1 : 0, 'toppings');

  return (
    <Col sx={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
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
          <Form.Check defaultChecked={false} onChange={handleChange} />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;

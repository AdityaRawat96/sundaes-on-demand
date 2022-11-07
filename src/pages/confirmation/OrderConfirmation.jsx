import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { useEffect } from 'react';
import { useState } from 'react';
import AlertBanner from '../common/AlertBanner';

const OrderConfirmation = ({ setOrderPhase }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);
  const { resetOrder } = useOrderDetails();

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        setError(true);
      });
  }, []);

  if (error) {
    return <AlertBanner />;
  }

  const updateOrderPhase = () => {
    resetOrder();
    setOrderPhase('inProgress');
  };

  if (!orderNumber) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Thank you!</h1>
      <h3>Your order number is: {orderNumber}</h3>
      <h5>as per our terms and conditions nothing will happen now</h5>
      <Button variant="primary" onClick={updateOrderPhase}>
        Create new order
      </Button>
    </div>
  );
};

export default OrderConfirmation;

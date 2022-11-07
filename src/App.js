import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  const orderPhaseSubmitHandler = (phase) => {
    setOrderPhase(phase);
  };

  let Component = OrderEntry;
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'complete':
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <Container>
      <OrderDetailsProvider>
        <Component setOrderPhase={orderPhaseSubmitHandler} />
      </OrderDetailsProvider>
      {/* Confirmation page does not need provider */}
    </Container>
  );
}

export default App;

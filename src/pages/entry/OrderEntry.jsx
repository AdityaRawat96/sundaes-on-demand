import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';
import { Button } from 'react-bootstrap';

const OrderEntry = ({ setOrderPhase }) => {
  const { totals } = useOrderDetails();
  const grandTotal = formatCurrency(totals.scoops + totals.toppings);

  const updateOrderPhase = () => {
    setOrderPhase('review');
  };

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {grandTotal}</h2>
      <Button
        variant="primary"
        onClick={updateOrderPhase}
        disabled={!(totals.scoops > 0)}
      >
        Order Sundae!
      </Button>
    </div>
  );
};

export default OrderEntry;

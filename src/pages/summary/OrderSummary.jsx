import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';
import SummaryForm from './SummaryForm';

const OrderSummary = ({ setOrderPhase }) => {
  const { totals, optionCounts } = useOrderDetails();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    setOrderPhase('complete');
  };

  const scoopArray = Object.entries(optionCounts.scoops); // [["chocolate", 2], ["vanilla", 1]]
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingArray = Object.keys(optionCounts.toppings);
  const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {totals.toppings > 0 && (
        <div>
          <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
          <ul>{toppingList}</ul>
        </div>
      )}
      <SummaryForm submitHandler={formSubmitHandler} />
    </div>
  );
};

export default OrderSummary;

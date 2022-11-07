import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('order phases for happy path', async () => {
  const user = userEvent.setup();

  // render app
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '2');

  const hotFudgeInput = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });
  await user.click(hotFudgeInput);

  // find and click order button
  const orderSundaeButton = await screen.findByRole('button', {
    name: 'Order Sundae!',
  });
  user.click(orderSundaeButton);

  // check if summary information is correct based on order
  const scoopSubtotal = screen.getByText('Scoops total: $', {
    exact: false,
  });
  expect(scoopSubtotal).toHaveTextContent('4.00');
  const toppingSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent('1.50');

  // accept terms and conditions and click button to confirm order
  const checkbox = await screen.findByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmButton = await screen.findByRole('button', {
    name: /confirm order/i,
  });
  await user.click(checkbox);
  await user.click(confirmButton);

  // confirm that we have loading screen when user is redirected to the confirmation page
  const loader = screen.getByText('Loading...', { exact: false });
  expect(loader).toBeInTheDocument();

  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const notLoading = screen.queryByText('Loading');
  expect(notLoading).not.toBeInTheDocument();

  // confirm that we have an order number on confirmation page
  const orderNumber = await screen.findByRole('heading', {
    name: /your order number is:/i,
  });
  const orderNumberValue = orderNumber.textContent
    .replace(/your order number is:/i, '')
    .trim();
  expect(orderNumberValue).not.toHaveLength(0);

  // click "new order" button on confirmation page
  const newOrderButton = await screen.findByRole('button', {
    name: /create new order/i,
  });
  await user.click(newOrderButton);

  // check that scoops and toppings have been reset
  const vanillaInputUpdated = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  const hotFudgeInputUpdated = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });
  expect(vanillaInputUpdated).toHaveValue(0);
  expect(hotFudgeInputUpdated).not.toBeChecked();

  // do we need to await anything to avoid test errors?
});

test('Topping details should not be there on the summary page if no toppings are added', async () => {
  const user = userEvent.setup();
  render(<App />);

  // add 2 vanilla scoops
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '2');

  // Click on Order Sundae! button to go to the order summary page
  const orderSundaeButton = screen.getByRole('button', {
    name: /order sundae/i,
  });
  await user.click(orderSundaeButton);

  //Check if toppings details are there on the summary page
  const toppingHeading = screen.queryByRole('heading', {
    name: /toppings/i,
  });
  expect(toppingHeading).not.toBeInTheDocument();
});

test('Topping details should not be there on the summary page if toppings are added and then removed', async () => {
  const user = userEvent.setup();
  render(<App />);

  // add 2 vanilla scoops
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '2');

  // add Hot fudge topping
  const hotFudgeInput = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });
  await user.click(hotFudgeInput);

  // remove Hot Fudge topping
  await user.click(hotFudgeInput);

  // Click on Order Sundae! button to go to the order summary page
  const orderSundaeButton = screen.getByRole('button', {
    name: /order sundae/i,
  });
  await user.click(orderSundaeButton);

  //Check if toppings details are there on the summary page
  const toppingHeading = screen.queryByRole('heading', {
    name: /toppings/i,
  });
  expect(toppingHeading).not.toBeInTheDocument();
});

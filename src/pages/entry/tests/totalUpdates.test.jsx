import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');
  expect(scoopSubtotal).toHaveTextContent('6.00');
});

test('update topping subtotal when topping change', async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  // make sure total starts out $0.00
  const toppingSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent('0.00');

  // Check the M$M input checkbox and check subtotal
  const MNMInput = await screen.findByRole('checkbox', {
    name: 'M&Ms',
  });
  await user.click(MNMInput);
  expect(toppingSubtotal).toHaveTextContent('1.50');

  // Check the Hot Fudge input checkbox and check subtotal
  const hotFudgeInput = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });

  await user.click(hotFudgeInput);
  expect(toppingSubtotal).toHaveTextContent('3.00');

  // Uncheck the M$M input checkbox and check subtotal
  await user.click(MNMInput);
  expect(toppingSubtotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  test('grand total starts at $0.00 and grand total updates properly is scoop is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = await screen.findByRole('heading', {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('0.00');
    // update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2');

    expect(grandTotal).toHaveTextContent('4.00');
  });

  test('grand total updates properly is topping is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = await screen.findByRole('heading', {
      name: /grand total: \$/i,
    });
    // update Hot fudge toppings to checked and check grand total
    const hotFudgeInput = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
    });
    await user.click(hotFudgeInput);

    expect(grandTotal).toHaveTextContent('1.50');
  });

  test('grand total updates properly if item is removed', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = await screen.findByRole('heading', {
      name: /grand total: \$/i,
    });
    // update Hot fudge toppings to checked and check grand total
    const hotFudgeInput = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
    });
    await user.click(hotFudgeInput);
    expect(grandTotal).toHaveTextContent('1.50');
    // update Hot fudge toppings to unchecked and check grand total
    await user.click(hotFudgeInput);
    expect(grandTotal).toHaveTextContent('0.00');
  });
});

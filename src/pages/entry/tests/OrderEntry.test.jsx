import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

test('handles errors for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});

test('order sundae button should be disabled if no scoops are added and enabled if scoops are added', async () => {
  const user = userEvent.setup();
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  // add Hot fudge topping
  const hotFudgeInput = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });
  await user.click(hotFudgeInput);

  // Check if order sundae button is disabled
  const orderSundaeButton = screen.getByRole('button', {
    name: /order sundae/i,
  });
  expect(orderSundaeButton).toBeDisabled();

  // add 2 vanilla scoops
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '2');

  // Check if button is enabled
  expect(orderSundaeButton).toBeEnabled();

  // Remove Vanilla scoops
  await user.clear(vanillaInput);

  // Check if button is disabled again
  expect(orderSundaeButton).toBeDisabled();
});

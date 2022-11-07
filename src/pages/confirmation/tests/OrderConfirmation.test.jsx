import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import OrderConfirmation from '../OrderConfirmation';

test('alert shows if the order API call fails', async () => {
  server.resetHandlers(
    rest.get('https://localhost:3030/order', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
  });
});

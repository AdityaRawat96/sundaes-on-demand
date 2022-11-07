import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

test('displays image for each scoop from the server', async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Vanilla scoop', 'Chocolate scoop']);
});

test('displays image for each topping from the server', async () => {
  render(<Options optionType="toppings" />);

  // find images
  const toppingImages = await screen.findAllByRole('img', {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(2);

  // confirm alt text of images
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual(['M&Ms topping', 'Hot fudge topping']);
});

test('scoop subtotal should not change when scoops changes to invalid value', async () => {
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
  await user.type(vanillaInput, '-1');
  expect(scoopSubtotal).toHaveTextContent('0.00');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '11');
  expect(scoopSubtotal).toHaveTextContent('0.00');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '5.6');
  expect(scoopSubtotal).toHaveTextContent('0.00');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '4');
  expect(scoopSubtotal).toHaveTextContent('8.00');
});

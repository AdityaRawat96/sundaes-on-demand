import { render, screen } from '../../../test-utils/testing-library-utils';
import ScoopOption from '../ScoopOption';
import userEvent from '@testing-library/user-event';

test('Spinner turns red on invalid user input', async () => {
  const user = userEvent.setup();
  render(<ScoopOption />);

  const vanillaInput = await screen.findByRole('spinbutton');

  // Test for negative value
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '-1');
  expect(vanillaInput).toHaveClass('is-invalid');

  // Test for positive value
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '5');
  expect(vanillaInput).not.toHaveClass('is-invalid');

  // Test for value greater than 10
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '11');
  expect(vanillaInput).toHaveClass('is-invalid');

  // Test for value with decimal
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1.5');
  expect(vanillaInput).toHaveClass('is-invalid');
});

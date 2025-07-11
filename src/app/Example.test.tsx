import { render, screen } from '@testing-library/react';

function Example() {
  return <h1>Hello, Testing!</h1>;
}

test('renders the correct text', () => {
  render(<Example />);
  expect(screen.getByText('Hello, Testing!')).toBeInTheDocument();
});

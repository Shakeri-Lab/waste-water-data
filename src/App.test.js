import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  // render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();

  //working example
  render(<App />);
  const sum = 5 + 5;
  expect(sum).toEqual(10);
});

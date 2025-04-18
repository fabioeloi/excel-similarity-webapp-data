import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders UploadForm button', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', { name: /upload & process/i });
  expect(buttonElement).toBeInTheDocument();
});

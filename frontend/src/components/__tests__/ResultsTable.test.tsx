import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultsTable from '../ResultsTable';

describe('ResultsTable', () => {
  it('renders results correctly', () => {
    const results = [
      { search: 'apple', match: 'apple pie', score: 0.85 },
      { search: 'banana', match: 'banana bread', score: 0.95 },
    ];
    render(<ResultsTable results={results} />);
    expect(screen.getByText('apple')).toBeInTheDocument();
    expect(screen.getByText('apple pie')).toBeInTheDocument();
    expect(screen.getByText('85.00%')).toBeInTheDocument();
    expect(screen.getByText('banana')).toBeInTheDocument();
    expect(screen.getByText('banana bread')).toBeInTheDocument();
    expect(screen.getByText('95.00%')).toBeInTheDocument();
  });
});

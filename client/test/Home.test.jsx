import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/components/home/Home';

describe('Home Page', () => {
  it ('Should render Home Page with the correct welcome message', () => {
    render(<Home />);
    expect(screen.getByText(/Welcome to Board Together!/i)).toBeInTheDocument();
  })
});
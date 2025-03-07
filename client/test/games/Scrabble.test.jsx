import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import { MemoryRouter } from 'react-router-dom';
import Scrabble from '../../src/components/games/Scrabble.jsx';

describe('Scrabble page', ()=>{
  it('should do the things that it needs to do to do the things that it needs to do', ()=>{
    const App = render(<Scrabble/>);
    expect(screen.getByText(/Scrabble/i)).toBeInTheDocument();
  })
})
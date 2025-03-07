import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../../src/components/App.jsx';
import renderWithRouter from '../../utils/renderRouter.js';
const axios = require("axios");
const AxiosMockAdapter = require("axios-mock-adapter");
const mock = new AxiosMockAdapter(axios);

describe('Messages', () => {

  afterEach(() => {
    mock.reset();
  });

  it ('Message Board should be rendered in Scrabble', async () => {

    //Create a fire event to increase the amount of players (that is pretty much it and then you can reply with the gameId which will start the game I believe, but I was too tired last night to actually implement it because I am lazy)
    mock.onPost('/api/messages/:gameId').reply(200, {
      gameId: 'TestID',
      message: 'Test',
      createdAt: Date.now()
    });
    const app = renderWithRouter(<App />, {route: '/scrabble'});
    expect(screen.getByText(/Scrabble/i)).toBeInTheDocument();
    await app.user.click(app.getByTestId('start-scrabble'));
    await waitFor(() => {
      expect(screen.getByText(/Submit Message/i)).toBeInTheDocument();
    })
  });
});
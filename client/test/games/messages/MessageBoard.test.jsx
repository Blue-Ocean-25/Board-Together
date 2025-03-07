import React from 'react';
import {screen, waitFor, act} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../../src/components/App.jsx';
import renderWithRouter from '../../utils/renderRouter.js';
const axios = require("axios");
const AxiosMockAdapter = require("axios-mock-adapter");
const mock = new AxiosMockAdapter(axios);

const MockData = {
  "_id":"67cb499b56e92611414fb9c1",
  "room_name":"",
  "players":[
    {
      "player_id":1,
      "name":"bramblo",
      "score":0,
      "_id":"67cb499b56e92611414fb9c2"
    }
  ],
  "__v":1
}

describe('Messages', () => {

  afterEach(() => {
    mock.reset();
    mock.resetHistory();
    jest.clearAllMocks();
  });

  it ('Message Board should be rendered in Scrabble', async () => {
    mock.onPost('/api/messages/:gameId').reply(200, {
      _id: 'TestID',
      message: 'Test',
      createdAt: Date.now()
    });
    mock.onPost('/api/scrabble').reply(200, MockData);
    const app = renderWithRouter(<App />, {route: '/scrabble'});
    expect(screen.getByText(/Scrabble/i)).toBeInTheDocument();
    await app.user.click(app.getByTestId('start-scrabble'));
    expect(screen.getByText(/Submit Message/i)).toBeInTheDocument();
  });
});
import React from 'react';

import {render, screen, fireEvent, userEvent, waitFor, act} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../src/components/App.jsx';
import renderWithRouter from '../utils/renderRouter.js';
const axios = require("axios");
const AxiosMockAdapter = require("axios-mock-adapter");
const mock = new AxiosMockAdapter(axios);

import Scrabble from '../../src/components/games/Scrabble.jsx';


const defaultScrabble = {
  "_id":"67cb499b56e92611414fb9c1",
  "room_name":"",
  "players":[
    {
      "player_id":1,
      "name":"Player",
      "score":0,
      "_id":"67cb499b56e92611414fb9c2"
    }
  ],
  "__v":1
};
describe('Scrabble page', ()=>{

  afterEach(() => {
    mock.reset();
    mock.resetHistory();
    jest.clearAllMocks();
  });

  it('should render the page when player number is selected and room start is submitted.', async ()=>{
    mock.onPost('/api/scrabble/:gameId').reply(200, defaultScrabble);
    mock.onPut('/api/scrabble/:gameId').reply(200, {
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
    });

    const Apple = renderWithRouter(<App />, {route: '/scrabble'});
    const start = Apple.getByTestId('start-scrabble');
    await Apple.user.click(start);



    const name = Apple.getByTestId('scrabble-playerName0');
    const namer = Apple.getByTestId('scrabble-playerNamer0');
    const saveBtn = Apple.getByTestId('scrabble-save');

    // await Apple.user.click(name)
    waitFor(()=>{
      fireEvent.change(namer, {target:{value:'bramblo'}});
    });

    await Apple.user.click(saveBtn);

    expect(name.value).toEqual('bramblo');
  })
  it('should update usernames when typed in and submitted.', ()=>{
    const App = renderWithRouter(<App />, {route: '/scrabble'});
    //expect(screen.getByText(/Scrabble/i)).toBeInTheDocument();
    const name = Apple.getByTestId("scrabble-playerName0");

  })
})
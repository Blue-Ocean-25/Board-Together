import React from 'react';

import {render, screen, fireEvent, userEvent, waitFor, act} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../src/components/App.jsx';
import renderWithRouter from '../utils/renderRouter.js';
const axios = require("axios");
const AxiosMockAdapter = require("axios-mock-adapter");
const mock = new AxiosMockAdapter(axios);
import gameNotFound from '../../src/components/utils/gameNotFound';
import Swal from 'sweetalert2';

import Scrabble from '../../src/components/games/Scrabble.jsx';
import SelectionPage from '../../src/components/SelectionPage/SelectionPage.jsx';

jest.mock('../../src/components/utils/gameNotFound', () => jest.fn());

jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({}),
  getInput: jest.fn('valid_key'),
  clickConfirm: jest.fn(),
}));

const defaultScrabble = {
  "_id":"67cb499b56e92611414fb9c1",
  "room_name":"",
  "players":[
    {
      "player_id":1,
      "name":"bubkis",
      "score":0,
      "_id":"67cb499b56e92611414fb9c2"
    }
  ],
  "__v":1
};
const updateScrabble = {
  "_id":"67cb499b56e92611414fb9c1",
  "room_name":"",
  "players":[
    {
      "player_id":1,
      "name":"Bramble",
      "score":0,
      "_id":"67cb499b56e92611414fb9c2"
    }
  ],
  "__v":1
};

const updateScrabbleScore = {
  "_id":"67cb499b56e92611414fb9c1",
  "room_name":"",
  "players":[
    {
      "player_id":1,
      "name":"bubkis",
      "score":5,
      "_id":"67cb499b56e92611414fb9c2"
    }
  ],
  "__v":1
};
const mockRes = [{gamesInProgress: ['blah','bleh','blub']}]

const mockResDel = [{gamesInProgress: ['blah','bleh']}]

describe('Selection page', ()=>{

  afterEach(() => {
    mock.reset();
    mock.resetHistory();
    jest.clearAllMocks();
  });

  it('should move between pages when links are clicked.', async ()=>{
    mock.onGet('/api/messages/67cb499b56e92611414fb9c1').reply(200, [{
      _id: 'TestID',
      message: 'Test Message',
      createdAt: Date.now()
    }]).onPost('/api/scrabble').reply(201, defaultScrabble)
    .onGet('/api/scrabble/67cb499b56e92611414fb9c1').reply(200, defaultScrabble)
    .onPost('/api/messages').reply(500)
    .onGet('/api/verifyLogin').reply(200, 'testuser@gmail.com')
    .onGet('api/profile/testuser@gmail.com').reply(200, mockRes)
    .onPut('/api/scrabble/67cb499b56e92611414fb9c1').reply(200, updateScrabbleScore);

    const Apple = renderWithRouter(<App />, {route: '/selection'});
    var Btn;
    await waitFor(()=>{
      Apple.user.click(screen.getByTestId("Selection-page-scrabble"));

    });
    // await Apple.user.click(screen.getByTestId("Selection-page-scrabble"));
    // Apple.user.click(Btn);
    var start_game;
    // await waitFor(()=> {
    //   start_game = Apple.getByTestId('start-scrabble');
    // });
    await waitFor(()=>{
      Apple.user.click(screen.getByTestId('start-scrabble'));
    })
    //Apple.debug();
    expect(screen.getByTestId('start-scrabble')).toBeInTheDocument();

  });

  it('should print the game keys.', async ()=>{
    mock.onGet('/api/messages/67cb499b56e92611414fb9c1').reply(200, [{
      _id: 'TestID',
      message: 'Test Message',
      createdAt: Date.now()
    }]).onPost('/api/scrabble').reply(201, defaultScrabble)
    .onGet('/api/scrabble/67cb499b56e92611414fb9c1').reply(200, defaultScrabble)
    .onPost('/api/messages').reply(500)
    .onGet('/api/verifyLogin').reply(200, 'testuser@gmail.com')
    .onGet('api/profile/testuser@gmail.com').reply(200, mockRes)
    .onPut('/api/scrabble/67cb499b56e92611414fb9c1').reply(200, updateScrabbleScore);

    const Apple = renderWithRouter(<App />, {route: '/selection'});
    await waitFor(()=>{
      screen.getByTestId("Selection-page-scrabble");

    });
    var blah;
    await waitFor(()=>{
       blah = screen.getAllByRole('button');
       //getAllByDisplayValue("blah")
    })
    Apple.debug();
    expect(blah[blah.length - 1].value).toEqual('blub');

  });


  it('should delete game keys.', async ()=>{
    mock.onGet('/api/messages/67cb499b56e92611414fb9c1').reply(200, [{
      _id: 'TestID',
      message: 'Test Message',
      createdAt: Date.now()
    }]).onPost('/api/scrabble').reply(201, defaultScrabble)
    .onGet('/api/scrabble/67cb499b56e92611414fb9c1').reply(200, defaultScrabble)
    .onPost('/api/messages').reply(500)
    .onGet('/api/verifyLogin').reply(200, 'testuser@gmail.com')
    .onGet('api/profile/testuser@gmail.com').reply(200, mockRes)
    .onDelete('api/profile/testuser@gmail.com/blub').reply(200, mockResDel)
    .onPut('/api/scrabble/67cb499b56e92611414fb9c1').reply(200, updateScrabbleScore);

    const Apple = renderWithRouter(<App />, {route: '/selection'});
    await waitFor(()=>{
      screen.getByTestId("Selection-page-scrabble");

    });
    var sessions;
    var lastSession;
    await waitFor(()=>{
       sessions = document.getElementsByClassName("game-session-delete-button");
       lastSession = screen.getByTestId("session-delete-button"+(sessions.length - 1));
       Apple.user.click(screen.getByTestId("session-delete-button"+(sessions.length - 1)));
    })
    mock.onGet('api/profile/testuser@gmail.com').reply(200, mockRes)
    const initLen = sessions.length;
     await waitFor(()=>{
       sessions = document.getElementsByClassName('game-session-delete-button');

    })

     //Apple.debug();
     expect(initLen).toEqual(sessions.length+1);

  });
});
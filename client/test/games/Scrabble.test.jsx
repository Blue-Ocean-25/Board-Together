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


jest.mock('../../src/components/utils/gameNotFound', () => jest.fn());

jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({}),
  getInput: jest.fn('valid_key'),
  clickConfirm: jest.fn(),
}));

const defaultScrabble2 = {
  "room_name":"",
  "players":[{
    "player_id":1,
    "name":"bramblino",
    "score":0,
    "_id":"67cbbd09404b3bda0ff9e846"},
    {"player_id":2,
    "name":"bramblino",
    "score":0,
    "_id":"67cbbd09404b3bda0ff9e847"}],
"_id":"67cbbd09404b3bda0ff9e845","__v":0
};



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
describe('Scrabble page', ()=>{

  afterEach(() => {
    mock.reset();
    mock.resetHistory();
    jest.clearAllMocks();
  });

  it('should render room with correct number of players.', async ()=>{
    // mock.onPost('/api/scrabble/').reply(200, defaultScrabble)
    // .onGet('/api/scrabble/67cb499b56e92611414fb9c1').reply(200, defaultScrabble)
    // .onPut('/api/scrabble/67cb499b56e92611414fb9c1').reply(200, updateScrabble);
    mock.onGet('/api/messages/67cb499b56e92611414fb9c1').reply(200, [{
      _id: 'TestID',
      message: 'Test Message',
      createdAt: Date.now()
    }]).onPost('/api/scrabble').reply(201, defaultScrabble2)
    .onGet('/api/scrabble/67cb499b56e92611414fb9c1')
    .reply(200, defaultScrabble2).onPost('/api/messages').reply(500)
    .onGet('/api/verifyLogin').reply(200, 'testuser@gmail.com')
    .onPut('/api/scrabble/67cb499b56e92611414fb9c1').reply(200, defaultScrabble2);


    const Apple = renderWithRouter(<App />, {route: '/scrabble'});

    const players = Apple.getByTestId('scrabble-player-number');

    // await Apple.user.click(name)
    waitFor(()=>{
      fireEvent.change(players, {target:{value:2}});
    });


    await Apple.user.click(screen.getByTestId('start-scrabble'));

    const names = await screen.findAllByText('bramblino');

    expect(names.length).toEqual(2*2);
  });

  it('should render and update usernames when entered.', async ()=>{
    // mock.onPost('/api/scrabble/').reply(200, defaultScrabble)
    // .onGet('/api/scrabble/67cb499b56e92611414fb9c1').reply(200, defaultScrabble)
    // .onPut('/api/scrabble/67cb499b56e92611414fb9c1').reply(200, updateScrabble);
    mock.onGet('/api/messages/67cb499b56e92611414fb9c1').reply(200, [{
      _id: 'TestID',
      message: 'Test Message',
      createdAt: Date.now()
    }]).onPost('/api/scrabble').reply(201, defaultScrabble)
    .onGet('/api/scrabble/67cb499b56e92611414fb9c1')
    .reply(200, defaultScrabble).onPost('/api/messages').reply(500)
    .onGet('/api/verifyLogin').reply(200, 'testuser@gmail.com')
    .onPut('/api/scrabble/67cb499b56e92611414fb9c1').reply(200, updateScrabble);


    const Apple = renderWithRouter(<App />, {route: '/scrabble'});
    await Apple.user.click(screen.getByTestId('start-scrabble'));
    //await start.click();

    await screen.findByText('Scrabble Scorecard');


    const name = Apple.getByTestId('scrabble-playerName0');
    const namer = Apple.getByTestId('scrabble-playerNamer0');


    // await Apple.user.click(name)
    waitFor(()=>{
      fireEvent.change(namer, {target:{value:'bramblo'}});
    });

    const saveBtn = Apple.getByTestId("scrabble-save");

    await Apple.user.click(saveBtn);

    expect(name).toHaveTextContent('bramblo')
  });
  it('should update scores when typed in and submitted.', async ()=>{
    mock.onGet('/api/messages/67cb499b56e92611414fb9c1').reply(200, [{
      _id: 'TestID',
      message: 'Test Message',
      createdAt: Date.now()
    }]).onPost('/api/scrabble').reply(201, defaultScrabble)
    .onGet('/api/scrabble/67cb499b56e92611414fb9c1')
    .reply(200, defaultScrabble).onPost('/api/messages').reply(500)
    .onGet('/api/verifyLogin').reply(200, 'testuser@gmail.com')
    .onPut('/api/scrabble/67cb499b56e92611414fb9c1').reply(200, updateScrabbleScore);


    const Apple = renderWithRouter(<App />, {route: '/scrabble'});
    await Apple.user.click(screen.getByTestId('start-scrabble'));
    //await start.click();

    await screen.findByText('Scrabble Scorecard');


    const score = Apple.getByTestId('scrabble-score0');
    const scorer = Apple.getByTestId('scrabble-scorer0');

    const name = Apple.getByTestId('scrabble-playerName0');
    const namer = Apple.getByTestId('scrabble-playerNamer0');

    // await Apple.user.click(name)
    waitFor(()=>{
      fireEvent.change(scorer, {target:{value:5}});
    });
    await Apple.user.click(namer);
    const saveBtn = Apple.getByTestId('scrabble-save');

    await Apple.user.click(saveBtn);

    expect(score).toHaveTextContent(5)

  });
  it('Should display join game modal when join game button clicked', async () => {
    const Apple = renderWithRouter(<App />, {route: '/scrabble'});
    const button = screen.getByTestId('join-scrabble');
    button.click();

    await waitFor(() => expect(Swal.fire).toHaveBeenCalled());
  });
})
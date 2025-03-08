import React from 'react';
import {screen, waitFor, act, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../../src/components/App.jsx';
import renderWithRouter from '../../utils/renderRouter.js';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import Swal from 'sweetalert2';
const mock = new AxiosMockAdapter(axios);
import mockMessage from './mockMessage.test.js';

jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({}),
}));

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
    mock.onPost('/api/messages/:gameId').reply(200, [{
      _id: 'TestID',
      message: 'Test Message',
      createdAt: Date.now()
    }]).onPost('/api/scrabble').reply(200, MockData);
    const app = renderWithRouter(<App />, {route: '/scrabble'});
    expect(screen.getByText(/Scrabble/i)).toBeInTheDocument();
    await app.user.click(app.getByTestId('start-scrabble'));
    expect(screen.getByText(/Submit Message/i)).toBeInTheDocument();
  });

  it ('Should be able to see previous messages', async () => {
    mock.onGet('/api/messages/67cb499b56e92611414fb9c1').reply(200, [{
      _id: '1',
      message: 'Test Message',
      createdAt: Date.now()
    }, {
      _id: '2',
      message: 'Another One',
      createdAt: Date.now()
    }]).onPost('/api/scrabble').reply(201, MockData).onGet('/api/scrabble/67cb499b56e92611414fb9c1').reply(200, MockData)
    const app = renderWithRouter(<App />, {route: '/scrabble'});
    expect(screen.getByText(/Scrabble/i)).toBeInTheDocument();
    await app.user.click(app.getByTestId('start-scrabble'));
    expect(screen.getByText(/Submit Message/i)).toBeInTheDocument();
    await waitFor(() => {
      screen.getByText(/Test Message/i);
      screen.getByText(/Another One/i);
    });
  });

  it ('Should be able to post a message and display it back', async () => {
    mock.onGet('/api/messages/67cb499b56e92611414fb9c1').reply(200, [{
      _id: 'TestID',
      message: 'Test Message',
      createdAt: Date.now()
    }]).onPost('/api/scrabble').reply(201, MockData).onGet('/api/scrabble/67cb499b56e92611414fb9c1').reply(200, MockData).onPost('/api/messages').reply(201).onGet('/api/verifyLogin').reply(200, 'testuser@gmail.com');
    const app = renderWithRouter(<App />, {route: '/scrabble'});
    expect(screen.getByText(/Scrabble/i)).toBeInTheDocument();
    await app.user.click(app.getByTestId('start-scrabble'));
    expect(screen.getByText(/Submit Message/i)).toBeInTheDocument();
    await waitFor(() => {
      screen.getByText(/Test Message/i);
    });
    const messageInput = app.getByTestId('message-input');
    await app.user.type(messageInput, 'Hello World!');
    await app.user.click(app.getByTestId('message-submit'));
    expect(mock.history[mock.history.length-1].data).toEqual('{"gameId":"67cb499b56e92611414fb9c1","email":"testuser@gmail.com","message":"Hello World!"}');
  });

  it ('Should show a sweetalert on post error', async () => {
    Swal.fire.mockResolvedValue({});
    mock.onGet('/api/messages/67cb499b56e92611414fb9c1').reply(200, [{
      _id: 'TestID',
      message: 'Test Message',
      createdAt: Date.now()
    }]).onPost('/api/scrabble').reply(201, MockData).onGet('/api/scrabble/67cb499b56e92611414fb9c1').reply(200, MockData).onPost('/api/messages').reply(500).onGet('/api/verifyLogin').reply(200, 'testuser@gmail.com');
    const app = renderWithRouter(<App />, {route: '/scrabble'});
    expect(screen.getByText(/Scrabble/i)).toBeInTheDocument();
    await app.user.click(app.getByTestId('start-scrabble'));
    expect(screen.getByText(/Submit Message/i)).toBeInTheDocument();
    await waitFor(() => {
      screen.getByText(/Test Message/i);
    });
    const messageInput = app.getByTestId('message-input');
    await app.user.type(messageInput, 'Hello World!');
    await app.user.click(app.getByTestId('message-submit'));
    expect(Swal.fire).toBeCalled();
  });

  it ('Should show a sweetalert on get error', async () => {
    Swal.fire.mockResolvedValue({});
    mock.onGet('/api/messages/67cb499b56e92611414fb9c1').reply(500).onPost('/api/scrabble').reply(201, MockData).onGet('/api/scrabble/67cb499b56e92611414fb9c1').reply(200, MockData)
    const app = renderWithRouter(<App />, {route: '/scrabble'});
    expect(screen.getByText(/Scrabble/i)).toBeInTheDocument();
    await app.user.click(app.getByTestId('start-scrabble'));
    expect(screen.getByText(/Submit Message/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(Swal.fire).toBeCalled();
    });
  });

  it ('Should scroll', async () => {
    mock.onGet('/api/messages/67cb499b56e92611414fb9c1').reply(200, mockMessage).onPost('/api/scrabble').reply(201, MockData).onGet('/api/scrabble/67cb499b56e92611414fb9c1').reply(200, MockData)
    const app = renderWithRouter(<App />, {route: '/scrabble'});
    expect(screen.getByText(/Scrabble/i)).toBeInTheDocument();
    await app.user.click(app.getByTestId('start-scrabble'));
    expect(screen.getByText(/Submit Message/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getAllByText(/TestUser: yes/i).length > 0).toBe(true);
    });
    const messages = app.getByTestId('messages')
    fireEvent.scroll(messages, { target: { scrollTop: messages.scrollHeight } });
  })
});
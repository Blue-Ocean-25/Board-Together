import React from 'react';
import {screen, waitFor, act} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../src/components/App.jsx';
import renderWithRouter from '../utils/renderRouter.js';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import Swal from 'sweetalert2';
const mock = new AxiosMockAdapter(axios);

jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({}),
}));

const user = [
  {
      "profilePic": {
          "data": null,
          "contentType": null
      },
      "_id": "67ca25a6c8989b3eb7627502",
      "username": "test",
      "email": "testuser@gmail.com",
      "phoneNumber": "",
      "gamesInProgress": [],
      "gamesPlayed": 0,
      "gameHistory": [],
      "friends": [],
      "__v": 0
  }
];

describe('NavBar', () => {

  afterEach(() => {
    mock.reset();
    mock.resetHistory();
    jest.clearAllMocks();
  });

  it ('Should render Home Page with the correct welcome message and ability to go to a selection page if logged in', async () => {
    mock.onGet('/api/verifyLogin').reply(200, 'testuser@gmail.com');
    const app = renderWithRouter(<App />);
    expect(screen.getByText(/Board Together/i)).toBeInTheDocument();
  });

  it ('Should throw a swal if you click on notification', async () => {
    mock.onGet('/api/verifyLogin').reply(200, 'testuser@gmail.com');
    const app = renderWithRouter(<App />);
    expect(screen.getByText(/Board Together/i)).toBeInTheDocument();
    await app.user.click(app.getByTestId('notification'));
    expect(Swal.fire).toBeCalled();
  });

  it ('Should be able to go home through the accordion Link', async () => {
    mock.onGet('/api/verifyLogin').reply(200, 'testuser@gmail.com');
    const app = renderWithRouter(<App />, {route: '/login'});
    expect(screen.getByText(/Login to Board Together/i)).toBeInTheDocument();
    await app.user.click(app.getByTestId('navbar-home'));
    expect(screen.getByText(/Welcome to Board Together!/i)).toBeInTheDocument();
    expect(app.getByTestId('selection').textContent).toBe('Go to Selection Page');
  });

  it ('Should be able to go to profile', async () => {
    mock.onGet('/api/verifyLogin').reply(200, 'testuser@gmail.com').onGet('/api/profile/testuser@gmail.com').reply(200, user).onGet('/api/gameHistory/testuser@gmail.com').reply(200, []);
    const app = renderWithRouter(<App />);
    expect(screen.getByText(/Board Together/i)).toBeInTheDocument();
    await app.user.click(app.getByTestId('navbar-profile'));
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Profile Details/i)).toBeInTheDocument();
    });
  });

  it ('Should be able to go to selection page', async () => {
    mock.onGet('/api/verifyLogin').reply(200, 'testuser@gmail.com').onGet('/api/profile/testuser@gmail.com').reply(200, [{gamesInProgress: []}])
    const app = renderWithRouter(<App />);
    expect(screen.getByText(/Board Together/i)).toBeInTheDocument();
    await app.user.click(app.getByTestId('navbar-selection'));
    await waitFor(() => {
      expect(screen.getByText(/Choose a game:/i)).toBeInTheDocument();
    });
  });

  it ('Should be able to logout', async () => {
    mock.onGet('/api/verifyLogin').reply(200, 'testuser@gmail.com').onGet('/api/profile/testuser@gmail.com').reply(200, [{gamesInProgress: []}]).onGet('/api/logOut').reply(204);
    const app = renderWithRouter(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Welcome to Board Together!/i)).toBeInTheDocument();
    });
    await app.user.click(app.getByTestId('logout'));
    expect(mock.history[mock.history.length - 1].url).toBe('/api/logOut')
  });
});
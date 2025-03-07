import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '../../src/components/Profile/Profile.jsx';
import renderWithRouter from '../utils/renderRouter.js';
import useVerifyLogin from '../../src/components/utils/useVerifyLogin.jsx';
import swal from 'sweetalert2';

const axios = require("axios");
const AxiosMockAdapter = require("axios-mock-adapter");
const mock = new AxiosMockAdapter(axios);

jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));

describe('Profile Page', () => {

  afterEach(() => {
    mock.reset();
  });

  it ('Should load you into profile page', async () => {

    mock.onGet('/api/verifyLogin').reply(200,
      'testuser@gmail.com'
    );

    const app = renderWithRouter(<Profile />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    mock.onGet('/api/profile/testuser@gmail.com').reply(200, [{
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
    }]);

    mock.onGet('/api/gameHistory/testuser@gmail.com').reply(200, []);

    await waitFor(() => {
      expect(screen.getByText(/Profile Details/i)).toBeInTheDocument();
    });

  });

  it ('Should render profile details', async () => {

    mock.onGet('/api/verifyLogin').reply(200,
      'testuser@gmail.com'
    );

    mock.onGet('/api/profile/testuser@gmail.com').reply(200, [{
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
    }]);

    mock.onGet('/api/gameHistory/testuser@gmail.com').reply(200, []);

    const app = renderWithRouter(<Profile />);

    await waitFor(() => {
      expect(screen.getByText(/Welcome, test!/i)).toBeInTheDocument();
      expect(screen.getByText(/Email: testuser@gmail.com/i)).toBeInTheDocument();
      expect(screen.getByText(/Games Played: 0/i)).toBeInTheDocument();
      expect(screen.getByText(/Game History:/i)).toBeInTheDocument();
      expect(screen.getByText(/Friends List/i)).toBeInTheDocument();

    });

  });

  it ('Should allow upload of a profile picture', async () => {

    mock.onGet('/api/verifyLogin').reply(200,
      'testuser@gmail.com'
    );

    mock.onGet('/api/profile/testuser@gmail.com').reply(200, [{
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
    }]);

    mock.onGet('/api/gameHistory/testuser@gmail.com').reply(200, []);

    const app = renderWithRouter(<Profile />);


    await waitFor(() => {
      app.user.click(app.getByTestId('edit-profile'));
      expect(screen.getByText(/Choose file/i)).toBeInTheDocument();
    });

  });

});
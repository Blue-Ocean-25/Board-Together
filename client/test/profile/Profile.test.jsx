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

const user = [{
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
}];

describe('Profile Page', () => {

  afterEach(() => {
    mock.reset();
  });

  it ('Should render loading whie waiting for profile to load', async () => {

    mock.onGet('/api/verifyLogin').reply(200,
      'testuser@gmail.com'
    );

    const app = renderWithRouter(<Profile />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it ('Should load you into profile page after getting profile info', async () => {

    mock.onGet('/api/verifyLogin').reply(200,
      'testuser@gmail.com'
    );

    const app = renderWithRouter(<Profile />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    mock.onGet('/api/profile/testuser@gmail.com').reply(200, user);

    mock.onGet('/api/gameHistory/testuser@gmail.com').reply(200, []);

    await waitFor(() => {
      expect(screen.getByText(/Profile Details/i)).toBeInTheDocument();
    });

  });

  it ('Should render profile details', async () => {

    mock.onGet('/api/verifyLogin').reply(200,
      'testuser@gmail.com'
    );

    mock.onGet('/api/profile/testuser@gmail.com').reply(200, user);

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

    mock.onGet('/api/profile/testuser@gmail.com').reply(200, user);

    mock.onGet('/api/gameHistory/testuser@gmail.com').reply(200, []);

    const app = renderWithRouter(<Profile />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(app.getByTestId('edit-profile')).toBeInTheDocument();
    });

    await app.user.click(app.getByTestId('edit-profile'));

    await waitFor(() => {
      expect(screen.getByText(/Save Changes/i)).toBeInTheDocument();
    });
  });

  it('Should display a default profile picture if nothing is uploaded', async () => {

    mock.onGet('/api/verifyLogin').reply(200,
      'testuser@gmail.com'
    );

    mock.onGet('/api/profile/testuser@gmail.com').reply(200, user);

    mock.onGet('/api/gameHistory/testuser@gmail.com').reply(200, []);

    const app = renderWithRouter(<Profile />);

    await waitFor(() => {
      const imgElement = screen.getByRole('img');
      expect(imgElement).toHaveAttribute('src', 'https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png');
      expect(app.getByTestId('profile-pic-not-uploaded')).toBeInTheDocument();
    });

  })

});


describe('Game History', () => {

  afterEach(() => {
    mock.reset();
  });

  it ('should display "No games played" when games history is empty', async () => {

    mock.onGet('/api/verifyLogin').reply(200,
      'testuser@gmail.com'
    );

    mock.onGet('/api/profile/testuser@gmail.com').reply(200, user);

    mock.onGet('/api/gameHistory/testuser@gmail.com').reply(200, []);

    const app = renderWithRouter(<Profile />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(app.getByTestId('edit-profile')).toBeInTheDocument();
    });

    await app.user.click(app.getByTestId('edit-profile'));

    await waitFor(() => {
      expect(screen.getByText(/Save Changes/i)).toBeInTheDocument();
    });
  });

  it('Should display a default profile picture if nothing is uploaded', async () => {

    mock.onGet('/api/verifyLogin').reply(200,
      'testuser@gmail.com'
    );

    mock.onGet('/api/profile/testuser@gmail.com').reply(200, user);

    mock.onGet('/api/gameHistory/testuser@gmail.com').reply(200, []);

    const app = renderWithRouter(<Profile />);

    await waitFor(() => {
      const imgElement = screen.getByRole('img');
      expect(imgElement).toHaveAttribute('src', 'https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png');
      expect(app.getByTestId('profile-pic-not-uploaded')).toBeInTheDocument();
    });

  })

});


describe('Game History', () => {

  afterEach(() => {
    mock.reset();
  });

  it ('should display "No games played" when games history is empty', async () => {

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

    const profile = renderWithRouter(<Profile />);

    await waitFor(() => {
      expect(screen.getByText(/No games played/i)).toBeInTheDocument();
    });

  });

  it ('should display game history when it is not empty', async () => {

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

    mock.onGet('/api/gameHistory/testuser@gmail.com').reply(200, [
      {
          "_id": "67cb7038ad6ed1453aaddca1",
          "winner": "Username",
          "players": [
              "Username",
              "2",
              "3"
          ],
          "game": "Clue",
          "gameKey": "67cb7024ad6ed1453aaddc1a",
          "email": "test5@gmail.com",
          "createdAt": "2025-03-07T22:16:24.483Z",
          "updatedAt": "2025-03-07T22:16:24.483Z",
          "__v": 0
      },
      {
          "_id": "67cb7099ad6ed1453aaddcd1",
          "winner": "Player",
          "players": [
              "Player",
              "Player"
          ],
          "game": "Scrabble",
          "gameKey": "67cb7093ad6ed1453aaddcb7",
          "email": "test5@gmail.com",
          "createdAt": "2025-03-07T22:18:01.160Z",
          "updatedAt": "2025-03-07T22:18:01.160Z",
          "__v": 0
      }
  ]);

    const profile = renderWithRouter(<Profile />);

    await waitFor(() => {
      expect(screen.getByText(/Games Played:\s+2/i)).toBeInTheDocument();
      expect(screen.getByText(/Game:\s+Clue/i)).toBeInTheDocument();
      expect(screen.getByText(/Game Key:\s+67cb7024ad6ed1453aaddc1a/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Date:\s+03\/07\/2025/i)).toHaveLength(2);
      expect(screen.getByText(/Players:\s+Username, 2, 3/i)).toBeInTheDocument();
      expect(screen.getByText(/Winner:\s+Username/i)).toBeInTheDocument();
    });

  });

});
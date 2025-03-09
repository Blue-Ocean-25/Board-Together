import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Profile from '../../src/components/Profile/Profile.jsx';
import App from '../../src/components/App.jsx';
import renderWithRouter from '../utils/renderRouter.js';
import useVerifyLogin from '../../src/components/utils/useVerifyLogin.jsx';
import swal from 'sweetalert2';
import transformBuffer from '../../src/components/utils/TransformBuffer.jsx';

const axios = require("axios");
const AxiosMockAdapter = require("axios-mock-adapter");
const mock = new AxiosMockAdapter(axios);

jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
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

const userWithPic = [{
  "profilePic": {
      "data": {
        "type": "Buffer",
        "data":
        [1, 2, 3]},
      "contentType": 'image/jpg'
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

    const app = renderWithRouter(<App />, {route: '/profile'});

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it ('Should load you into profile page after getting profile info', async () => {

    mock.onGet('/api/verifyLogin').reply(200,
      'testuser@gmail.com'
    );

    mock.onGet('/api/profile/testuser@gmail.com').reply(200, user);

    mock.onGet('/api/gameHistory/testuser@gmail.com').reply(200, []);

    const app = renderWithRouter(<App />, {route: '/profile'});

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

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

    const app = renderWithRouter(<App />, {route: '/profile'});

    await waitFor(() => {
      expect(screen.getByText(/Welcome, test!/i)).toBeInTheDocument();
      expect(screen.getByText(/Email: testuser@gmail.com/i)).toBeInTheDocument();
      expect(screen.getByText(/Games Played: 0/i)).toBeInTheDocument();
      expect(screen.getByText(/Game History:/i)).toBeInTheDocument();
      expect(screen.getByText(/Friends List/i)).toBeInTheDocument();

    });

  });

  it ('Should allow upload of a profile picture', async () => {

    const file = new File(["dummy content"], "test.jpg", { type: "image/jpg" });

    mock.onGet('/api/verifyLogin').reply(200,
      'testuser@gmail.com'
    );

    mock.onGet('/api/profile/testuser@gmail.com').reply(200, user);

    mock.onGet('/api/gameHistory/testuser@gmail.com').reply(200, []);

    mock.onPut('/api/profile/67ca25a6c8989b3eb7627502/profilePicture').reply(204);

    const app = renderWithRouter(<App />, {route: '/profile'});

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(app.getByTestId('edit-profile')).toBeInTheDocument();
    });

    await app.user.click(app.getByTestId('edit-profile'));

    const inputElement = screen.getByLabelText(/Upload File/i);

    await waitFor(() => {
      expect(screen.getByText(/Save Changes/i)).toBeInTheDocument();
    });

    await userEvent.upload(inputElement, file);
    expect(inputElement.files[0]).toStrictEqual(file);
    expect(inputElement.files.length).toBe(1);
  });

  it('Should display a default profile picture if nothing is uploaded', async () => {

    mock.onGet('/api/verifyLogin').reply(200,
      'testuser@gmail.com'
    );

    mock.onGet('/api/profile/testuser@gmail.com').reply(200, user);

    mock.onGet('/api/gameHistory/testuser@gmail.com').reply(200, []);

    const app = renderWithRouter(<App />, {route: '/profile'});

    await waitFor(() => {
      const imgElement = screen.getByTestId('profile-pic-uploaded');
      expect(imgElement).toHaveAttribute('src', 'https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png');
    });

  })

  it('Should transform a buffer into a url', async () => {

    expect(transformBuffer()).toContain('blob:');

  });

  it('Should display a profile picture if something is loaded', async () => {

    mock.onGet('/api/verifyLogin').reply(200,
      'testuser@gmail.com'
    );

    mock.onGet('/api/profile/testuser@gmail.com').reply(200, userWithPic);

    mock.onGet('/api/gameHistory/testuser@gmail.com').reply(200, []);

    const app = renderWithRouter(<App />, {route: '/profile'});

    await waitFor(() => {
      expect(app.getByTestId('profile-pic-uploaded')).toBeInTheDocument();
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

    const app = renderWithRouter(<App />, {route: '/profile'});

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

    const app = renderWithRouter(<App />, {route: '/profile'});

    await waitFor(() => {
      const imgElement = screen.getByTestId('profile-pic-uploaded');
      expect(imgElement).toHaveAttribute('src', 'https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png');
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

    const profile = renderWithRouter(<App />, {route: '/profile'});

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

    const profile = renderWithRouter(<App />, {route: '/profile'});

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
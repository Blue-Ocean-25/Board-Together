import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import renderWithRouter from '../../test/utils/renderRouter';
import '@testing-library/jest-dom';
import Yahtzee from '../../src/components/games/Yahtzee.jsx';
const axios = require("axios");
const AxiosMockAdapter = require("axios-mock-adapter");
const mock = new AxiosMockAdapter(axios);
import gameNotFound from '../../src/components/utils/gameNotFound';
import Swal from 'sweetalert2';

jest.mock('../../src/components/utils/gameNotFound', () => jest.fn());

jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({}),
  getInput: jest.fn('valid_key'),
  clickConfirm: jest.fn(),
}));


const mockGameData = {
  "room_name": "testtesttest",
        "players": [
            {
                "player_id": 1,
                "player_name": "Player",
                "aces": 0,
                "twos": 0,
                "threes": 0,
                "fours": 0,
                "fives": 0,
                "sixes": 0,
                "three_of_a_kind": 0,
                "four_of_a_kind": 0,
                "full_house": 0,
                "small_straight": 0,
                "large_straight": 0,
                "yahtzee": 0,
                "chance": 0,
                "yahtzee_bonus": 0,
                "_id": "67cb302b9333ea29d83414a4"
            },
            {
                "player_id": 2,
                "player_name": "Player",
                "aces": 0,
                "twos": 0,
                "threes": 0,
                "fours": 0,
                "fives": 0,
                "sixes": 0,
                "three_of_a_kind": 0,
                "four_of_a_kind": 0,
                "full_house": 0,
                "small_straight": 0,
                "large_straight": 0,
                "yahtzee": 0,
                "chance": 0,
                "yahtzee_bonus": 0,
                "_id": "67cb302b9333ea29d83414a5"
            },
            {
                "player_id": 3,
                "player_name": "Player",
                "aces": 0,
                "twos": 0,
                "threes": 0,
                "fours": 0,
                "fives": 0,
                "sixes": 0,
                "three_of_a_kind": 0,
                "four_of_a_kind": 0,
                "full_house": 0,
                "small_straight": 0,
                "large_straight": 0,
                "yahtzee": 0,
                "chance": 0,
                "yahtzee_bonus": 0,
                "_id": "67cb302b9333ea29d83414a6"
            }
        ],
        "_id": "67cb302b9333ea29d83414a3",
        "__v": 0
};

const mockUpdateGameData = {
  "room_name": "testtesttest",
        "players": [
            {
                "player_id": 1,
                "player_name": "newPlayerName",
                "aces": 0,
                "twos": 0,
                "threes": 0,
                "fours": 0,
                "fives": 0,
                "sixes": 0,
                "three_of_a_kind": 0,
                "four_of_a_kind": 0,
                "full_house": 0,
                "small_straight": 0,
                "large_straight": 0,
                "yahtzee": 0,
                "chance": 0,
                "yahtzee_bonus": 0,
                "_id": "67cb302b9333ea29d83414a4"
            },
            {
                "player_id": 2,
                "player_name": "Player",
                "aces": 0,
                "twos": 0,
                "threes": 0,
                "fours": 0,
                "fives": 0,
                "sixes": 0,
                "three_of_a_kind": 0,
                "four_of_a_kind": 0,
                "full_house": 0,
                "small_straight": 0,
                "large_straight": 0,
                "yahtzee": 0,
                "chance": 0,
                "yahtzee_bonus": 0,
                "_id": "67cb302b9333ea29d83414a5"
            },
            {
                "player_id": 3,
                "player_name": "Player",
                "aces": 0,
                "twos": 0,
                "threes": 0,
                "fours": 0,
                "fives": 0,
                "sixes": 0,
                "three_of_a_kind": 0,
                "four_of_a_kind": 0,
                "full_house": 0,
                "small_straight": 0,
                "large_straight": 0,
                "yahtzee": 0,
                "chance": 0,
                "yahtzee_bonus": 0,
                "_id": "67cb302b9333ea29d83414a6"
            }
        ],
        "_id": "67cb302b9333ea29d83414a3",
        "__v": 0
};

describe('Yahtzee', () => {

  afterEach(() => {
    mock.reset();
  });

  it('should render Yahtzee component', async () => {
    renderWithRouter(<Yahtzee />);
    expect(screen.getByText('Yahtzee')).toBeInTheDocument();
  });

  it('should render game session with new game info when new game started', async () => {
    mock.onPost('/api/yahtzee').reply(201, mockGameData);
    renderWithRouter(<Yahtzee />);
    const button = screen.getByTestId('start-game');
    button.click();
    expect(await screen.findByText('Room Name: testtesttest')).toBeInTheDocument();
  });

  it('Should display join game modal when join game button clicked', async () => {
    renderWithRouter(<Yahtzee/>);
    const button = screen.getByTestId('join-game');
    button.click();

    await waitFor(() => expect(Swal.fire).toHaveBeenCalled());
  });

  it('should conditionally render the save changes button', async () => {
    mock.onPost('/api/yahtzee').reply(201, mockGameData);
    renderWithRouter(<Yahtzee />);
    const button = screen.getByTestId('start-game');
    button.click();
    await screen.findByText('Room Name: testtesttest');

    const input = await screen.getAllByTestId('testinput');
    fireEvent.change(input[0], {target: {value: 'test'}});
    expect(screen.getByText('Save Changes')).toBeInTheDocument();
  })

  it('should render updated game info when save changes button is clicked', async () => {
    mock.onPost('/api/yahtzee').reply(201, mockGameData);
    mock.onPut('/api/yahtzee/67cb302b9333ea29d83414a3').reply(200, mockUpdateGameData);
    mock.onGet('/api/yahtzee/67cb302b9333ea29d83414a3').reply(200, mockUpdateGameData);
    renderWithRouter(<Yahtzee />);
    const button = screen.getByTestId('start-game');
    button.click();
    await screen.findByText('Room Name: testtesttest');

    const input = await screen.getAllByTestId('testinput');
    fireEvent.change(input[0], {target: {value: 'newPlayerName'}});
    const saveButton = screen.getByText('Save Changes');
    saveButton.click();
    axios.get('/api/yahtzee/67cb302b9333ea29d83414a3');
    await screen.findByText('Room Name: testtesttest');
    const names = await screen.findAllByText('newPlayerName');
    expect(names.length).toBeGreaterThan(0);
  });

  it('should join a game when a valid game key is entered', async () => {
    mock.onGet('api/yahtzee/valid_key').reply(200, mockGameData);
    Swal.fire.mockResolvedValue({value: 'valid_key'});
    renderWithRouter(<Yahtzee />);
    const button = screen.getByTestId('join-game');
    fireEvent.click(button);
    await waitFor(() => expect(Swal.fire).toHaveBeenCalled());
    await waitFor(() => {
      Swal.clickConfirm();
    });
    await waitFor(() => expect(screen.getByText('Room Name: testtesttest')).toBeInTheDocument());
  });
});

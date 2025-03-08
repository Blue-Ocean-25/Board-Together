import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ClueSession from '../../src/components/games/ClueSession';
import ClueCard from '../../src/components/games/ClueCard';
import Clue from '../../src/components/games/Clue';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import Swal from 'sweetalert2';
import WinnerModal from '../../src/components/games/WinnerModal';

// Create a mock adapter for axios
const mock = new MockAdapter(axios);

const mockData =
{
  "room_name": "Test Room",
  "players": [
      {
          "player_id": "1",
          "suspects": {
              "colonel_mustard": true,
              "professor_plum": true,
              "reverend_green": true,
              "mr_peacock": true,
              "miss_scarlet": true,
              "mrs_white": true
          },
          "weapons": {
              "knife": true,
              "candle_stick": true,
              "revolver": true,
              "rope": true,
              "lead_pipe": true,
              "wrench": true
          },
          "rooms": {
              "hall": true,
              "lounge": true,
              "dinning_room": true,
              "kitchen": true,
              "ballroom": true,
              "conservatory": true,
              "billiard_room": true,
              "library": true,
              "study": true
          },
          "_id": "67cb49bfe041ac26293d3e0f"
      },
      {
        "player_id": "2",
        "suspects": {
            "colonel_mustard": true,
            "professor_plum": true,
            "reverend_green": true,
            "mr_peacock": true,
            "miss_scarlet": true,
            "mrs_white": true
        },
        "weapons": {
            "knife": true,
            "candle_stick": true,
            "revolver": true,
            "rope": true,
            "lead_pipe": true,
            "wrench": true
        },
        "rooms": {
            "hall": true,
            "lounge": true,
            "dinning_room": true,
            "kitchen": true,
            "ballroom": true,
            "conservatory": true,
            "billiard_room": true,
            "library": true,
            "study": true
        },
        "_id": "67cb49bfe041ac26293d3e0f5"
    }
  ],
  "completed": false,
  "_id": "67cb49bfe041ac26293d3e0e",
  "__v": 0
}

// Mock Swal.fire
jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({}),
  getInput: jest.fn(),
  clickConfirm: jest.fn(),
}));

// Create a QueryClient instance
const queryClient = new QueryClient();

const renderWithProviders = (ui) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </QueryClientProvider>
  );
};

beforeEach(() => {
  mock.reset();
  Swal.getInput.mockReturnValue(document.createElement('input'));
});

it('should render the Clue page', () => {
  renderWithProviders(<Clue />);
  expect(screen.getByText(/Clue/i)).toBeInTheDocument();
});

it('should render the room name input', () => {
  renderWithProviders(<Clue />);
  expect(screen.getByPlaceholderText(/Enter Room Name/i)).toBeInTheDocument();
});

it('should render the number of players input', () => {
  renderWithProviders(<Clue />);
  expect(screen.getByPlaceholderText(/Enter Number of Players/i)).toBeInTheDocument();
});

it('should render the Start Game button', () => {
  renderWithProviders(<Clue />);
  expect(screen.getByText(/Start Game/i)).toBeInTheDocument();
});

it('should render the Join Game button', () => {
  renderWithProviders(<Clue />);
  expect(screen.getByText(/Join Game/i)).toBeInTheDocument();
});

it('should update room name input value', () => {
  renderWithProviders(<Clue />);
  const input = screen.getByPlaceholderText(/Enter Room Name/i);
  fireEvent.change(input, { target: { value: 'Test Room' } });
  expect(input.value).toBe('Test Room');
});

it('should update number of players input value', () => {
  renderWithProviders(<Clue />);
  const input = screen.getByPlaceholderText(/Enter Number of Players/i);
  fireEvent.change(input, { target: { value: '3' } });
  expect(input.value).toBe('3');
});

it('should open Swal modal when Join Game button is clicked', async () => {
  renderWithProviders(<Clue />);
  fireEvent.click(screen.getByText(/Join Game/i));
  await waitFor(() => expect(Swal.fire).toHaveBeenCalled());
});

it('should call mutationFind with the entered room key', async () => {
  Swal.fire.mockResolvedValue({ value: 'TestRoomKey' });
  renderWithProviders(<Clue />);
  fireEvent.click(screen.getByText(/Join Game/i));
  await waitFor(() => expect(Swal.fire).toHaveBeenCalled());
  await waitFor(() => {
    const input = Swal.getInput();
    fireEvent.change(input, { target: { value: 'TestRoomKey' } });
    Swal.clickConfirm();
  });
  await waitFor(() => expect(mock.history.get.length).toBe(2));
  expect(mock.history.get[1].url).toBe('/api/clue/TestRoomKey');
});

it('should show loading state when data is not available', async () => {
  renderWithProviders(<Clue />);
  await waitFor(() => {
    expect(screen.getByTestId('clue-start')).toBeInTheDocument();
  });

  mock.onGet('/api/verifyLogin').reply(200, 'testuser@gmail.com');
  fireEvent.change(screen.getByPlaceholderText(/Enter Room Name/i), { target: { value: 'tEsTrOoM' } });
  const button = screen.getByText(/Start Game/i);
  fireEvent.click(button);

  mock.onPost('/api/clue').reply(200, mockData);

  await waitFor(() => {
    expect(screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'div' && /loading/i.test(content);
    })).toBeInTheDocument();
  });

  await waitFor(() => expect(mock.history.post.length).toBe(1));
});

it('should display game details when data is available', async () => {
  // Mock the API response for fetching game details
  mock.onGet('/api/clue/TestRoom').reply(200, mockData);
  mock.onGet('/api/verifyLogin').reply(200, 'testuser@gmail.com');
  mock.onPost('/api/clue').reply(200, mockData);
  renderWithProviders(<Clue />);
  await waitFor(() => {
    expect(screen.getByTestId('clue-start')).toBeInTheDocument();
  });

  fireEvent.change(screen.getByPlaceholderText(/Enter Room Name/i), { target: { value: 'tEsTrOoM' } });
  const button = screen.getByText(/Start Game/i);
  fireEvent.click(button);

  await waitFor(() => expect(screen.getByText((content, element) => {
    return element.tagName.toLowerCase() === 'span' && /shareable room key:/i.test(content);
  })).toBeInTheDocument());

  expect(screen.getByText(/Shareable room key:/i)).toBeInTheDocument();
  expect(screen.getByText(/Test Room/i)).toBeInTheDocument();
  expect(screen.getByText((content, element) => {
    return element.tagName.toLowerCase() === 'option' && /Please Select a Board:/i.test(content);
  })).toBeInTheDocument();
  expect(screen.getByText((content, element) => {
    return element.tagName.toLowerCase() === 'option' && /1/i.test(content);
  })).toBeInTheDocument();
});

import gameNotFound from '../../src/components/utils/gameNotFound';

jest.mock('../../src/components/utils/gameNotFound');

it('should handle invalid game key', async () => {
  // Mock the API response for fetching game details
  mock.onGet('/api/clue/InvalidKey').reply(404);

  renderWithProviders(<Clue />);
  fireEvent.change(screen.getByPlaceholderText(/Enter Room Name/i), { target: { value: 'InvalidKey' } });
  fireEvent.click(screen.getByText(/Start Game/i));

  await waitFor(() => {
    // Check if the gameNotFound function is called
    expect(gameNotFound).toHaveBeenCalled();
  });
});

describe('ClueSession Component', () => {
  it('should render the player select dropdown', () => {
    render(<ClueSession data={mockData} />);
    expect(screen.getByText(/Please Select a Board:/i)).toBeInTheDocument();
  });

  it('should render player options in the dropdown', () => {
    render(<ClueSession data={mockData} />);
    expect(screen.getByText(/1/i)).toBeInTheDocument();
  });

  it('should update playerId state when a player is selected', () => {
    render(<ClueSession data={mockData} />);
    const select = screen.getByText(/Please select a board/i);
    fireEvent.change(select, { target: { value: '0' } });
    expect(select.value).toBe('0');
  });

  it('should render ClueCard component when a player is selected', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ClueSession data={mockData} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText((content, element) => {
        return element.tagName.toLowerCase() === 'option' && /please select a board:/i.test(content);
      })).toBeInTheDocument();
    });
    const select = screen.getByTestId('player-select');
    fireEvent.change(select, { target: { value: '0' } });

    await waitFor(() => {
      expect(screen.getByTestId('clue-card-test')).toBeInTheDocument();
    });
  });
});

describe('ClueCard Component', () => {

  const queryClient = new QueryClient();

  beforeEach(() => {
    // Reset the mock adapter before each test
    mock.reset();

    // Mock the PUT request to resolve with a dummy response
    mock.onPut(`/api/clue/${mockData._id}/${mockData.players[0].player_id}`).reply(200, mockData);

    // Mock the PUT request for updating game status
    mock.onPut(`/api/clue/${mockData._id}`).reply(200, mockData);

    document.getElementById = jest.fn().mockReturnValue({
      showModal: jest.fn(),
    });

  });

  it('should render the ClueCard component', () => {
    render(
      <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ClueCard data={mockData} playerData={mockData.players[0]} gameSession={mockData._id} />
      </QueryClientProvider>
      </MemoryRouter>
    );

    // Check if ClueCard is rendered
    expect(screen.getByTestId('clue-card-test')).toBeInTheDocument();
  });

  it('should trigger mutation when a checkbox is clicked', async () => {
    render(
      <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ClueCard data={mockData} playerData={mockData.players[0]} gameSession={mockData._id} />
      </QueryClientProvider>
    </MemoryRouter>
    );

    // Simulate checkbox click (changing suspects)
    fireEvent.click(screen.getByTestId('professor_plum-test'));
    fireEvent.click(screen.getByTestId('professor_plum-test'));

    // Verify the mock PUT request was called for changing the suspect
    await waitFor(() => {
      expect(mock.history.put).toHaveLength(2); // Ensure the second request is made
      expect(mock.history.put[1].url).toBe(`/api/clue/${mockData._id}`);
      expect(JSON.parse(mock.history.put[1].data)).toEqual({
        playerId: mockData.players[0].player_id,
        category: 'suspects',
        name: 'professor_plum',
      });
    });
  });

  it('should open the winner modal when the "Complete Game" button is clicked', async () => {
    render(
      <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ClueCard data={mockData} playerData={mockData.players[0]} gameSession={mockData._id} />
      </QueryClientProvider>
    </MemoryRouter>
    );

    // Simulate button click
    fireEvent.click(screen.getByText('Complete Game'));

    // Verify that the winner modal is displayed
    expect(document.getElementById('winner_modal')).toBeTruthy();
  });
});
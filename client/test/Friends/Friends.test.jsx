import React from 'react';
import { screen, waitFor, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddFriendDropdown from '../../src/components/friends/AddFriendDropdown';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

jest.mock('sweetalert2');

describe('AddFriendDropdown', () => {
  const mockSetFriends = jest.fn();
  const mockFriends = ['friend1', 'friend2'];
  const mockEmail = 'test@testemail.com';
  let mock;

  beforeEach(() => {
    mock = new AxiosMockAdapter(axios);
    mock.onGet(`/api/profile/${mockEmail}`).reply(200, [{ friends: mockFriends }]);
    mock.onPost(`/api/profile/addFriend`).reply(200);
  });


  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });


  it('renders input field', () => {
    render(<AddFriendDropdown
      email={mockEmail}
      friends={mockFriends}
      setFriends={mockSetFriends}
    />);
    
    expect(screen.getByPlaceholderText('Add Friend By Username')).toBeInTheDocument();
  });

  it('fetches friends on mount', async () => {
    render(<AddFriendDropdown
      email={mockEmail}
      friends={mockFriends}
      setFriends={mockSetFriends}
    />);

    await waitFor(() => expect(mock.history.get.length).toBe(1));
    await waitFor(() => expect(mockSetFriends).toHaveBeenCalled());
    expect(mock.history.get[0].url).toBe(`/api/profile/${mockEmail}`);
    expect(mockSetFriends).toHaveBeenCalledWith(mockFriends);
  });


  it('shows dropdown with search results', async () => {
    render(<AddFriendDropdown
      email={mockEmail}
      friends={mockFriends}
      setFriends={mockSetFriends}
    />);

    const mockSearchResults = [{ username: 'user1' }, { username: 'user2' }];
    mock.onGet(`/api/profile/username/user`).reply(200, mockSearchResults);
    screen.getByPlaceholderText('Add Friend By Username').value = 'user';
    await waitFor(() => expect(mock.history.get.length).toBe(2));
    consolelog('HISTORY', mock.history.get);
    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
  });
});
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Swal from 'sweetalert2';
import AddFriendDropdown from './AddFriendDropdown';

jest.mock('sweetalert2');

describe('AddFriendDropdown', () => {
  const mockSetFriends = jest.fn();
  const mockFriends = ['friend1', 'friend2'];
  const mockEmail = 'test@example.com';
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    mock.onGet(`/api/profile/${mockEmail}`).reply(200, { friends: mockFriends });
    mock.onPost(`/api/profile/addFriend`).reply(200);
  });

  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  test('renders input field', () => {
    render(<AddFriendDropdown email={mockEmail} friends={mockFriends} setFriends={mockSetFriends} />);
    expect(screen.getByPlaceholderText('Add Friend By Username')).toBeInTheDocument();
  });

  test('fetches friends on mount', async () => {
    render(<AddFriendDropdown email={mockEmail} friends={mockFriends} setFriends={mockSetFriends} />);
    await waitFor(() => expect(mock.history.get.length).toBe(1));
    expect(mock.history.get[0].url).toBe(`/api/profile/${mockEmail}`);
    expect(mockSetFriends).toHaveBeenCalledWith(mockFriends);
  });

  test('shows dropdown with search results', async () => {
    const mockSearchResults = [{ username: 'user1' }, { username: 'user2' }];
    mock.onGet(`/api/profile/username/user`).reply(200, mockSearchResults);

    render(<AddFriendDropdown email={mockEmail} friends={mockFriends} setFriends={mockSetFriends} />);
    fireEvent.change(screen.getByPlaceholderText('Add Friend By Username'), { target: { value: 'user' } });

    await waitFor(() => expect(mock.history.get.length).toBe(2));
    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
  });

  test('adds friend and shows success message', async () => {
    const newFriend = 'newFriend';
    mock.onGet(`/api/profile/username/${newFriend}`).reply(200, [{ username: newFriend }]);

    render(<AddFriendDropdown email={mockEmail} friends={mockFriends} setFriends={mockSetFriends} />);
    fireEvent.change(screen.getByPlaceholderText('Add Friend By Username'), { target: { value: newFriend } });

    await waitFor(() => expect(screen.getByText(newFriend)).toBeInTheDocument());
    fireEvent.click(screen.getByText(newFriend));

    await waitFor(() => expect(mock.history.post.length).toBe(1));
    expect(mock.history.post[0].url).toBe(`/api/profile/addFriend`);
    expect(mock.history.post[0].data).toBe(JSON.stringify({ addUsername: newFriend, email: mockEmail }));
    expect(mockSetFriends).toHaveBeenCalledWith([...mockFriends, newFriend]);
    expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({ icon: 'success', title: `${newFriend} has been added to your friends list!` }));
  });

  test('shows error message if friend already exists', async () => {
    const existingFriend = mockFriends[0];
    mock.onGet(`/api/profile/username/${existingFriend}`).reply(200, [{ username: existingFriend }]);

    render(<AddFriendDropdown email={mockEmail} friends={mockFriends} setFriends={mockSetFriends} />);
    fireEvent.change(screen.getByPlaceholderText('Add Friend By Username'), { target: { value: existingFriend } });

    await waitFor(() => expect(screen.getByText(existingFriend)).toBeInTheDocument());
    fireEvent.click(screen.getByText(existingFriend));

    expect(mock.history.post.length).toBe(0);
    expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({ icon: 'error', title: `${existingFriend} is already in your friends list` }));
  });
});
import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../src/components/App.jsx';
import renderWithRouter from '../utils/renderRouter.js';
import Swal from 'sweetalert2';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const mock = new AxiosMockAdapter(axios);

jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({}),
}));

describe('Authorization Pages', () => {

  afterEach(() => {
    mock.reset();
    mock.resetHistory();
    jest.clearAllMocks();
  });

  it ('Should render signup page', async () => {
    const app = renderWithRouter(<App />, {route: '/signup'});
    expect(screen.getByText(/Signup To Board Together/i)).toBeInTheDocument();
  });

  it ('Should successfully post to the server in Signup page if the passwords match', async () => {
    Swal.fire.mockResolvedValue({});
    mock.onPost('/api/signup').reply(201);
    const app = renderWithRouter(<App />, {route: '/signup'});
    expect(screen.getByText(/Signup To Board Together/i)).toBeInTheDocument();
    const emailInput = app.getByTestId('email');
    const usernameInput = app.getByTestId('username');
    const passwordInput = app.getByTestId('password');
    const confirmPasswordInput = app.getByTestId('confirmPassword');
    await app.user.type(emailInput, 'test@gmail.com');
    await app.user.type(usernameInput, 'testuser');
    await app.user.type(passwordInput, 'password');
    await app.user.type(confirmPasswordInput, 'password');
    await app.user.click(app.getByTestId('signup-button'));
    expect(mock.history[mock.history.length - 1].data).toBe(JSON.stringify({
      username: 'testuser',
      email: 'test@gmail.com',
      password: 'password',
      phoneNumber: ''
    }));
    expect(Swal.fire).toBeCalled();
  });

  it ('Should throw a swal in Signup if an error is thrown from the server during post', async () => {
    Swal.fire.mockResolvedValue({});
    mock.onPost('/api/signup').reply(500);
    const app = renderWithRouter(<App />, {route: '/signup'});
    expect(screen.getByText(/Signup To Board Together/i)).toBeInTheDocument();
    const emailInput = app.getByTestId('email');
    const usernameInput = app.getByTestId('username');
    const passwordInput = app.getByTestId('password');
    const confirmPasswordInput = app.getByTestId('confirmPassword');
    await app.user.type(emailInput, 'test@gmail.com');
    await app.user.type(usernameInput, 'testuser');
    await app.user.type(passwordInput, 'password');
    await app.user.type(confirmPasswordInput, 'password');
    await app.user.click(app.getByTestId('signup-button'));
    expect(mock.history[mock.history.length - 1].data).toBe(JSON.stringify({
      username: 'testuser',
      email: 'test@gmail.com',
      password: 'password',
      phoneNumber: ''
    }));
    expect(Swal.fire).toBeCalled();
  });

  it ('Should not post to the server in signup if passwords do not match', async () => {
    Swal.fire.mockResolvedValue({});
    mock.onPost('/api/signup').reply(201);
    const app = renderWithRouter(<App />, {route: '/signup'});
    expect(screen.getByText(/Signup To Board Together/i)).toBeInTheDocument();
    const emailInput = app.getByTestId('email');
    const usernameInput = app.getByTestId('username');
    const passwordInput = app.getByTestId('password');
    const confirmPasswordInput = app.getByTestId('confirmPassword');
    await app.user.type(emailInput, 'test@gmail.com');
    await app.user.type(usernameInput, 'testuser');
    await app.user.type(passwordInput, 'password');
    await app.user.type(confirmPasswordInput, 'wrong password');
    await app.user.click(app.getByTestId('signup-button'));
    expect(Swal.fire).toBeCalled();
    await waitFor(() => {
      mock.history.forEach((call) => {
        expect(call.url).not.toBe('/api/signup');
      })
    });
  });

  it ('Should send you to the login page after your sign up', async () => {
    Swal.fire.mockResolvedValue({});
    mock.onPost('/api/signup').reply(201);
    const app = renderWithRouter(<App />, {route: '/signup'});
    expect(screen.getByText(/Signup To Board Together/i)).toBeInTheDocument();
    const emailInput = app.getByTestId('email');
    const usernameInput = app.getByTestId('username');
    const passwordInput = app.getByTestId('password');
    const confirmPasswordInput = app.getByTestId('confirmPassword');
    await app.user.type(emailInput, 'test@gmail.com');
    await app.user.type(usernameInput, 'testuser');
    await app.user.type(passwordInput, 'password');
    await app.user.type(confirmPasswordInput, 'password');
    await app.user.click(app.getByTestId('signup-button'));
    expect(mock.history[mock.history.length - 1].data).toBe(JSON.stringify({
      username: 'testuser',
      email: 'test@gmail.com',
      password: 'password',
      phoneNumber: ''
    }));
    expect(Swal.fire).toBeCalled();
    waitFor(() => {
      expect(screen.getByText(/Login To Board Together/i)).toBeInTheDocument();
    });
  });

  it ('Should send you to Login if you click Go to Login and vice versa', async () => {
    const app = renderWithRouter(<App />, {route: '/signup'});
    expect(screen.getByText(/Signup To Board Together/i)).toBeInTheDocument();
    await app.user.click(app.getByTestId('go-login'));
    expect(screen.getByText(/Login To Board Together/i)).toBeInTheDocument();
    await app.user.click(app.getByTestId('go-signup'));
    expect(screen.getByText(/Signup To Board Together/i)).toBeInTheDocument();
  });

  it ('Should successfully post to the server in Login page if the passwords match', async () => {
    Swal.fire.mockResolvedValue({});
    mock.onPost('/api/login').reply(201);
    const app = renderWithRouter(<App />, {route: '/login'});
    expect(screen.getByText(/Login To Board Together/i)).toBeInTheDocument();
    const emailInput = app.getByTestId('email');
    const passwordInput = app.getByTestId('password');
    await app.user.type(emailInput, 'test@gmail.com');
    await app.user.type(passwordInput, 'password');
    await app.user.click(app.getByTestId('login-button'));
    const history = mock.history.filter((call) => call.url === '/api/login');
    expect(history[0].data).toBe(JSON.stringify({
      email: 'test@gmail.com',
      password: 'password',
    }));
    expect(Swal.fire).toBeCalled();
  });

  it ('Should throw a swal in Login if an error is thrown from the server during post', async () => {
    Swal.fire.mockResolvedValue({});
    mock.onPost('/api/login').reply(500);
    const app = renderWithRouter(<App />, {route: '/login'});
    expect(screen.getByText(/Login To Board Together/i)).toBeInTheDocument();
    const emailInput = app.getByTestId('email');
    const passwordInput = app.getByTestId('password');
    await app.user.type(emailInput, 'test@gmail.com');
    await app.user.type(passwordInput, 'password');
    await app.user.click(app.getByTestId('login-button'));
    const history = mock.history.filter((call) => call.url === '/api/login');
    expect(history[0].data).toBe(JSON.stringify({
      email: 'test@gmail.com',
      password: 'password',
    }));
    expect(Swal.fire).toBeCalled();
  });
});
import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../src/components/App.jsx';
import renderWithRouter from '../utils/renderRouter.js';
const axios = require("axios");
const AxiosMockAdapter = require("axios-mock-adapter");
const mock = new AxiosMockAdapter(axios);

describe('Home Page', () => {

  afterEach(() => {
    mock.reset();
  });

  it ('Should render Home Page with the correct welcome message and ability to go to a selection page if logged in', async () => {
    mock.onGet('/api/verifyLogin').reply(200, {
      email: 'testuser@gmail.com'
    });
    const app = renderWithRouter(<App />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Welcome to Board Together!/i)).toBeInTheDocument();
      expect(app.getByTestId('selection').textContent).toBe('Go to Selection Page');
    });
  });

  it ('Should show Login/Signup when user is not logged in', async () => {
    mock.onGet('/api/verifyLogin').reply(401);
    const app = renderWithRouter(<App />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Welcome to Board Together!/i)).toBeInTheDocument();
      expect(app.getByTestId('login').textContent).toBe('Login');
      expect(app.getByTestId('signup').textContent).toBe('Sign Up');
    });
  });

  it ('Should send you to Selection page on click', async () => {
    mock.onGet('/api/verifyLogin').reply(200, {
      email: 'testuser@gmail.com'
    })
    const app = renderWithRouter(<App />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Welcome to Board Together!/i)).toBeInTheDocument();
      expect(app.getByTestId('selection')).toBeInTheDocument();
    });
    await app.user.click(app.getByTestId('selection'));
    expect(screen.getByText(/Choose a game:/i)).toBeInTheDocument();
  });

  it ('Should send you to Login page on click', async () => {
    mock.onGet('/api/verifyLogin').reply(401);
    const app = renderWithRouter(<App />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Welcome to Board Together!/i)).toBeInTheDocument();
      expect(app.getByTestId('login').textContent).toBe('Login');
    });
    await app.user.click(app.getByTestId('login'));
    expect(screen.getByText(/Login To Board Together/i)).toBeInTheDocument();
  });

  it ('Should send you to Signup page on click', async () => {
    mock.onGet('/api/verifyLogin').reply(401);
    const app = renderWithRouter(<App />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Welcome to Board Together!/i)).toBeInTheDocument();
      expect(app.getByTestId('signup').textContent).toBe('Sign Up');
    });
    await app.user.click(app.getByTestId('signup'));
    expect(screen.getByText(/Signup To Board Together/i)).toBeInTheDocument();
  });
});
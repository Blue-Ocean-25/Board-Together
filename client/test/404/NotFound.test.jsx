import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../src/components/App.jsx';
import renderWithRouter from '../utils/renderRouter.js';
const axios = require("axios");
const AxiosMockAdapter = require("axios-mock-adapter");
const mock = new AxiosMockAdapter(axios);

describe('404 Page', () => {

  afterEach(() => {
    mock.reset();
    mock.resetHistory();
  });

  it ('Should render 404 page', async () => {
    mock.onGet('/api/verifyLogin').reply(200, 'testuser@gmail.com');
    const app = renderWithRouter(<App />, {route: '/404'});
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });

  it ('Should go back to home page on button click', async () => {
    mock.onGet('/api/verifyLogin').reply(200, 'testuser@gmail.com');
    const app = renderWithRouter(<App />, {route: '/404'});
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    await app.user.click(app.getByTestId('go-home'));
    expect(screen.getByText(/Welcome to Board Together!/i)).toBeInTheDocument();
    expect(app.getByTestId('selection').textContent).toBe('Go to Selection Page');
  })
})
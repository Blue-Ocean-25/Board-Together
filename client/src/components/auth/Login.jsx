import React from 'react';
import axios from 'axios';
const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const request = {username, email, password};
    axios.post('/api/login', request)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
  }
  return (
    <div>
      <h1>Login To Board Together</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" id="username" name="username" required />
        </label>
        <label>
          Email:
          <input type="email" id="email" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" id="password" name="password" required />
        </label>
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
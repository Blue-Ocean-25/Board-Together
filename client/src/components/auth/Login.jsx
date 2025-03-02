import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const request = {email, password};
    axios.post('/api/login', request)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-300">
      <div className="w-full max-w-md p-8 space-y-6 rounded shadow-inner shadow-base-200 bg-base-200">
        <h1 className="text-2xl font-bold text-center">Login To Board Together</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email Address:</span>
          </label>
          <input type="email" id="email" name="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
            <label className="label">
              <span className="label-text">Password:</span>
            </label>
            <input type="password" id="password" name="password" className="input input-bordered" required />
          </div>
          <button className="btn btn-accent w-full" type="submit">Login</button>
          <button className="btn btn-neutral w-full" type="button"><Link to='/signup'>Go To Signup</Link></button>
        </form>
      </div>
    </div>
  );
};

export default Login;
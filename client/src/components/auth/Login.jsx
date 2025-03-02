import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const request = {email, password};
    axios.post('/api/login', request)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have successfully logged in.',
        }).then(() => {
          navigate('/');
        });
      })
      .catch(error => {
        Swal.fire({
                  icon: 'error',
                  title: 'Login Failed',
                  text: 'There was an error login in. Please try again later.',
                });
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
          <Link className="btn btn-neutral w-full" to='/signup'>Go To Signup</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
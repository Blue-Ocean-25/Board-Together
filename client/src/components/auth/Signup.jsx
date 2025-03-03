import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const phoneNumber = formData.get('phoneNumber')
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Passwords do not match!',
      });
      return;
    }
    const request = {username, email, password, phoneNumber};
    axios.post('/api/signup', request)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Account Created',
          text: 'Your account has been successfully created!',
        }).then(() => {
          navigate('/login');
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: 'There was an error signing up. Please try again later.',
        });
      });
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-300">
      <div className="w-full max-w-md p-8 space-y-6 rounded shadow-inner shadow-base-200 bg-base-200">
        <h1 className="text-2xl font-bold text-center">Signup To Board Together</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email Address:</span>
            </label>
            <input type="email" id="email" name="email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username:</span>
            </label>
            <input type="text" id="username" name="username" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">{'Phone Number (optional):'}</span>
            </label>
            <input type="tel" id="phoneNumber" name="phoneNumber" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password:</span>
            </label>
            <input type="password" id="password" name="password" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password:</span>
            </label>
            <input type="password" id="confirmPassword" name="confirmPassword" className="input input-bordered" required />
          </div>
          <button className="btn btn-accent w-full" type="submit">Signup</button>

          <Link className="btn btn-neutral w-full" to='/login'>Go To Login</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
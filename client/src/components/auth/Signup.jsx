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
        buttonsStyling: false,
        icon: 'warning',
        background: "#ffdba6",
        customClass: {
          popup: 'bg-base-200 text-base-content rounded-lg shadow-xl',
          icon: 'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-base-100 mt-5',
          title: 'text-lg font-bold text-center mt-3',
          htmlContainer: 'text-sm text-gray-500 mt-2 text-center',
          confirmButton: 'btn btn-accent',
        },
        title: 'Oops...',
        text: 'Passwords do not match!',
      });
      return;
    }
    const request = {username, email, password, phoneNumber};
    axios.post('/api/signup', request)
      .then(response => {
        Swal.fire({
          buttonsStyling: false,
          icon: 'success',
          background: "#ffdba6",
          customClass: {
            popup: 'bg-base-200 text-base-content rounded-lg shadow-xl',
            icon: 'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-base-100 mt-5',
            title: 'text-lg font-bold text-center mt-3',
            htmlContainer: 'text-sm text-gray-500 mt-2 text-center',
            confirmButton: 'btn btn-accent',
          },
          title: 'Account Created',
          text: 'Your account has been successfully created!',
        }).then(() => {
          navigate('/login');
        });
      })
      .catch(error => {
        Swal.fire({
          buttonsStyling: false,
          icon: 'error',
          background: "#ffdba6",
          customClass: {
            popup: 'bg-base-200 text-base-content rounded-lg shadow-xl',
            icon: 'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-base-100 mt-5',
            title: 'text-lg font-bold text-center mt-3',
            htmlContainer: 'text-sm text-gray-500 mt-2 text-center',
            confirmButton: 'btn btn-accent',
          },
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
            <input data-testid="email" type="email" id="email" name="email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username:</span>
            </label>
            <input data-testid="username" type="text" id="username" name="username" className="input input-bordered" required />
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
            <input data-testid="password" type="password" id="password" name="password" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password:</span>
            </label>
            <input data-testid="confirmPassword" type="password" id="confirmPassword" name="confirmPassword" className="input input-bordered" required />
          </div>
          <button data-testid="signup-button" className="btn btn-accent w-full" type="submit">Signup</button>

          <Link data-testid="go-login" className="btn btn-neutral w-full" to='/login'>Go To Login</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
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
    <div
    className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
    style={{ backgroundImage: "url('https://media.licdn.com/dms/image/v2/C4E12AQE-IwX7taZwqg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1628813539387?e=1746662400&v=beta&t=Wo4rhA13J0GmepdQqX4Gs_kOHnJE2NakDJUX1xyCZ9o')"}}
  >
      <div className="w-full max-w-md p-8 space-y-6 rounded shadow-inner shadow-base-200 glass">
        <h1 className="text-2xl font-bold text-center">Signup To Board Together</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Email Address:</span>
            </label>
            <input data-testid="email" autocomplete="email" type="email" id="email" name="email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Username:</span>
            </label>
            <input data-testid="username" autocomplete="username" type="text" id="username" name="username" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">{'Phone Number (optional):'}</span>
            </label>
            <input type="tel" autocomplete="tel" id="phoneNumber" name="phoneNumber" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Password:</span>
            </label>
            <input data-testid="password" autocomplete="new-password" type="password" id="password" name="password" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Confirm Password:</span>
            </label>
            <input data-testid="confirmPassword" autocomplete="new-password" type="password" id="confirmPassword" name="confirmPassword" className="input input-bordered" required />
          </div>
          <button data-testid="signup-button" className="btn btn-accent w-full" type="submit">Signup</button>

          <Link data-testid="go-login" className="btn btn-neutral w-full" to='/login'>Go To Login</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
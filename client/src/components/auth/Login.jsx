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
          title: 'Login Successful',
          text: 'You have successfully logged in.',
        }).then(() => {
          navigate('/');
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
          title: 'Login Failed',
          text: 'There was an error login in. Please try again later.',
        });
      });
  }
  return (
    <div
    className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
    style={{ backgroundImage: "url('https://media.licdn.com/dms/image/v2/C4E12AQE-IwX7taZwqg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1628813539387?e=1746662400&v=beta&t=Wo4rhA13J0GmepdQqX4Gs_kOHnJE2NakDJUX1xyCZ9o')"}}
  >
      <div className="w-full max-w-md p-8 space-y-6 rounded shadow-inner shadow-base-200 glass">
        <h1 className="text-2xl font-bold text-center">Login To Board Together</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Email Address:</span>
          </label>
          <input type="email" id="email" name="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Password:</span>
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
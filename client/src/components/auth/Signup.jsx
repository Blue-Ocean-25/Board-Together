import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Signup = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const phoneNumber = formData.get('phoneNumber')
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const request = {username, email, password, phoneNumber};
    axios.post('/api/signup', request)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
  }
  return (
    // <div className="flex items-center justify-center min-h-screen bg-primary">
    //   <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md bg-secondary">
    //     <h1 className="text-2xl font-bold text-center">Signup To Board Together</h1>
    //     <form onSubmit={handleSubmit} className="space-y-4">
    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Username:</span>
    //         </label>
    //         <input type="text" id="username" name="username" className="input input-bordered" required />
    //       </div>
    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Email Address:</span>
    //         </label>
    //         <input type="email" id="email" name="email" className="input input-bordered" required />
    //       </div>
    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">{'Phone Number (optional):'}</span>
    //         </label>
    //         <input type="tel" id="phoneNumber" name="phoneNumber" className="input input-bordered" />
    //       </div>
    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Password:</span>
    //         </label>
    //         <input type="password" id="password" name="password" className="input input-bordered" required />
    //       </div>
    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Confirm Password:</span>
    //         </label>
    //         <input type="password" id="confirmPassword" name="confirmPassword" className="input input-bordered" required />
    //       </div>
    //       <button className="btn btn-primary w-full" type="submit">Signup</button>
    //       <button className="btn btn-secondary w-full" type="button"><Link to='/login'>Go To Login</Link></button>
    //     </form>
    //   </div>
    // </div>
    <div></div>
  );
};

export default Signup;
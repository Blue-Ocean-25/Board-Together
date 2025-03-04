import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useVerifyLogin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('/api/verifyLogin')
      .then((res) => {
        setLoggedIn(true);
      })
      .catch(err => {
        setLoggedIn(false);
        navigate('/login');
      })
  })
  return loggedIn;
};

export default useVerifyLogin;
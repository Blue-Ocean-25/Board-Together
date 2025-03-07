import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const useVerifyLogin = (restricted) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [email, setEmail] = useState('');


  const navigate = useNavigate();
  useEffect(() => {
    axios.get('/api/verifyLogin')
      .then((res) => {
        setEmail(res.data);
        setLoggedIn(true);
      })
      .catch(err => {
        setLoggedIn(false);
        if (restricted) {
          navigate('/login');
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
            text: 'You need to login before accessing this page!',
          });
        }
      })
  }, [])
  return { loggedIn, email };
};

export default useVerifyLogin;
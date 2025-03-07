import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddFriendDropdown = ({ email, friends, setFriends }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchFriendQuery, setSearchFriendQuery] = useState('');

  console.log('search', searchResults)


  useEffect(() => {
    axios.get(`/api/profile/${email}`)
      .then(res => {
        setFriends(res.data[0].friends);
      })
      .catch(err => console.error(''));
  }, [email]);


  const handleAddFriend = async (addUsername) => {
    try {
      if (friends.includes(addUsername)) {
        Swal.fire({
          customClass: {
            title: 'text-lg font-bold text-center mt-3',
            confirmButtonColor: '#FDF0D5'
          },
          icon: "error",
          title: `${addUsername} is already in your friends list`,
          confirmButtonText: 'OK'
        });
      }

      if (!friends.includes(addUsername)) {
        await axios.post(`/api/profile/addFriend`, { addUsername, email });
        setFriends((prev) => [...prev, addUsername]);
        Swal.fire({
          customClass: {
            title: 'text-lg font-bold text-center mt-3',
            confirmButtonColor: '#FDF0D5'
          },
          icon: 'success',
          title: `${addUsername} has been added to your friends list!`,
          confirmButtonText: 'OK'
        });
      }

      setShowDropdown(false);
      setSearchFriendQuery('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = async (e) => {
    const username = e.target.value;
    setShowDropdown(!!username);
    setSearchFriendQuery(username);
    axios.get(`/api/profile/username/${username}`)
      .then(res => {
        const filtered = res.data.filter(user => user.email !== email);
        setSearchResults(filtered);
      })
      .catch(err => console.error(err));
  };


  return (
    <div className="relative">
      <input
        type="text"
        id="friendUsername"
        name="friendUsername"
        className="input input-bordered w-full max-w-xs bg-white text-black mr-10"
        placeholder='Add Friend By Username'
        value={searchFriendQuery}
        onChange={handleChange}
      />
      {showDropdown && searchResults?.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ul className='max-h-60 overflow-y-auto'>
            {searchResults.map((result, index) => (
              <li
                key={index}
                onClick={() => handleAddFriend(result.username)}
                className='cursor-pointer p-2 hover:bg-base-200'
              >
                {result.username}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
};

export default AddFriendDropdown;
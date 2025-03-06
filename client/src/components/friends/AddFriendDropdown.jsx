import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddFriendDropdown = ({ email }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchFriendQuery, setSearchFriendQuery] = useState('');
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios.get(`/api/profile/${email}`)
      .then(res => {
        setFriends(res.data[0].friends);
      })
      .catch(err => console.error(''));
  }, [email]);

  // const handleSearch = (event) => {
  //   if (event.key === 'Enter') {
  //     const friendUsername = event.target.value;
  //     if (!friends.includes(friendUsername) && friends) {
  //       handleAddFriend(friendUsername);
  //       setFriends([...friends, friendUsername]);
  //       window.alert('Friend added');
  //     } else {
  //       window.
  //     }
  //   }
  // };

  const handleAddFriend = async (addUsername) => {
    try {
      if (friends.includes(addUsername)) {
        alert('Friend already added');
        return;
      }
      if (!friends.includes(addUsername)) {
        await axios.post(`/api/profile/addFriend`, { addUsername, email });
        setFriends([...friends, addUsername]);
        alert('Friend added');
        setShowDropdown(false);
        setSearchFriendQuery('');
      }
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
    <div>
      <input
        type="text"
        id="friendUsername"
        name="friendUsername"
        className="input input-bordered w-full max-w-xs bg-white text-black"
        placeholder='Add Friend By Username'
        value={searchFriendQuery}
        onChange={handleChange}
      />
      {showDropdown && searchResults?.length > 0 && (
        <div>
          <ul className='dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow'>
            {searchResults.map((result, index) => (
              <li
                key={index}
                onClick={() => handleAddFriend(result.username)}
                className='text-black'
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



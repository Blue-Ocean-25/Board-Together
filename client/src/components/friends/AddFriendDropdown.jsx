import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddFriendDropdown = ({ email }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchFriendQuery, setSearchFriendQuery] = useState('');
  const [friends, setFriends] = useState([]);


  const handleSearch = (event) => {
    // event.preventDefault();
    if (event.key === 'Enter') {
      axios.get(`/api/profile/${email}`)
        .then(res => {
          setFriends(res.data[0].friends);
        })

      const friendUsername = event.target.value;
      if (!friends.includes(friendUsername)) {
        handleAddFriend(friendUsername);
        setFriends(...friends, friendUsername);
        window.alert('Friend added');
      } else {
        window.alert('Friend already added');
      }
    }

    // axios.get(``)
  };

  const handleAddFriend = async (addUsername) => {
    try {
      await axios.post(`/api/profile/${email}/addFriend`, addUsername);
    } catch (err) {
      console.error(err);
    }
  };


  const handleChange = (e) => {
    setShowDropdown(!showDropdown);
    const value = e.target.value;
    setSearchFriendQuery(value);
    axios.get('/profile/:username', searchFriendQuery)
      .then(res => {
        console.log(res.data);
      })
  };


  const handleSelect = () => {

  };

  console.log('FRIENDS', friends)

  return (
    <div>
      <input
        type="text"
        id="friendUsername"
        name="friendUsername"
        className="input input-bordered w-full max-w-xs bg-white"
        placeholder='Add Friend By Username'
        onChange={handleChange}
        onKeyDown={handleSearch}
      />
      {showDropdown && (
        <div>
          <ul>
            {searchResults.length && (searchResults.map((result) => {
              <li key={result._id} onClick={handleSelect}>
                <p>{result.username}</p>
                <button onClick={handleAddFriend} value={result._id}>Add Friend</button>
              </li>
            }))}
          </ul>
        </div>
      )}
    </div>
  )
};


export default AddFriendDropdown;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddFriendDropdown = ({ email }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchFriendQuery, setSearchFriendQuery] = useState('');
  const [friends, setFriends] = useState([]);


  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      axios.get(`/api/profile/${email}`)
        .then(res => {
          setFriends(res.data[0].friends);
        })

      const friendUsername = event.target.value;
      if (!friends.includes(friendUsername)) {
        setFriends(...friends, friendUsername);
        window.alert('Friend added');
      } else {
        window.alert('Friend already added');
      }
    }
  };

  // console.log('FRIENDS', friends)


  const handleChange = (e) => {
    setShowDropdown(!showDropdown);
    const value = e.target.value;
    setSearchFriendQuery(value);
  };



  const handleSelect = () => {

  };



  // const demoUser = {
  //   id: '01234',
  //   username: 'test',
  //   email: 'test@gmail.com',
  //   gamesPlayed: 2,
  //   gameHistory: ['abc', '123'],
  //   friends: ['12345', '67890'],
  // }

  const handleAddFriend = async (addUsername) => {
    try {
      await axios.post(`/api/profile/${email}/addFriend`, addUsername);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div>
      <input
        type="text"
        id="friendUsername"
        name="friendUsername"
        className="input input-bordered w-full max-w-xs bg-white"
        placeholder='Add Friend By Username'
        onKeyDown={handleSearch}
      />
      {searchResults.length ? (searchResults.map((result) => {
        <div key={result._id}>
          <p>{result.username}</p>
          <button onClick={handleAddFriend} value={result._id}>Add Friend</button>
        </div>
      })) : null}
    </div>
  )
};


export default AddFriendDropdown;



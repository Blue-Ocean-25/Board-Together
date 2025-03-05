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

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      const friendUsername = event.target.value;

      if (!friends.includes(friendUsername) && friends) {
        handleAddFriend(friendUsername);
        setFriends([...friends, friendUsername]);
        window.alert('Friend added');
      } else {
        window.alert('Friend already added');
      }
    }
  };

  const handleAddFriend = async (addUsername) => {
    try {
      await axios.post(`/api/profile/addFriend`, { addUsername, email });
    } catch (err) {
      console.error(err);
    }
  };

  // async
  const handleChange = async (e) => {
    setShowDropdown(!showDropdown);
    const value = e.target.value;
    console.log('VALUE', value)
    setSearchFriendQuery(value);
    try {
      const res = await axios.get(`/api/profile/${value}`);
      console.log('RES', res.data);
      // setSearchResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  // const handleSelect = () => {
  //   handleAddFriend()
  // };

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
            {searchResults.length > 0 && (searchResults.map((result) => {
              <li key={result._id} onClick={() => handleAddFriend(result.username)}>
                <p>{result.username}</p>
                <button onClick={() => handleAddFriend(result.username)}>Add Friend</button>
              </li>
            }))}
          </ul>
        </div>
      )}
    </div>
  )
};


export default AddFriendDropdown;



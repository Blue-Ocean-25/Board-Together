import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddFriendModal = ({ friends }) => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      const friendUsername = event.target.friendUsername.value;
      console.log(friendUsername, '+++')
      axios.get(`/api/profile/${friendUsername}`)
        .then((results) => {
          if (!friends.includes(results.data.id)) {
            setSearchResults(results.data);
          }
        })
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

export default AddFriendModal;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddFriendModal = ({friends}) => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    const friendSearch = event.target.friendSearch.value;
    axios.get(`/api/profile/${friendSearch}`)
    .then((results) => {
      if (!friends.includes(results.data.id)) {
        setSearchResults(results.data);
      }
    })
  };

  const handleAddFriend = async (event) => {
    try{
      await axios.post('/api/profile/:userId/addFriend', { friendId: event.target.value })
    } catch(err){
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label>Search for a user:</label>
        <input type="text" id="friendSearch" name="friendSearch" />
        <button type="submit">Search</button>
      </form>
      {searchResults.length ? (searchResults.map((result) => {
        <div key={result._id}>
          <p>{result.username}</p>
          <button onClick = {handleAddFriend} value = {result._id}>Add Friend</button>
        </div>
      })) : null}
    </div>
  )
}

export default AddFriendModal;



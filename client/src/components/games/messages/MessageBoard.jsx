import React, { useEffect, useState }  from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useVerifyLogin from '../../utils/useVerifyLogin.jsx'


const MessageBoard = ({ gameId }) => {
  console.log('message board');
  const { loggedIn, email } = useVerifyLogin(false);
  const [messages, setMessages] = useState([]);
  const getMessages = () => {
    console.log('something')
    axios.get('/api/messages/' + gameId)
    .then((messages) => {
      setMessages(messages.data);
    })
  }

  const postMessage = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const message = formdata.get('message');
    axios.post('/api/messages', {gameId, email, message})
      .then(() => getMessages())//keep this HERE, very important
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    getMessages();
  }, [])
  return (
    <div className="flex flex-col mt-5 bg-base-200 border border-primary p-4 fixed bottom-0 left-0 right-0 max-h-4/10">
      {console.log(messages)}
      <div className="flex-grow overflow-y-scroll">
        {messages.map(message => (
          <div className="border bg-base-300" key={message.id}>
            <p className="chat-bubble">{message.message}</p>
          </div>
        ))}
      </div>
      <div className="divider"/>
      <form className="flex-shrink-0" onSubmit={postMessage}>
        <input className="text neutral border btn-accent input w-4/5" name="message"
        type="text" required></input>
        <button className="btn btn-accent" type="submit">Submit Message</button>
      </form>
    </div>
  );
}

export default MessageBoard;
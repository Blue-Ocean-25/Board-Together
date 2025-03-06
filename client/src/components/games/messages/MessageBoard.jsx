import React, { useEffect, useState, useRef }  from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useVerifyLogin from '../../utils/useVerifyLogin.jsx'


const MessageBoard = ({ gameId }) => {
  // const {messages} = useQuery({
  //   queryKey: ['messages']
  // })
  const { loggedIn, email } = useVerifyLogin(false);
  const messagesEndRef = useRef(null);
  const getMessages = () => {
    return axios.get('/api/messages/' + gameId)
    .then((messages) => {
      return messages.data;
    })
  }

  const postMessage = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const message = formdata.get('message');
    axios.post('/api/messages', {gameId, email, message});
  }

  const {data, isLoading, error} = useQuery({
    queryKey: ['messages'],
    queryFn: getMessages,
    refetchInterval: 1000,
  })

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [data])

  return (
    <div className="flex flex-col mt-5 bg-base-200 border border-primary p-4 bottom-0 left-0 right-0 max-h-100">
      {console.log(data)}
      <div id="messages" ref={messagesEndRef} className="max-h-1/2 overflow-y-auto ">
        {data ? data.map(message => (
          <div className="border bg-base-300" key={message.id}>
            <p className="chat-bubble">{message.message}</p>
          </div>
        )) : <div>Loading...</div>}
        <div id="anchor" ref={messagesEndRef} className="h-px"></div>
      </div>
      <div className="divider"/>
      <form className="" onSubmit={postMessage}>
        <input className="text neutral border btn-accent input w-4/5" name="message"
        type="text" required></input>
        <button className="btn btn-accent" type="submit">Submit Message</button>
      </form>
    </div>
  );
}

export default MessageBoard;
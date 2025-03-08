import React, { useEffect, useState, useRef }  from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useVerifyLogin from '../../utils/useVerifyLogin.jsx';
import Swal from 'sweetalert2';

const MessageBoard = ({ gameId }) => {
  const [anchored, setAnchored] = useState(true);
  const { loggedIn, email } = useVerifyLogin(false);
  const messagesEndRef = useRef(null);
  const getMessages = () => {
    return axios.get('/api/messages/' + gameId)
    .then((messages) => {
      return messages.data;
    })
    .catch((err) => {
      Swal.fire({
        buttonsStyling: false,
        icon: 'error',
        background: "#ffdba6",
        customClass: {
        popup: 'bg-base-200 text-base-content rounded-lg shadow-xl',
        icon: 'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-base-100 mt-5',
        title: 'text-lg font-bold text-center mt-3',
        htmlContainer: 'text-sm text-gray-500 mt-2 text-center',
        confirmButton: 'btn btn-accent',
        },
        title: 'Server Error',
        text: 'Sorry messages could not be loaded.',
      });
      return [];
    })
  }

  const anchor = () =>{
    setAnchored(false);
    if (messagesEndRef.current) {
      if ((messagesEndRef.current.scrollTop)>=0){
        setAnchored(true);
      }
    }
  }

  const postMessage = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const message = formdata.get('message');
    axios.post('/api/messages', {gameId, email, message})
      .then(() => {
        document.getElementById("message-form").reset();
      })
      .catch((err) => {
        Swal.fire({
          buttonsStyling: false,
          icon: 'error',
          background: "#ffdba6",
          customClass: {
          popup: 'bg-base-200 text-base-content rounded-lg shadow-xl',
          icon: 'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-base-100 mt-5',
          title: 'text-lg font-bold text-center mt-3',
          htmlContainer: 'text-sm text-gray-500 mt-2 text-center',
          confirmButton: 'btn btn-accent',
          },
          title: 'Server Error',
          text: 'Sorry, your message could not be sent.',
        });
      })
  }

  const {data, isLoading, error} = useQuery({
    queryKey: ['messages'],
    queryFn: getMessages,
    refetchInterval: 1000,
  })

  useEffect(() => {
    if (messagesEndRef.current && anchored) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [data])

  return (
    <div className="flex flex-col mt-5 bg-base-200 border border-primary p-4 bottom-0 left-0 right-0 max-h-100">
      <div id="messages" data-testid="messages" onScroll={anchor} ref={messagesEndRef} className="max-h-1/2 flex flex-col-reverse overflow-y-auto ">
        {data ? data.map(message => (
          <div className="border bg-base-300" key={message._id}>
            <p className="chat-bubble">{message.message}</p>
          </div>
        )) : <div>Loading...</div>}
        <div id="anchor" ref={messagesEndRef} className="h-px"></div>
      </div>
      <div className="divider"/>
      <form id="message-form" onSubmit={postMessage}>
        <input data-testid="message-input" className="text neutral border btn-accent input w-4/5" name="message"
        type="text" required></input>
        <button data-testid="message-submit" className="btn btn-accent" type="submit">Submit Message</button>
      </form>
    </div>
  );
}

export default MessageBoard;
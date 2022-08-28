import ChatBox from 'react-chat-plugin';
import React, {useState} from 'react';

import axios from "axios"

//create react UI for chat

function Chat() {
  const [attr, setAttr] = useState({
    showChatbox: false,
    showIcon: true,
    messages: [
    ],
  });
//user message handles here
  const handleOnSendMessage = async (message) => {
    const response = {
      author: {
        username: 'BOTFriends',
        id: 2,
      },
      text: "",
      type: 'text',
      timestamp: +new Date(),
    }

    const postId =  sessionStorage.getItem("postKey"); //reads unique id webhook url & secret
    await axios
    .post(`http://localhost:3031/posts/${postId}/message`, { //calls ms1 to read the url & secret from db 
      message
    })
    .then((res) => {
      console.log(res);
      const msg = res.data.data.message //read msg from ms1
      console.log(msg)
      response.text = msg;
    });
//set the response in chat plugin
    setAttr({ 
      ...attr,
      messages: attr.messages.concat([{
        author: {
          username: 'Minta',
          id: 1,
        },
        text: message,
        type: 'text',
        timestamp: +new Date(),
      }, response]), 
    });
    
  };
  return (
        <ChatBox
          onSendMessage={handleOnSendMessage}
          userId={1}
          messages={attr.messages}
          width={'100%'}
          showTypingIndicator={true}
        />
  );
}

export default Chat
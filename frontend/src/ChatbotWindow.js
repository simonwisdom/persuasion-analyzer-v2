import React, { useEffect, useRef } from 'react';

const RobotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mr-2 self-end w-4 h-4">
    <path d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 ml-2 self-end w-4 h-4">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ChatbotWindow = ({ messages, onNextMessage }) => {
  const messageListRef = useRef(null);

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-200 p-4">
      <h2 className="text-lg font-bold mb-2">Chat History</h2>
      <div ref={messageListRef} className="flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 flex ${
              msg.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.type === 'persuader' && <RobotIcon />}
            <div
              className={`${
                msg.type === 'user' ? 'bg-green-500' : 'bg-blue-500'
              } text-white p-2 rounded-lg max-w-xs`}
            >
              {msg.content}
            </div>
            {msg.type === 'user' && <UserIcon />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatbotWindow;
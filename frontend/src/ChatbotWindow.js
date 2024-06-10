import React, { useEffect, useRef } from 'react';
import { FaRobot, FaUser } from 'react-icons/fa';

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
            {msg.type === 'persuader' && (
              <FaRobot className="text-blue-500 mr-2 self-end" />
            )}
            <div
              className={`${
                msg.type === 'user' ? 'bg-green-500' : 'bg-blue-500'
              } text-white p-2 rounded-lg max-w-xs`}
            >
              {msg.content}
            </div>
            {msg.type === 'user' && (
              <FaUser className="text-green-500 ml-2 self-end" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatbotWindow;
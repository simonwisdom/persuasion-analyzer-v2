import React, { useState } from 'react';
import ChatbotWindow from './ChatbotWindow';
import Scratchpad from './Scratchpad';
import MessageParser from './chatbot/MessageParser';
import './styles/sage.css';

const Chatbot = ({ persuasionPlans, psychologicalProfile }) => {
  const [messages, setMessages] = useState([]);
  const [thoughts, setThoughts] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  const sendMessage = async (role) => {
    setIsThinking(true);
  
    try {
      const messageParser = new MessageParser();
      console.log('Messages before parsing:', messages);
      const latestPersuaderMessage = messages
        .slice()
        .reverse()
        .find((msg) => msg.type === 'persuader')?.content || '';
      console.log('Latest persuader message:', latestPersuaderMessage);
      const response = await messageParser.parse(
        role === 'persuader' ? '' : latestPersuaderMessage,
        persuasionPlans,
        psychologicalProfile,
        role,
        messages
      );
  
      if (response.thought) {
        setThoughts((prevThoughts) => [...prevThoughts, response.thought]);
      }
  
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: role, content: response.generated_message },
      ]);
  
      console.log('Messages after updating:', [...messages, { type: role, content: response.generated_message }]);
  
      setIsThinking(false);
  
      if (role === 'persuader') {
        // Automatically send the user's response after the persuader's message
        setTimeout(() => {
          sendMessage('user');
        }, 1000);
      }
    } catch (error) {
      console.error('Error communicating with the server:', error);
      setIsThinking(false);
    }
  };

  const handlePersuaderMessage = () => {
    sendMessage('persuader');
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4">
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded-md"
          onClick={handlePersuaderMessage}
          disabled={isThinking}
        >
          {isThinking ? 'Thinking...' : messages.length === 0 ? 'Launch Persuasion Plan' : 'Send Persuader Message'}
        </button>
        <p className="mt-2 text-sm text-gray-600">
          {messages.length === 0
            ? 'We will now use this information to simulate a persuasion attempt on the target. Click the button to start the persuasion process.'
            : 'Click again to continue the conversation.'}
        </p>
      </div>
      <div className="flex-1 flex">
        <div className="w-2/3 p-4">
          <ChatbotWindow messages={messages} />
        </div>
        <div className="w-1/3 p-4">
          <Scratchpad thoughts={thoughts} />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
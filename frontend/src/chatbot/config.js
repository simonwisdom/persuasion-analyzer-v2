import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

const config = {
  initialMessages: [createChatBotMessage('Hello! How can I help you today?')],
  botName: 'MyChatBot',
  customComponents: {
    // Add any custom components here
  },
  customStyles: {
    // Add any custom styles here
  },
  messageParser: new MessageParser(),
  actionProvider: new ActionProvider(createChatBotMessage, (setState) => {}),
};

export default config;
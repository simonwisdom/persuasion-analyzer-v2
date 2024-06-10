import axios from 'axios';

class MessageParser {
  async parse(latestPersuaderMessage, persuasionPlans, psychologicalProfile, role, messages) {
    console.log('Sending message to Claude:', latestPersuaderMessage);
  
    try {
      const response = await axios.post('/api/messages', {
        message: latestPersuaderMessage,
        persuasionPlans,
        psychologicalProfile,
        role,
        messages
      });
      
      if (response.status === 200) {
        const data = response.data;
        // console.log('Server response:', data);
        return data;
      } else {
        console.warn('Error communicating with the server.');
        return { generated_message: 'Sorry, there was an error processing your message.' };
      }
    } catch (error) {
      console.error('Error communicating with the server:', error);
      return { generated_message: 'Sorry, there was an error processing your message.' };
    }
  }
}

export default MessageParser;
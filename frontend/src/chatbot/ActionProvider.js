class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    async handleMessage(message) {
      const response = await message;
      const botMessage = this.createChatBotMessage(response);
  
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, botMessage],
      }));
    }
  }
  
  export default ActionProvider;
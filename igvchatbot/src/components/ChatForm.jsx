import { useRef } from 'react';

const chatForm = ({chatHistory , setChatHistory , generateBotResponse}) => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const inputRef = useRef(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const userMessage = inputRef.current.value.trim();

    if (!userMessage) return;
    inputRef.current.value = '';


    //update chat history wuth user's message
    setChatHistory(history => [...history,{role:"user", text:userMessage }]);

    
    setTimeout(() => {
      //Add a "Thinking ..." placeholder for the bot's response
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking ...", isLoading: true },
      ]);

      //call the generateBotResponse function to get the bot's response
      generateBotResponse([
        ...chatHistory,
        { role: "user", text: `Using the details provided by above, please address this query: ${userMessage}` },
      ]);
    }, 600);

    

  };

  return (
    <form action="#" className="chatform flex items-center space-x-2" onSubmit={handleFormSubmit}>
    <input
      ref={inputRef}
      type="text"
      placeholder="Message"
      className="message-input flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#F85A40]"
      required
    />
    <button
      type="submit"
      className="material-symbols-rounded bg-[#F85A40] text-white p-2 rounded-full hover:bg-[#e14e36]"
    >
      arrow_upward
    </button>
  </form>
  )
}

export default chatForm;

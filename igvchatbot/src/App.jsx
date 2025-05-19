import { useState, useRef, useEffect } from "react";
import "./index.css";
import "./app.css";
import Input from "./components/ChatForm.jsx";
import ChatMessage from "./components/ChatMessage.jsx";

import GV_COLOR from "./assets/GV LOGO COLOR.png";
import GV_WHITE from "./assets/GV LOGO WHITE.png";

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showchatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef(null); // Ref for the chat body

  const generateBotResponse = async (history) => {
    // Helper function to update the chat history
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking ..."),
        { role: "model", text },
      ]);
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: history,
      }),
    };

    try {
      // Make the API call to get the bot response
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message || "Something went wrong");
      }
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Auto-scroll to the newest message
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]); 

  return (
    <div className="min-h-screen">
      <button
        id="toggle-button"
        className="fixed bottom-4 right-4 bg-[#F85A40] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#e14e36] transition duration-300 z-50"
        onClick={() => setShowChatbot((prev) => !prev)}
        aria-label={showchatbot ? "Close chatbot" : "Open chatbot"}
      >
        <span className="material-symbols-rounded">
          {showchatbot ? "close" : "mode_comment"}
        </span>
      </button>

      {/* Conditionally render the chatbot popup */}
      {showchatbot && (
        <div className="chatbot-popup fixed bottom-20 right-4 bg-white rounded-lg shadow-lg max-w-3xl w-full max-w-md max-h-[80vh] overflow-y-auto z-50">
          {/* chatbot header */}
          <div
            className="chat-header flex justify-between items-start bg-[#F85A40] text-white p-4 rounded-t-lg relative"
          >
            {/* Logo with white background */}
            <div className="logo-container bg-white p-1 rounded-full">
              <img
                src={GV_COLOR}
                alt="GV Logo"
                className="h-10 w-10 object-contain"
              />
            </div>

            {/* Centered and larger title */}
            <h2 className="logo-text absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-extrabold text-center w-full pointer-events-none select-none">
              iGV Buddy
            </h2>

            <button
              className="material-symbols-rounded text-white hover:text-gray-200"
              onClick={() => setShowChatbot(false)}
            >
              keyboard_arrow_down
            </button>
          </div>

          {/* chatbot body */}
          <div
            className="chat-body space-y-16 p-4 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-[#F85A40] scrollbar-track-gray-200"
            ref={chatBodyRef}
          >
            <div className="bot-message-container flex items-start space-x-2">
              {/* Image next to the chatbot message */}
              <div className="avatar-container bg-[#F85A40] p-2 rounded-full flex-shrink-0 -ml-2">
                <img
                  src={GV_WHITE}
                  alt="Bot Avatar"
                  className="h-8 w-8 object-contain rounded-full"
                />
              </div>

              <div className="bot-message bg-gray-100 p-3 rounded-lg max-w-sm">
                <p className="bot-message-text text-gray-800">
                  Hi there!👋 <br />
                  I’m your iGV Buddy from Colombo South 🌍. Need help with
                  projects, applications, or approval process?
                </p>
              </div>
            </div>

            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          {/* chatbot footer */}
          <div className="chat-footer mt-4 p-4">
            <Input
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

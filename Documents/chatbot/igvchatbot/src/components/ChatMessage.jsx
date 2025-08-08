import GV_WHITE from "../assets/GV LOGO WHITE.png";


const ChatMessage = ({ chat }) => {
  if (chat.isLoading) {
    return (
      <div className="loading-container">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    );
  }

  return (
    <div
      className={`message-container flex ${
        chat.role === "model" ? "items-start space-x-2" : "justify-end"
      }`}
    >
      {/* Bot Avatar */}
      {chat.role === "model" && (
        <div className="avatar-container bg-[#F85A40] p-2 rounded-full flex-shrink-0">
          <img
            src={GV_WHITE}
            alt="Bot Avatar"
            className="h-8 w-8 object-contain rounded-full"
          />
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`${
          chat.role === "model" ? "bg-gray-100" : "bg-blue-100"
        } p-3 rounded-lg max-w-sm`}
      >
        <p className="message-text text-gray-800">{chat.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;

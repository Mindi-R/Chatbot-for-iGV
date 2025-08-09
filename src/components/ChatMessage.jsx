import GV_WHITE from "../assets/GV LOGO WHITE.png";

const ChatMessage = ({ chat }) => {
  // Don't render loading messages - they're handled separately
  if (chat.isLoading) {
    return null;
  }

  return (
    <div
      className={`message-container flex ${
        chat.role === "model" ? "items-start space-x-2" : "justify-end"
      } ${chat.isError ? "error-message" : ""}`}
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
        {/* Format text with bullet points */}
        <div className="message-text text-gray-800">
          {chat.text.split("\n").map((line, index) => {
            // Check if line starts with bullet point markers
            if (line.trim().match(/^[•·▪▫‣⁃]\s/)) {
              return (
                <div key={index} className="flex items-start mb-1">
                  <span className="mr-2">•</span>
                  <span>{line.replace(/^[•·▪▫‣⁃]\s/, "").trim()}</span>
                </div>
              );
            }
            // Check if line starts with dash or asterisk
            else if (line.trim().match(/^[-*]\s/)) {
              return (
                <div key={index} className="flex items-start mb-1">
                  <span className="mr-2">•</span>
                  <span>{line.replace(/^[-*]\s/, "").trim()}</span>
                </div>
              );
            }
            // Regular line
            else if (line.trim()) {
              return (
                <p key={index} className="mb-1">
                  {line}
                </p>
              );
            }
            // Empty line
            else {
              return <br key={index} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

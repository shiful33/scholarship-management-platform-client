import { useState, useEffect, useRef } from "react";
import { BsChatDotsFill, BsX, BsSend } from "react-icons/bs";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can we help you today?", sender: "bot" },
  ]);
  
  const chatEndRef = useRef(null);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Auto reply logic
    setIsTyping(true);
    setTimeout(() => {
      const botReply = {
        text: "Thank you for your message. Our team will get back to you shortly!",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 2000); 
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-orange-200 p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
                  AI
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-teal-500 rounded-full"></div>
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">Live Support</p>
                <p className="text-[10px] text-teal-50 opacity-90">Always active</p>
              </div>
            </div>
            <BsX size={28} className="cursor-pointer hover:rotate-90 transition-transform" onClick={() => setIsOpen(false)} />
          </div>

          {/* Messages Area */}
          <div className="h-80 p-4 overflow-y-auto flex flex-col gap-3 bg-gray-50 dark:bg-gray-900">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                  msg.sender === "user"
                    ? "bg-teal-500 text-white self-end rounded-tr-none"
                    : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 self-start rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="self-start flex gap-1 items-center bg-gray-200 dark:bg-gray-700 p-2 px-3 rounded-full text-[10px] text-gray-500 dark:text-gray-400">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce delay-75">●</span>
                <span className="animate-bounce delay-150">●</span>
                <span className="ml-1 italic font-medium">Bot is typing...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 border-t dark:border-gray-700 flex bg-white dark:bg-gray-800">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full text-sm p-2 outline-none dark:bg-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-l-lg"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-400 to-orange-200 transform text-white px-4 rounded-r-lg transition-colors flex items-center justify-center"
            >
              <BsSend size={20} className="cursor-pointer" />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full bg-gradient-to-r from-teal-400 to-orange-200 hover:from-orange-300 hover:to-teal-400 transform hover:scale-105 transition-all duration-300  text-white shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center relative group cursor-pointer"
      >
        {isOpen ? <BsX size={30} /> : <BsChatDotsFill size={28} />}
        {!isOpen && (
           <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        )}
        <span className="absolute left-16 bg-gradient-to-r from-teal-400 to-orange-200 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with us
        </span>
      </button>
    </div>
  );
};

export default ChatBot;
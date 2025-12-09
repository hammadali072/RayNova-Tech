import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import chatIcon from "../../assets/Chatbot.json";
import "./Chatbot.css";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your Raynova Tech Assistant.  😊",
      sender: "bot"
    }
  ]);
  const [animationStep, setAnimationStep] = useState(0);
  const [modalAnimation, setModalAnimation] = useState(false);
  const [loading, setLoading] = useState(false);
  const iconRef = useRef(null);
  const modalRef = useRef(null);
  const chatContainerRef = useRef(null);

  const textToAnimate = "Hi! Can I help you?";
  const API_KEY = "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";
  const API_URL = "https://api.groq.com/openai/v1/chat/completions";

  // Text animation effect
  useEffect(() => {
    if (open) return;

    const interval = setInterval(() => {
      setAnimationStep((prev) => {
        if (prev >= textToAnimate.length * 2) return 0;
        return prev + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [open]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Calculate text position
  const getTextPosition = () => {
    const maxSteps = textToAnimate.length * 2;
    const currentStep = animationStep % maxSteps;

    if (currentStep <= textToAnimate.length) {
      return currentStep * 6;
    } else {
      return (maxSteps - currentStep) * 6;
    }
  };

  // Modal open hone par animation
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setModalAnimation(true);
      }, 10);
    } else {
      setModalAnimation(false);
    }
  }, [open]);

  // Modal close karne ka function
  const handleClose = () => {
    setModalAnimation(false);
    setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  // Groq API call function - UPDATED WITH BETTER ERROR HANDLING
  const sendMessageToAPI = async (userMessage) => {
    setLoading(true);

    try {
      console.log("Sending message to Groq API...");

      // CORS headers sahi kar rahe hain
      const headers = {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };

      const requestBody = {
        model: "llama-3.1-8b-instant", // Change to this model
        messages: [
          {
            role: "system",
            content: "Hi, Welcome to Skilly AI Chatbot of RayNova Tech, How can I help you?"
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        stream: false
      };

      console.log("Request Body:", JSON.stringify(requestBody, null, 2));

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
        mode: 'cors' // CORS mode explicitly
      });

      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("API Response Data:", data);

      if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content;
      } else {
        console.error("Unexpected API response structure:", data);
        return "I received an unexpected response format. Please try again.";
      }

    } catch (error) {
      console.error("Error calling Groq API:", error);
      console.error("Error Details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });

      // Test API key validity with a simple request
      if (error.message.includes('401')) {
        return "Authentication failed. Please check if the API key is valid and not expired.";
      } else if (error.message.includes('429')) {
        return "Rate limit exceeded. Please wait a moment before trying again.";
      } else if (error.message.includes('network') || error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
        return "Network error. Please check your internet connection. If the problem persists, it might be a CORS issue. Try: 1) Make sure API key is valid 2) Check console for errors 3) Try different browser";
      } else {
        return `I apologize, but I'm having trouble connecting: ${error.message}`;
      }
    } finally {
      setLoading(false);
    }
  };

  // Alternative simpler test function
  const testGroqAPI = async () => {
    try {
      console.log("Testing Groq API connection...");
      const testResponse = await fetch('https://api.groq.com/openai/v1/models', {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        }
      });
      console.log("Test Response:", testResponse);
      return testResponse.ok;
    } catch (error) {
      console.error("Test failed:", error);
      return false;
    }
  };

  // Handle message send - UPDATED
  const handleSendMessage = async () => {
    if (!text.trim()) return;

    const userMessage = text.trim();

    // Add user message
    setMessages(prev => [...prev, { text: userMessage, sender: "user" }]);
    const currentText = text;
    setText("");

    // Test API connection first
    const isApiWorking = await testGroqAPI();
    console.log("API Working:", isApiWorking);

    if (!isApiWorking) {
      setMessages(prev => [...prev, {
        text: "⚠️ API Connection Test Failed. Please check: 1) API Key validity 2) Internet connection 3) Browser console for errors",
        sender: "bot"
      }]);
      return;
    }

    // Get AI response
    const aiResponse = await sendMessageToAPI(currentText);

    // Add AI response
    setMessages(prev => [...prev, { text: aiResponse, sender: "bot" }]);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Quick test button (for debugging)
  const handleTestButton = async () => {
    console.log("Testing API...");
    const testResult = await testGroqAPI();
    alert(`API Test Result: ${testResult ? "SUCCESS" : "FAILED"}\nCheck console for details.`);
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div
        ref={iconRef}
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 cursor-pointer z-50 flex flex-col items-end"
      >
        {/* Text animation */}
        <div
          className="mb-2 transition-all duration-300 ease-in-out"
          style={{
            transform: `translateX(-${getTextPosition()}px)`,
            opacity: animationStep % (textToAnimate.length * 2) < 5 ? 0 : 1
          }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-4 py-2 rounded-full shadow-xl font-medium text-sm whitespace-nowrap border border-blue-400/30">
            {textToAnimate}
          </div>
          {/* Speech bubble tail */}
          <div className="w-0 h-0 border-l-[10px] border-l-blue-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-auto mr-3 mt-[-2px]"></div>
        </div>

        {/* Icon with pulse effect */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-30"></div>
          <Lottie
            animationData={chatIcon}
            loop={true}
            className="relative z-10 hover:scale-110 transition-transform duration-300 w-24 h-24"
          />
        </div>
      </div>

      {/* MODAL - FULL SCREEN BLACK BACKGROUND */}
      {open && (
        <div
          // className="fixed inset-0 z-50"
          onClick={() => setOpen(false)}
        >
          {/* Modal container - FULL SCREEN */}
          <div
            ref={modalRef}
            className={`
              fixed bg-gray-900
              transition-all duration-500 ease-out
              overflow-scroll
              ${modalAnimation
                ? 'w-[400px] max-w-full bottom-8 right-8 opacity-100 rounded-3xl max-h-[90vh]'
                : 'w-20 h-20 bottom-8 right-8 opacity-0 scale-50 rounded-full'
              }
              border-0 z-50
            `}
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button - Top Right Corner */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-2xl font-bold text-white hover:bg-white/10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 z-50"
            >
              ✖
            </button>

            {/* Main Content - Full Screen */}
            <div className="flex flex-col h-full max-h-[90vh] p-4 md:p-8">
              {/* Chat Area - Full height with scroll */}
              <div
                ref={chatContainerRef}
                className="flex-1 border border-gray-800 p-4 md:p-6 rounded-xl md:rounded-2xl overflow-y-auto bg-black/50 mb-4 md:mb-6 chat-container overflow-scroll"
                style={{ maxHeight: '60vh' }}
              >
                {/* Display all messages */}
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'items-start gap-3 md:gap-4'} mb-6`}
                  >
                    {message.sender === 'bot' && (
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">R</span>
                      </div>
                    )}

                    <div
                      className={`
                        p-3 md:p-4 rounded-2xl max-w-[85%]
                        ${message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-700 to-blue-800 rounded-tr-none'
                          : 'bg-gray-800 rounded-tl-none'
                        }
                      `}
                    >
                      <p className={message.sender === 'user' ? 'text-white text-sm md:text-base' : 'text-gray-100 text-sm md:text-base whitespace-pre-wrap'}>
                        {message.text}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">R</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-gray-800 p-3 rounded-2xl">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="flex-1 bg-gray-800 text-white p-3 md:p-4 rounded-xl md:rounded-2xl focus:outline-none placeholder-gray-500 text-sm md:text-base"
                  disabled={loading}
                  autoFocus
                />
                <button
                  className={`
                    bg-gradient-to-r from-blue-700 to-purple-700 text-white px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl transition-all duration-200 font-medium
                    ${loading || !text.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
                  `}
                  onClick={handleSendMessage}
                  disabled={loading || !text.trim()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
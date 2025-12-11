import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import chatIcon from "../../assets/Chatbot.json";
import "./Chatbot.css";
import { db } from "../../firebase";
import { ref, get } from "firebase/database";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your Raynova Tech Assistant. 😊",
      sender: "bot"
    }
  ]);
  const [animationStep, setAnimationStep] = useState(0);
  const [modalAnimation, setModalAnimation] = useState(false);
  const [loading, setLoading] = useState(false);
  const iconRef = useRef(null);
  const modalRef = useRef(null);
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const textToAnimate = "Hi! Can I help you?";
  const API_KEY = "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";
  const API_URL = "https://api.groq.com/openai/v1/chat/completions";

  // Contact Information
  const contactInfo = {
    emails: ["contact@raynova.tech"],
    phones: ["+44 7848 101848", "+41 79 726 55 55", "+1 646 777 1766"],
    address: "11-12 Old Bond Street, Mayfair, London W1S 4PN, United Kingdom"
  };

  // Process Information
  const processSteps = [
    {
      number: "01",
      title: "Discovery & Planning",
      description: "We dive deep into understanding your business goals, target audience, and project requirements to create a solid foundation."
    },
    {
      number: "02",
      title: "Design & Development",
      description: "Our expert team brings your vision to life with cutting-edge design and robust AI-powered development."
    },
    {
      number: "03",
      title: "Testing & Launch",
      description: "Rigorous testing ensures flawless performance before we launch your solution to the world."
    },
    {
      number: "04",
      title: "Support & Optimization",
      description: "Continuous monitoring and optimization keep your solution performing at its peak with ongoing support."
    }
  ];

  // Fetch services from Firebase
  const fetchServices = async (): Promise<any[]> => {
    try {
      const servicesRef = ref(db, 'services');
      const snapshot = await get(servicesRef);

      if (snapshot.exists()) {
        const servicesData = snapshot.val() as Record<string, any>;
        const servicesList = Object.entries(servicesData).map((entry, index) => ({
          id: entry[0],
          ...(entry[1] as Record<string, any>),
          number: index + 1
        }));
        return servicesList;
      }
      return [];
    } catch (error) {
      console.error("Error fetching services:", error);
      return [];
    }
  };

  // Format services for display
  const formatServicesMessage = (services) => {
    if (services.length === 0) {
      return "Sorry, I couldn't fetch the services list at the moment. Please try again later.";
    }

    let message = `<h2 style="color: #efe9d6; font-size: 1.4em; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">🎯 Our Services</h2>`;
    message += `<div style="line-height: 2.2;">`;
    services.forEach((service) => {
      message += `<div style="color: #efe9d6; font-size: 0.95em; margin-bottom: 8px;"><strong style="color: #c9a227;">${service.number}. ${service.serviceName}</strong></div>`;
    });
    message += `</div>`;
    message += `<p style="color: #efe9d6; margin-top: 20px; font-size: 0.95em;">💡 Feel free to ask about any specific service for more details!</p>`;

    return message;
  };

  // Format contact information for display
  const formatContactMessage = () => {
    let message = `<h2 style="color: #efe9d6; font-size: 1.4em; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">📞 Contact Information</h2>`;

    message += `<h3 style="color: #efe9d6; font-size: 1.1em; font-weight: bold; margin-top: 15px; margin-bottom: 10px;">📧 Email</h3>`;
    message += `<div style="margin-left: 15px; line-height: 2;">`;
    contactInfo.emails.forEach(email => {
      message += `<div style="color: #efe9d6; font-size: 0.95em;">• ${email}</div>`;
    });
    message += `</div>`;

    message += `<h3 style="color: #efe9d6; font-size: 1.1em; font-weight: bold; margin-top: 15px; margin-bottom: 10px;">📱 Phone Numbers</h3>`;
    message += `<div style="margin-left: 15px; line-height: 2;">`;
    contactInfo.phones.forEach(phone => {
      message += `<div style="color: #efe9d6; font-size: 0.95em;">• ${phone}</div>`;
    });
    message += `</div>`;

    message += `<h3 style="color: #efe9d6; font-size: 1.1em; font-weight: bold; margin-top: 15px; margin-bottom: 10px;">📍 Address</h3>`;
    message += `<div style="color: #efe9d6; margin-left: 15px; line-height: 1.8; font-size: 0.95em;">${contactInfo.address}</div>`;
    message += `<p style="color: #efe9d6; margin-top: 20px; font-size: 0.95em;">We're here to help! Reach out to us anytime. 💚</p>`;

    return message;
  };

  // Format process information for display
  const formatProcessMessage = () => {
    let message = `<h2 style="color: #efe9d6; font-size: 1.4em; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">🚀 Our Process</h2>`;
    processSteps.forEach((step) => {
      message += `<h3 style="color: #efe9d6; font-size: 1.1em; font-weight: bold; margin-top: 15px; margin-bottom: 10px;">${step.number}. ${step.title}</h3>`;
      message += `<p style="color: #efe9d6; line-height: 1.8; margin-left: 15px; margin-bottom: 15px; font-size: 0.95em;">${step.description}</p>`;
    });
    return message;
  };

  // Format service details
  const formatServiceDetails = (service) => {
    let message = `<h2 style="color: #efe9d6; font-size: 1.4em; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">🎯 ${service.serviceName}</h2>`;

    // Add description as a paragraph
    if (service.description) {
      message += `<p style="color: #efe9d6; line-height: 1.8; margin-bottom: 20px; font-size: 0.95em;">${service.description}</p>`;
    }

    // Add features as bullet points
    if (service.features) {
      const features = Array.isArray(service.features) ? service.features : [service.features];
      message += `<h3 style="color: #efe9d6; font-size: 1.1em; font-weight: bold; margin-top: 15px; margin-bottom: 10px;">✨ Key Features:</h3>`;
      message += `<div style="margin-left: 15px; line-height: 2;">`;
      message += features.map((f) => `<div style="color: #efe9d6; font-size: 0.95em;">• ${f}</div>`).join('');
      message += `</div>`;
    }

    // Add pricing if available
    if (service.pricing) {
      message += `<h3 style="color: #efe9d6; font-size: 1.1em; font-weight: bold; margin-top: 15px; margin-bottom: 10px;">💰 Pricing</h3>`;
      message += `<p style="color: #efe9d6; line-height: 1.8; margin-left: 15px; font-size: 0.95em;">${service.pricing}</p>`;
    }

    // Add deliverables if available
    if (service.deliverables) {
      const deliverables = Array.isArray(service.deliverables) ? service.deliverables : [service.deliverables];
      message += `<h3 style="color: #efe9d6; font-size: 1.1em; font-weight: bold; margin-top: 15px; margin-bottom: 10px;">📦 Deliverables</h3>`;
      message += `<div style="margin-left: 15px; line-height: 2;">`;
      message += deliverables.map((d) => `<div style="color: #efe9d6; font-size: 0.95em;">• ${d}</div>`).join('');
      message += `</div>`;
    }

    message += `<p style="color: #c9a227; margin-top: 20px; font-weight: bold; font-size: 0.95em;">Ready to get started? Contact us today! 📞</p>`;

    return message;
  };

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

  // Auto scroll to bottom when new messages arrive - FIXED SCROLL
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

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

  // Groq API call function
  const sendMessageToAPI = async (userMessage) => {
    setLoading(true);

    try {
      const headers = {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };

      const requestBody = {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant for RayNova Tech. Provide clear, well-formatted responses with proper line breaks and spacing."
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

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
        mode: 'cors'
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content.replace(/\n/g, '<br>');
      } else {
        return "I received an unexpected response format. Please try again.";
      }

    } catch (error) {
      console.error("Error calling Groq API:", error);

      if (error.message.includes('401')) {
        return "Authentication failed. Please check if the API key is valid and not expired.";
      } else if (error.message.includes('429')) {
        return "Rate limit exceeded. Please wait a moment before trying again.";
      } else if (error.message.includes('network') || error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
        return "Network error. Please check your internet connection.";
      } else {
        return `I apologize, but I'm having trouble connecting: ${error.message}`;
      }
    } finally {
      setLoading(false);
    }
  };

  // Test API connection
  const testGroqAPI = async () => {
    try {
      const testResponse = await fetch('https://api.groq.com/openai/v1/models', {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        }
      });
      return testResponse.ok;
    } catch (error) {
      console.error("Test failed:", error);
      return false;
    }
  };

  // Handle message send
  const handleSendMessage = async () => {
    if (!text.trim()) return;

    const userMessage = text.trim().toLowerCase();

    // Add user message
    setMessages(prev => [...prev, { text: text.trim(), sender: "user" }]);
    const currentText = text;
    setText("");
    setLoading(true);

    // Check if user is asking about services
    if (userMessage.includes('service') || userMessage.includes('what do you offer') || userMessage.includes('what can you do')) {
      const services = await fetchServices();
      const servicesMessage = formatServicesMessage(services);
      setMessages(prev => [...prev, { text: servicesMessage, sender: "bot" }]);
      setLoading(false);
      return;
    }

    // Check if user is asking about a specific service
    const services = await fetchServices();
    let foundService = null;

    // Look for service match
    for (const service of services) {
      if (service?.serviceName && userMessage.includes(service.serviceName.toLowerCase())) {
        foundService = service;
        break;
      }
    }

    if (foundService) {
      const serviceMessage = formatServiceDetails(foundService);
      setMessages(prev => [...prev, { text: serviceMessage, sender: "bot" }]);
      setLoading(false);
      return;
    }

    // Check if user is asking about contact information
    if (userMessage.includes('contact') || userMessage.includes('phone') || userMessage.includes('email') || userMessage.includes('reach') || userMessage.includes('address')) {
      const contactMessage = formatContactMessage();
      setMessages(prev => [...prev, { text: contactMessage, sender: "bot" }]);
      setLoading(false);
      return;
    }

    // Check if user is asking about process
    if (userMessage.includes('process') || userMessage.includes('how do you work') || userMessage.includes('how does it work') || userMessage.includes('workflow') || userMessage.includes('steps')) {
      const processMessage = formatProcessMessage();
      setMessages(prev => [...prev, { text: processMessage, sender: "bot" }]);
      setLoading(false);
      return;
    }

    // Test API connection first
    const isApiWorking = await testGroqAPI();

    if (!isApiWorking) {
      setMessages(prev => [...prev, {
        text: "⚠️ API Connection Test Failed. Please check: 1) API Key validity 2) Internet connection 3) Browser console for errors",
        sender: "bot"
      }]);
      setLoading(false);
      return;
    }

    // Get AI response for general queries
    const aiResponse = await sendMessageToAPI(currentText);

    // Add AI response
    setMessages(prev => [...prev, { text: aiResponse, sender: "bot" }]);
    setLoading(false);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Icon - Hide when modal is open */}
      {!open && (
        <div
          ref={iconRef}
          onClick={() => setOpen(true)}
          className="fixed bottom-8 right-8 cursor-pointer z-40 flex flex-col items-end"
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
      )}

      {/* MODAL - FIXED SCROLL ISSUE */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={handleClose}
        >
          {/* Modal container */}
          <div
            ref={modalRef}
            className={`
              fixed bg-gray-900 border border-gray-800 shadow-2xl
              transition-all duration-500 ease-out
              flex flex-col
              ${modalAnimation
                ? 'w-[400px] max-w-[90vw] bottom-8 right-8 opacity-100 rounded-3xl h-[600px] max-h-[85vh]'
                : 'w-20 h-20 bottom-8 right-8 opacity-0 scale-50 rounded-full'
              }
            `}
            onClick={e => e.stopPropagation()}
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10"
            >
              ✖
            </button>

            {/* Header */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center">
                  <span className="text-white font-bold">R</span>
                </div>
                <div>
                  <h3 className="text-white font-bold">RayNova Assistant</h3>
                  <p className="text-gray-400 text-sm">AI-powered support</p>
                </div>
              </div>
            </div>

            {/* Chat Area - SCROLL FIXED HERE */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-[#c9a227]/60 scrollbar-track-gray-800"
              style={{
                minHeight: 0,
                maxHeight: 'calc(100% - 140px)',
                overflowY: 'auto',
                scrollbarColor: '#c9a227 #232323',
                scrollbarWidth: 'thin'
              }}
            >
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center flex-shrink-0 mt-1 mr-2 shadow-lg border-2" style={{ borderColor: '#e6c75a' }}>
                        <span className="text-white text-xs font-bold">R</span>
                      </div>
                    )}

                    <div
                      className={`
                        p-3 rounded-2xl max-w-[85%] transition-all duration-200
                        ${message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-700 to-blue-800 rounded-tr-none shadow-md hover:shadow-[#c9a227]/30'
                          : 'bg-gray-800 rounded-tl-none shadow-md hover:shadow-[#c9a227]/30'
                        }
                        group
                      `}
                      style={{
                        wordBreak: 'break-word',
                        border: '1.5px solid #e6c75a',
                        boxShadow: message.sender === 'user'
                          ? '0 2px 12px 0 rgba(201,162,39,0.10)'
                          : '0 2px 12px 0 rgba(201,162,39,0.08)'
                      }}
                    >
                      {message.sender === 'user' ? (
                        <p className='text-white text-sm font-medium tracking-wide'>
                          {message.text}
                        </p>
                      ) : (
                        <div
                          className='text-[#efe9d6] text-sm font-normal tracking-normal'
                          dangerouslySetInnerHTML={{ __html: message.text }}
                          style={{
                            fontSize: '0.98rem',
                            lineHeight: '1.7'
                          }}
                        />
                      )}
                    </div>

                    {message.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-1 ml-2 shadow-lg border-2" style={{ borderColor: '#e6c75a' }}>
                        <span className="text-white text-xs">U</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">R</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-gray-800 p-3 rounded-2xl">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                )}

                {/* This div is for auto-scroll */}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="flex-1 bg-gray-800 text-white p-3 rounded-xl focus:outline-none placeholder-gray-500 text-sm"
                  disabled={loading}
                  autoFocus
                />
                <button
                  className={`
                    bg-gradient-to-r from-blue-700 to-purple-700 text-white px-4 py-3 rounded-xl transition-all duration-200
                    ${loading || !text.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
                  `}
                  onClick={handleSendMessage}
                  disabled={loading || !text.trim()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

// Helper function to calculate text position
const getTextPosition = () => {
  const textToAnimate = "Hi! Can I help you?";
  const animationStep = 0; // This should be from your state

  const maxSteps = textToAnimate.length * 2;
  const currentStep = animationStep % maxSteps;

  if (currentStep <= textToAnimate.length) {
    return currentStep * 6;
  } else {
    return (maxSteps - currentStep) * 6;
  }
};

export default Chatbot;
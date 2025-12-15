import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";

import chatIcon2 from "../../assets/RobotSaysHi.json";
import "./Chatbot.css";


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

  // Fetch services from API
  const fetchServices = async (): Promise<any[]> => {
    try {
      const response = await fetch('http://localhost:5000/api/services');
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await response.json();
      
      // Add number property to match existing format
      return data.map((service: any, index: number) => ({
        ...service,
        id: service._id, // Map _id to id for consistency
        number: index + 1
      }));
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
        // If API fails, return a friendly contact message
        return `
          <div style="padding: 15px; background: rgba(201, 162, 39, 0.1); border-radius: 10px; border-left: 4px solid #c9a227;">
            <h3 style="color: #efe9d6; margin-bottom: 10px;">🤖 I'm here to help you</h3>
            <p style="color: #efe9d6; margin-bottom: 15px;">I apologize, but I'm  unable to process your request .</p>
            <div style="background: rgba(201, 162, 39, 0.2); padding: 12px; border-radius: 8px; margin-top: 10px;">
              <p style="color: #efe9d6; font-weight: bold; margin-bottom: 8px;">📞 Please contact over teams:</p>
              <p style="color: #efe9d6; margin-bottom: 5px;">📧 Email: <strong>contact@raynova.tech</strong></p>
              <p style="color: #efe9d6; margin-bottom: 5px;">📱 Phone: <strong>+44 7848 101848</strong></p>
              <p style="color: #efe9d6; margin-top: 10px;">We'll be happy to assist you with your query!</p>
            </div>
          </div>
        `;
      }

      const data = await response.json();

      if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content.replace(/\n/g, '<br>');
      } else {
        return `
          <div style="padding: 15px; background: rgba(201, 162, 39, 0.1); border-radius: 10px; border-left: 4px solid #c9a227;">
            <p style="color: #efe9d6; margin-bottom: 10px;">I received an unexpected response from our system.</p>
            <p style="color: #efe9d6;">For immediate assistance, please contact us at <strong>contact@raynova.tech</strong> or call <strong>+44 7848 101848</strong>.</p>
          </div>
        `;
      }

    } catch (error) {
      console.error("Error calling Groq API:", error);
      
      // For any error, return a friendly contact message
      return `
        <div style="padding: 15px; background: rgba(201, 162, 39, 0.1); border-radius: 10px; border-left: 4px solid #c9a227;">
          <h3 style="color: #efe9d6; margin-bottom: 10px;">🔧 Temporary Service Interruption</h3>
          <p style="color: #efe9d6; margin-bottom: 15px;">I'm currently experiencing some technical difficulties. While we work to resolve this, you can:</p>
          <div style="background: rgba(201, 162, 39, 0.2); padding: 12px; border-radius: 8px;">
            <p style="color: #efe9d6; margin-bottom: 8px;"><strong>1. Browse our services</strong> - Ask about "services"</p>
            <p style="color: #efe9d6; margin-bottom: 8px;"><strong>2. Learn about our process</strong> - Ask about "process"</p>
            <p style="color: #efe9d6; margin-bottom: 8px;"><strong>3. Contact us directly</strong> - Ask about "contact information"</p>
            <p style="color: #efe9d6; margin-top: 10px; font-weight: bold;">📞 Or reach us at: contact@raynova.tech</p>
          </div>
        </div>
      `;
    } finally {
      setLoading(false);
    }
  };

  // Input ref for auto-focus
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when loading finishes
  useEffect(() => {
    if (!loading && open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [loading, open]);

  // Handle message send
  const handleSendMessage = async () => {
    if (!text.trim()) return;

    const userMessage = text.trim().toLowerCase();

    // Add user message
    setMessages(prev => [...prev, { text: text.trim(), sender: "user" }]);
    const currentText = text;
    setText("");
    setLoading(true);

    // Keep focus
    setTimeout(() => {
        inputRef.current?.focus();
    }, 0);

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

    // Check for greeting
    if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
      setMessages(prev => [...prev, { 
        text: "Hello! 👋 I'm your RayNova Tech Assistant. How can I help you today? You can ask about our services, process, or contact information!", 
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
          className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 cursor-pointer z-40 flex flex-col items-end group"
        >
          {/* Text animation - Simplified to just showing the text without scrolling */}
          <div
            className="mb-1 sm:mb-2 transition-all duration-300 ease-in-out animate-bounce"
          >
            <div className="hidden sm:block bg-gradient-to-r from-[#c9a227] to-[#d4b13f] text-[#0f0f0f] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-[0_8px_20px_rgba(201,162,39,0.3)] font-semibold text-xs sm:text-sm whitespace-nowrap border border-[#c9a227]/40 backdrop-blur-sm">
              {textToAnimate}
            </div>
            {/* Speech bubble tail */}
            <div className="hidden sm:block w-0 h-0 border-l-[8px] sm:border-l-[10px] border-l-[#c9a227] border-t-[6px] sm:border-t-[8px] border-t-transparent border-b-[6px] sm:border-b-[8px] border-b-transparent ml-auto mr-2 sm:mr-3 mt-[-2px]"></div>
          </div>

          {/* Icon with enhanced pulse effect - Responsive to 300px */}
          <div className="relative">
            {/* Outer glow rings - Smaller on mobile */}
            <div className="absolute inset-0 animate-ping bg-gradient-to-r from-[#c9a227]/40 to-[#d4b13f]/40 rounded-full opacity-75"></div>
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#c9a227]/30 to-[#0e3b2c]/30 rounded-full"></div>

            {/* Icon container with brand colors - Responsive sizing */}
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-[#c9a227] to-[#0e3b2c] p-1 sm:p-1.5 md:p-2 shadow-[0_8px_32px_rgba(201,162,39,0.4)] group-hover:shadow-[0_12px_40px_rgba(201,162,39,0.6)] transition-all duration-300 group-hover:scale-110 border border-[#c9a227]/50 sm:border-2">
              <div className="w-full h-full rounded-full bg-[#232323]/80 backdrop-blur-sm flex items-center justify-center">
                <Lottie
                  animationData={chatIcon2}
                  loop={true}
                  className="w-full h-full relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL - Enhanced Design */}
      {open && (
        <div
          className="fixed w-full h-full inset-0 bg-[#0f0f0f]/80 backdrop-blur-sm z-50"
          onClick={handleClose}
        >
          {/* Modal container - Responsive to 300px */}
          <div
            ref={modalRef}
            className={`
              fixed bg-[#232323]/95 backdrop-blur-xl border border-[#c9a227]/30 shadow-[0_20px_60px_rgba(201,162,39,0.3)]
              transition-all duration-500 ease-out
              flex flex-col
              overflow-hidden
              ${modalAnimation
                ? 'w-full bottom-0 right-0 sm:w-[360px] sm:bottom-6 sm:right-6 lg:w-[400px] lg:bottom-8 lg:right-8 max-w-[100vw] opacity-100 rounded-t-2xl sm:rounded-t-3xl sm:rounded-3xl h-[65vh] sm:h-[500px] lg:h-[550px]'
                : 'w-12 h-12 opacity-0 scale-50 rounded-full'
              }
              !bottom-0 !right-0
            `}
            onClick={e => e.stopPropagation()}
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Close Button - Enhanced for 300px */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 text-[#efe9d6] hover:bg-[#c9a227]/20 hover:text-[#c9a227] w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-200 z-10 border border-[#c9a227]/30 hover:border-[#c9a227]/60"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header - Enhanced for 300px */}
            <div className="p-2.5 sm:p-3 md:p-4 lg:p-5 border-b border-[#c9a227]/20 bg-gradient-to-r from-[#c9a227]/10 to-[#0e3b2c]/10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#c9a227] to-[#0e3b2c] flex items-center justify-center shadow-[0_8px_20px_rgba(201,162,39,0.3)] border border-[#c9a227]/40">
                  <span className="text-[#efe9d6] font-bold text-xs sm:text-sm md:text-base">R</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#efe9d6] font-bold text-sm sm:text-base md:text-lg truncate">RayNova Assistant</h3>
                  <p className="text-[#c9a227] text-[10px] sm:text-xs md:text-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></span>
                    <span className="truncate">AI-powered support</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Area - Enhanced with better scrolling for 300px */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4"
              style={{
                minHeight: 0,
                maxHeight: 'calc(100% - 140px)',
                overflowY: 'auto',
                scrollbarColor: '#c9a227 #232323',
                scrollbarWidth: 'thin'
              }}
            >
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-1.5 sm:gap-2 md:gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'bot' && (
                      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#c9a227] to-[#0e3b2c] flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(201,162,39,0.3)] border border-[#c9a227]/40">
                        <span className="text-[#efe9d6] text-[10px] sm:text-xs md:text-sm font-bold">R</span>
                      </div>
                    )}

                    <div
                      className={`
                        p-2 sm:p-2.5 md:p-3 lg:p-4 rounded-xl sm:rounded-2xl max-w-[80%] sm:max-w-[85%] md:max-w-[80%] transition-all duration-200
                        ${message.sender === 'user'
                          ? 'bg-gradient-to-br from-[#c9a227] to-[#d4b13f] rounded-tr-sm shadow-[0_4px_12px_rgba(201,162,39,0.25)]'
                          : 'bg-[#232323]/80 border border-[#c9a227]/20 rounded-tl-sm shadow-[0_4px_12px_rgba(201,162,39,0.15)]'
                        }
                        group hover:shadow-[0_6px_16px_rgba(201,162,39,0.3)]
                      `}
                      style={{
                        wordBreak: 'break-word'
                      }}
                    >
                      {message.sender === 'user' ? (
                        <p className='text-[#0f0f0f] text-xs sm:text-sm md:text-base font-medium'>
                          {message.text}
                        </p>
                      ) : (
                        <div
                          className='text-[#efe9d6] text-xs sm:text-sm md:text-base leading-relaxed'
                          dangerouslySetInnerHTML={{ __html: message.text }}
                          style={{
                            fontSize: 'clamp(0.75rem, 2.5vw, 1rem)'
                          }}
                        />
                      )}
                    </div>

                    {message.sender === 'user' && (
                      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#0e3b2c] to-[#c9a227] flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(201,162,39,0.3)] border border-[#c9a227]/40">
                        <span className="text-[#efe9d6] text-[10px] sm:text-xs md:text-sm font-bold">U</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing indicator - Enhanced for 300px */}
                {loading && (
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#c9a227] to-[#0e3b2c] flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(201,162,39,0.3)] border border-[#c9a227]/40">
                      <span className="text-[#efe9d6] text-[10px] sm:text-xs md:text-sm font-bold">R</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-1.5 bg-[#232323]/80 border border-[#c9a227]/20 p-2 sm:p-2.5 md:p-3 lg:p-4 rounded-xl sm:rounded-2xl">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#c9a227] rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#c9a227] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#c9a227] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                )}

                {/* This div is for auto-scroll */}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area - Enhanced for 300px */}
            <div className="p-2 sm:p-2.5 md:p-3 lg:p-4 border-t border-[#c9a227]/20 bg-[#232323]/60">
              <div className="flex gap-1.5 sm:gap-2 md:gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-[#0f0f0f]/80 border border-[#c9a227]/20 text-[#efe9d6] p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 placeholder-[#efe9d6]/40 text-xs sm:text-sm md:text-base transition-all duration-300 min-w-0"
                  disabled={loading}
                  autoFocus
                />
                <button
                  className={`
                    bg-gradient-to-r from-[#c9a227] to-[#d4b13f] text-[#0f0f0f] px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl transition-all duration-200 shadow-[0_4px_12px_rgba(201,162,39,0.3)] flex-shrink-0
                    ${loading || !text.trim()
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:opacity-90 hover:shadow-[0_6px_16px_rgba(201,162,39,0.4)] hover:scale-105'
                    }
                  `}
                  onClick={handleSendMessage}
                  disabled={loading || !text.trim()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
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

// This is a mock service for AI chatbot functionality

interface AIChatResponse {
  text: string;
  type: 'general' | 'search' | 'weather' | 'news';
}

const DELAY_MS = 1500;

// Simulate response from an AI model
export const getAIResponse = async (message: string): Promise<AIChatResponse> => {
  // Simple rule-based responses
  await new Promise(resolve => setTimeout(resolve, DELAY_MS));

  let lowercaseMessage = message.toLowerCase();
  
  // Weather detection
  if (lowercaseMessage.includes('weather') && (lowercaseMessage.includes('in ') || lowercaseMessage.includes('at '))) {
    return {
      type: 'weather',
      text: 'I can check the weather for you.',
    };
  }
  
  // News detection
  else if (lowercaseMessage.includes('news') || 
          (lowercaseMessage.includes('what') && (lowercaseMessage.includes('happening') || lowercaseMessage.includes('latest')))) {
    return {
      type: 'news',
      text: 'Here are the latest news headlines.',
    };
  }
  
  // Search detection
  else if (lowercaseMessage.includes('search') || 
          lowercaseMessage.includes('find') || 
          lowercaseMessage.includes('look up') || 
          lowercaseMessage.includes('what is') || 
          lowercaseMessage.includes('who is') || 
          lowercaseMessage.includes('how to')) {
    return {
      type: 'search',
      text: 'Let me search that for you.',
    };
  }
  
  // General conversation
  else {
    return {
      type: 'general',
      text: getRandomResponse(message),
    };
  }
};

// Some random responses to simulate AI conversation
const getRandomResponse = (message: string): string => {
  const responses = [
    "I understand you're saying: \"" + message + "\". How can I help you further?",
    "Thanks for your message. Is there anything specific you'd like to know?",
    "I'm here to assist with weather, news, or general questions. What would you like to know?",
    "You can ask me about the weather, latest news, or search for information. How can I help?",
    "I'm your virtual assistant. I can provide weather updates, news, or answer general questions.",
    "I'm processing your request. For better results, try asking about weather, news, or specific information.",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

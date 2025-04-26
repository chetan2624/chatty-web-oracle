
// DOM elements
const chatContainer = document.getElementById('chat-container');
const featuresContainer = document.getElementById('features-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const micButton = document.getElementById('mic-button');
const toastContainer = document.getElementById('toast-container');

// Global variables
let isRecording = false;
let messages = [];
let isLoading = false;

// Update send button state based on input
messageInput.addEventListener('input', () => {
    sendButton.disabled = messageInput.value.trim() === '';
});

// Send message when enter key is pressed
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (message && !isLoading) {
            sendMessage(message);
        }
    }
});

// Send message function
function sendMessage(message = null) {
    // Get message from input or parameter
    const messageText = message || messageInput.value.trim();
    
    if (!messageText || isLoading) return;
    
    // Hide features when user starts chatting
    if (featuresContainer && featuresContainer.style.display !== 'none') {
        featuresContainer.style.display = 'none';
    }
    
    // Add user message to chat
    addMessage({
        id: Date.now().toString(),
        message: messageText,
        type: 'user',
        contentType: 'text',
        timestamp: new Date()
    });
    
    // Clear input
    messageInput.value = '';
    sendButton.disabled = true;
    
    // Show loading indicator
    isLoading = true;
    showTypingIndicator();
    
    // Send message to server
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: messageText })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Hide typing indicator
        hideTypingIndicator();
        
        // Add bot message to chat
        addMessage(data);
    })
    .catch(error => {
        console.error('Error:', error);
        hideTypingIndicator();
        
        // Show error toast
        showToast('Something went wrong', 'Please try again later.', 'error');
        
        // Add error message to chat
        addMessage({
            id: Date.now().toString(),
            message: "I'm having trouble processing your request. Please try again later.",
            type: 'bot',
            contentType: 'text',
            timestamp: new Date()
        });
    })
    .finally(() => {
        isLoading = false;
    });
}

// Add message to chat
function addMessage(message) {
    messages.push(message);
    
    const messageElement = document.createElement('div');
    messageElement.className = message.type === 'user' ? 'user-message' : 'bot-message';
    
    // Format time
    const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Create message content based on type
    let messageContent = '';
    
    if (message.contentType === 'text') {
        messageContent = `
            <div class="message-bubble ${message.type === 'user' ? 'user-bubble' : 'bot-bubble'}">
                <div>${message.message}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
    } 
    else if (message.contentType === 'weather' && message.weatherData) {
        const weather = message.weatherData;
        messageContent = `
            <div class="message-bubble bot-bubble">
                <div>${message.message}</div>
                <div class="weather-card">
                    <div class="weather-header">
                        <span class="weather-icon">${weather.icon}</span>
                        <span class="weather-location">${weather.location}</span>
                    </div>
                    <div class="weather-temp">${weather.temperature}°C</div>
                    <div class="weather-condition">${weather.condition}</div>
                    <div class="weather-details">
                        <div class="weather-detail">
                            <div>Humidity</div>
                            <div>${weather.humidity}%</div>
                        </div>
                        <div class="weather-detail">
                            <div>Wind</div>
                            <div>${weather.windSpeed} km/h</div>
                        </div>
                    </div>
                    <div class="weather-tips">
                        ${weather.tips.map(tip => `
                            <div class="weather-tip">
                                <span class="tip-icon">•</span>
                                <span>${tip}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="message-time">${time}</div>
            </div>
        `;
    } 
    else if (message.contentType === 'news' && message.newsData) {
        messageContent = `
            <div class="message-bubble bot-bubble">
                <div>${message.message}</div>
                <div class="news-card">
                    ${message.newsData.map(item => `
                        <div class="news-item">
                            <div class="news-title">${item.title}</div>
                            <div class="news-description">${item.description}</div>
                            <div>
                                <span class="news-source">${item.source}</span>
                                <span class="news-time">${item.publishedAt}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="message-time">${time}</div>
            </div>
        `;
    } 
    else if (message.contentType === 'search' && message.searchData) {
        messageContent = `
            <div class="message-bubble bot-bubble">
                <div>${message.message}</div>
                <div class="search-results">
                    ${message.searchData.map(item => `
                        <div class="search-item">
                            <div class="search-title" onclick="window.open('${item.url}', '_blank')">${item.title}</div>
                            <div class="search-description">${item.description}</div>
                            <div class="search-url">${item.url}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="message-time">${time}</div>
            </div>
        `;
    }
    
    messageElement.innerHTML = messageContent;
    chatContainer.appendChild(messageElement);
    
    // Scroll to bottom
    scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.id = 'typing-indicator';
    typingElement.className = 'bot-message';
    typingElement.innerHTML = `
        <div class="message-bubble bot-bubble" style="padding: 12px;">
            <div class="typing-animation">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatContainer.appendChild(typingElement);
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingElement = document.getElementById('typing-indicator');
    if (typingElement) {
        typingElement.remove();
    }
}

// Toggle recording state
function toggleRecording() {
    isRecording = !isRecording;
    
    if (isRecording) {
        micButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
        `;
        
        // In a real app, this would use the Web Speech API
        // This is a mock implementation
        setTimeout(() => {
            messageInput.value = "What is the weather in New York?";
            messageInput.dispatchEvent(new Event('input'));
            toggleRecording();
        }, 3000);
    } else {
        micButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
        `;
    }
}

// Show toast notification
function showToast(title, message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            ${type === 'success' 
                ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>'
                : '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>'
            }
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
            if (toast.parentElement === toastContainer) {
                toastContainer.removeChild(toast);
            }
        }, 500);
    }, 5000);
}

// Scroll to bottom of chat container
function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Initialize the app
function init() {
    messageInput.focus();
}

// Start the app
init();

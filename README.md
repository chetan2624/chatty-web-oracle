
# AI Chatbot - Python Flask Edition

This is a Python Flask implementation of the AI Chatbot that provides information about weather, news, and general search results.

## Features

- Weather information for cities
- Latest news headlines
- Information search capabilities
- Responsive UI with clean design
- Mock data for demonstration

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-chatbot-python.git
cd ai-chatbot-python
```

2. Create a virtual environment
```bash
python -m venv venv
```

3. Activate the virtual environment
```bash
# On Windows
venv\Scripts\activate

# On Unix or MacOS
source venv/bin/activate
```

4. Install dependencies
```bash
pip install -r requirements.txt
```

## Usage

1. Start the Flask development server:
```bash
python app.py
```

2. Open your browser and go to:
```
http://127.0.0.1:5000
```

## Project Structure

```
.
├── app.py                  # Main Flask application
├── services/               # Service modules
│   ├── ai_service.py       # AI response generation
│   ├── news_service.py     # News handling
│   ├── search_service.py   # Search functionality
│   └── weather_service.py  # Weather data processing
├── static/                 # Static assets
│   ├── css/                # Stylesheets
│   │   └── styles.css      # Main styles
│   └── js/                 # JavaScript files
│       └── main.js         # Client-side functionality
├── templates/              # HTML templates
│   └── index.html          # Main page
└── requirements.txt        # Python dependencies
```

## Customizing

To connect to real APIs instead of using mock data:

1. Get API keys for weather and news services
2. Modify the respective service files to use the real API endpoints
3. Update the response processing to match the actual API responses

## License

MIT

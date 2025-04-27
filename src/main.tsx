
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ComparisonPage from './pages/ComparisonPage';
import { trackPageView } from './utils/tracking';
import './App.css';

function Navigation() {
  return (
    <nav style={{ 
      padding: '1rem', 
      backgroundColor: '#18181b',
      borderBottom: '1px solid #27272a',
      marginBottom: '2rem' 
    }}>
      <div style={{ 
        display: 'flex', 
        gap: '2rem', 
        justifyContent: 'center' 
      }}>
        <Link to="/" style={{ 
          color: '#fafafa', 
          textDecoration: 'none', 
          fontSize: '0.875rem',
          fontWeight: '500',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#27272a'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
          Home
        </Link>
        <Link to="/about" style={{ 
          color: '#fafafa', 
          textDecoration: 'none', 
          fontSize: '0.875rem',
          fontWeight: '500',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#27272a'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
          About
        </Link>
        <Link to="/comparison" style={{ 
          color: '#fafafa', 
          textDecoration: 'none', 
          fontSize: '0.875rem',
          fontWeight: '500',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#27272a'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
          Comparison
        </Link>
      </div>
    </nav>
  );
}

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const pageTitles: Record<string, string> = {
      '/': 'Home',
      '/about': 'About',
      '/comparison': 'Comparison'
    };
    const pageTitle = pageTitles[location.pathname] || 'Unknown';
    trackPageView(location.pathname, pageTitle);
  }, [location]);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/comparison" element={<ComparisonPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
        <header style={{ 
          padding: '2rem 1rem', 
          backgroundColor: '#0a0a0a', 
          color: '#fafafa', 
          textAlign: 'center',
          borderBottom: '1px solid #27272a'
        }}>
          <h1>Telemetry Demo - Microsoft Clarity & Google Analytics</h1>
          <p style={{ color: '#a1a1aa' }}>Track custom events and page views across multiple routes</p>
        </header>
        <AppContent />
        <footer style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          marginTop: '3rem',
          borderTop: '1px solid #27272a',
          backgroundColor: '#0a0a0a'
        }}>
          <h3 style={{ color: '#fafafa' }}>✅ Analytics Configuration Active:</h3>
          <ol style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto', color: '#a1a1aa' }}>
            <li>Google Tag Manager ID: <code>GTM-MT9MWSLQ</code></li>
            <li>Google Analytics 4 ID: <code>G-8VNHTC2ZJX</code></li>
            <li>Microsoft Clarity ID: <code>t1ori1zqey</code></li>
            <li>Open browser DevTools to see events being logged in the console</li>
            <li>Check Network tab to verify events are being sent to GA4, GTM and Clarity</li>
          </ol>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
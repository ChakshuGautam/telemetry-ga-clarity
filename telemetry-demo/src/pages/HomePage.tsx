import { useState } from 'react';
import { trackGTMEvent, trackClarityCustomEvent } from '../utils/tracking';

export default function HomePage() {
  const [clickCount, setClickCount] = useState(0);

  const handleButtonClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    trackGTMEvent('button_click', {
      event_category: 'engagement',
      event_label: 'home_page_button',
      value: newCount,
    });
    
    trackClarityCustomEvent('HomeButtonClick', { clickCount: newCount });
  };

  const handlePurchaseClick = () => {
    trackGTMEvent('purchase', {
      transaction_id: `demo_${Date.now()}`,
      value: 25.42,
      currency: 'USD',
      items: [{
        item_id: 'SKU123',
        item_name: 'Demo Product',
        price: 25.42,
        quantity: 1
      }]
    });
    
    trackClarityCustomEvent('PurchaseIntent', { 
      productId: 'SKU123',
      price: 25.42 
    });
  };

  const handleSignupClick = () => {
    trackGTMEvent('sign_up', {
      method: 'email',
      event_category: 'engagement',
    });
    
    trackClarityCustomEvent('SignupButtonClick', { 
      page: 'home',
      method: 'email' 
    });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#fafafa' }}>Home Page</h1>
      <p style={{ color: '#a1a1aa', marginBottom: '2rem' }}>This is the home page with custom event tracking.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <button 
          onClick={handleButtonClick}
        >
          Track Engagement Event (Clicked: {clickCount})
        </button>
        
        <button 
          onClick={handlePurchaseClick}
          className="secondary"
        >
          Track Purchase Event
        </button>
        
        <button 
          onClick={handleSignupClick}
          className="secondary"
        >
          Track Signup Event
        </button>
      </div>
      
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#fafafa' }}>Events Being Tracked:</h3>
        <ul>
          <li>Page views (automatic on route change)</li>
          <li>Button clicks with engagement metrics</li>
          <li>E-commerce purchase events</li>
          <li>User signup events</li>
          <li>Custom Clarity tags for user behavior</li>
        </ul>
        <p style={{ fontSize: '0.875rem', color: '#71717a' }}>Check browser console and network tab to see events being sent.</p>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { 
  trackWithDataLayer, 
  trackWithReactGA4, 
  trackClarityEvent,
  initializeReactGA4,
  trackWithAllMethods
} from '../utils/tracking-comparison';

export default function ComparisonPage() {
  const [method, setMethod] = useState<'dataLayer' | 'reactGA4' | 'both'>('both');
  const [eventCount, setEventCount] = useState(0);
  const [reactGA4Initialized, setReactGA4Initialized] = useState(false);

  // Initialize React-GA4 (you'd normally do this in App.tsx or main.tsx)
  const handleInitReactGA4 = () => {
    // Using a demo measurement ID - replace with your actual GA4 measurement ID
    initializeReactGA4('G-XXXXXXXXXX');
    setReactGA4Initialized(true);
  };

  const handleTestEvent = () => {
    const newCount = eventCount + 1;
    setEventCount(newCount);

    const eventData = {
      event_category: 'test',
      event_label: 'comparison_test',
      value: newCount,
      custom_parameter: 'demo_value',
      timestamp: new Date().toISOString()
    };

    switch(method) {
      case 'dataLayer':
        trackWithDataLayer.event('test_event', eventData);
        trackClarityEvent('TestEvent_DataLayer', eventData);
        break;
      case 'reactGA4':
        if (!reactGA4Initialized) {
          alert('Please initialize React-GA4 first!');
          return;
        }
        trackWithReactGA4.event('test_event', eventData);
        trackClarityEvent('TestEvent_ReactGA4', eventData);
        break;
      case 'both':
        trackWithAllMethods('test_event', eventData);
        break;
    }
  };

  const handlePurchaseEvent = () => {
    const purchaseData = {
      transaction_id: `DEMO_${Date.now()}`,
      value: 99.99,
      currency: 'USD',
      tax: 8.99,
      shipping: 5.00,
      items: [
        {
          item_id: 'SKU_123',
          item_name: 'Demo Product',
          item_category: 'Electronics',
          item_brand: 'Demo Brand',
          price: 99.99,
          quantity: 1
        }
      ]
    };

    switch(method) {
      case 'dataLayer':
        trackWithDataLayer.purchase(purchaseData);
        break;
      case 'reactGA4':
        if (!reactGA4Initialized) {
          alert('Please initialize React-GA4 first!');
          return;
        }
        trackWithReactGA4.purchase(purchaseData);
        break;
      case 'both':
        trackWithDataLayer.purchase(purchaseData);
        if (reactGA4Initialized) {
          trackWithReactGA4.purchase(purchaseData);
        }
        break;
    }

    trackClarityEvent('PurchaseEvent', { method, ...purchaseData });
  };

  const handleUserProperties = () => {
    const userProps = {
      user_type: 'premium',
      account_age: '30_days',
      preferred_language: 'en',
      subscription_status: 'active'
    };

    if (method === 'reactGA4' || method === 'both') {
      if (!reactGA4Initialized) {
        alert('Please initialize React-GA4 first!');
        return;
      }
      trackWithReactGA4.setUserProperties(userProps);
    }

    if (method === 'dataLayer' || method === 'both') {
      trackWithDataLayer.event('set_user_properties', userProps);
    }

    trackClarityEvent('UserProperties', userProps);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#fafafa' }}>Analytics Implementation Comparison</h1>
      <p style={{ color: '#a1a1aa', marginBottom: '2rem' }}>Compare different Google Analytics implementation approaches</p>

      {/* Method Selection */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#fafafa' }}>Select Tracking Method:</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <label>
            <input
              type="radio"
              value="dataLayer"
              checked={method === 'dataLayer'}
              onChange={(e) => setMethod(e.target.value as any)}
            />
            DataLayer (GTM)
          </label>
          <label>
            <input
              type="radio"
              value="reactGA4"
              checked={method === 'reactGA4'}
              onChange={(e) => setMethod(e.target.value as any)}
            />
            React-GA4 Library
          </label>
          <label>
            <input
              type="radio"
              value="both"
              checked={method === 'both'}
              onChange={(e) => setMethod(e.target.value as any)}
            />
            Both Methods
          </label>
        </div>
      </div>

      {/* React-GA4 Initialization */}
      {(method === 'reactGA4' || method === 'both') && !reactGA4Initialized && (
        <div className="card" style={{ 
          marginBottom: '2rem',
          borderColor: '#a16207'
        }}>
          <p style={{ color: '#fbbf24' }}>⚠️ React-GA4 needs to be initialized first</p>
          <button 
            onClick={handleInitReactGA4}
          >
            Initialize React-GA4
          </button>
        </div>
      )}

      {/* Test Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <button
          onClick={handleTestEvent}
        >
          Send Test Event (Count: {eventCount})
        </button>

        <button
          onClick={handlePurchaseEvent}
          className="secondary"
        >
          Send Purchase Event
        </button>

        <button
          onClick={handleUserProperties}
          className="secondary"
        >
          Set User Properties
        </button>
      </div>

      {/* Implementation Comparison */}
      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card">
          <h3 style={{ color: '#fafafa' }}>📊 DataLayer (GTM) Approach</h3>
          <h4 style={{ color: '#fafafa', fontSize: '1rem', marginTop: '1rem' }}>Pros:</h4>
          <ul>
            <li>Works directly with Google Tag Manager</li>
            <li>No additional library needed</li>
            <li>GTM handles GA4 connection</li>
            <li>Easy to modify tags without code changes</li>
            <li>Can send to multiple analytics tools</li>
          </ul>
          <h4 style={{ color: '#fafafa', fontSize: '1rem', marginTop: '1rem' }}>Cons:</h4>
          <ul>
            <li>Requires GTM configuration</li>
            <li>Less type safety</li>
            <li>Debugging requires GTM preview mode</li>
          </ul>
          <h4 style={{ color: '#fafafa', fontSize: '1rem', marginTop: '1rem' }}>Code Example:</h4>
          <pre>
{`window.dataLayer.push({
  event: 'custom_event',
  category: 'engagement',
  label: 'button_click'
});`}
          </pre>
        </div>

        <div className="card">
          <h3 style={{ color: '#fafafa' }}>📈 React-GA4 Library Approach</h3>
          <h4 style={{ color: '#fafafa', fontSize: '1rem', marginTop: '1rem' }}>Pros:</h4>
          <ul>
            <li>Type-safe with TypeScript</li>
            <li>React-specific hooks available</li>
            <li>Direct GA4 integration</li>
            <li>Built-in event validation</li>
            <li>Easier unit testing</li>
          </ul>
          <h4 style={{ color: '#fafafa', fontSize: '1rem', marginTop: '1rem' }}>Cons:</h4>
          <ul>
            <li>Additional dependency (14KB)</li>
            <li>Requires initialization</li>
            <li>Only works with GA4</li>
            <li>Code changes needed for tag updates</li>
          </ul>
          <h4 style={{ color: '#fafafa', fontSize: '1rem', marginTop: '1rem' }}>Code Example:</h4>
          <pre>
{`import ReactGA from 'react-ga4';

ReactGA.event('custom_event', {
  category: 'engagement',
  label: 'button_click'
});`}
          </pre>
        </div>
      </div>

      {/* Console Output Guide */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#fafafa' }}>🔍 Check Console for Output:</h3>
        <ul>
          <li>📊 DataLayer events appear with "DataLayer Event:" prefix</li>
          <li>📈 React-GA4 events appear with "React-GA4 Event:" prefix</li>
          <li>🔍 Clarity events appear with "Clarity Custom Event:" prefix</li>
        </ul>
        <p style={{ color: '#a1a1aa' }}><strong style={{ color: '#fafafa' }}>Network Tab:</strong> Look for requests to:</p>
        <ul>
          <li><code>google-analytics.com/g/collect</code> (GA4 direct)</li>
          <li><code>googletagmanager.com</code> (GTM)</li>
          <li><code>clarity.ms</code> (Microsoft Clarity)</li>
        </ul>
      </div>
    </div>
  );
}
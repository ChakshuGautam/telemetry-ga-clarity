import ReactGA from 'react-ga4';

declare global {
  interface Window {
    dataLayer: any[];
    clarity: (...args: any[]) => void;
    gtag: (...args: any[]) => void;
  }
}

// ============================================
// APPROACH 1: Direct dataLayer (GTM) - Current Implementation
// ============================================

export const trackWithDataLayer = {
  // Push events directly to GTM dataLayer
  event: (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...parameters
      });
      console.log('📊 DataLayer Event:', eventName, parameters);
    }
  },

  // Track page views via dataLayer
  pageView: (pagePath: string, pageTitle: string) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_path: pagePath,
        page_title: pageTitle,
      });
      console.log('📊 DataLayer Page View:', pagePath, pageTitle);
    }
  },

  // E-commerce tracking via dataLayer
  purchase: (transactionData: any) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'purchase',
        ecommerce: transactionData
      });
      console.log('📊 DataLayer Purchase:', transactionData);
    }
  }
};

// ============================================
// APPROACH 2: React-GA4 Library
// ============================================

// Initialize React-GA4 (call this in your main.tsx or App.tsx)
export const initializeReactGA4 = (measurementId: string) => {
  ReactGA.initialize(measurementId, {
    gaOptions: {
      debug_mode: true
    },
    gtagOptions: {
      debug_mode: true
    }
  });
  console.log('🚀 React-GA4 Initialized with:', measurementId);
};

export const trackWithReactGA4 = {
  // Track custom events using React-GA4
  event: (eventName: string, parameters?: Record<string, any>) => {
    ReactGA.event(eventName, parameters);
    console.log('📈 React-GA4 Event:', eventName, parameters);
  },

  // Track page views using React-GA4
  pageView: (pagePath: string, pageTitle?: string) => {
    ReactGA.send({ 
      hitType: "pageview", 
      page: pagePath,
      title: pageTitle 
    });
    console.log('📈 React-GA4 Page View:', pagePath, pageTitle);
  },

  // E-commerce tracking using React-GA4
  purchase: (transactionData: {
    transaction_id: string;
    value: number;
    currency: string;
    items: any[];
  }) => {
    ReactGA.event('purchase', {
      currency: transactionData.currency,
      transaction_id: transactionData.transaction_id,
      value: transactionData.value,
      items: transactionData.items
    });
    console.log('📈 React-GA4 Purchase:', transactionData);
  },

  // Set user properties
  setUserProperties: (properties: Record<string, any>) => {
    ReactGA.gtag('set', 'user_properties', properties);
    console.log('📈 React-GA4 User Properties:', properties);
  }
};

// ============================================
// APPROACH 3: Direct gtag (if not using GTM)
// ============================================

export const trackWithGtag = {
  // Direct gtag implementation (requires gtag script in HTML)
  event: (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
      console.log('📉 Gtag Event:', eventName, parameters);
    }
  },

  // Track page views with gtag
  pageView: (pagePath: string, pageTitle: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'YOUR_GA_MEASUREMENT_ID', {
        page_path: pagePath,
        page_title: pageTitle,
      });
      console.log('📉 Gtag Page View:', pagePath, pageTitle);
    }
  }
};

// ============================================
// Microsoft Clarity (same for all approaches)
// ============================================

export const trackClarityEvent = (
  eventName: string,
  customTag?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('set', eventName, customTag);
    console.log('🔍 Clarity Custom Event:', eventName, customTag);
  }
};

// ============================================
// Comparison Helper - Track with all methods
// ============================================

export const trackWithAllMethods = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  // Track with all available methods for comparison
  trackWithDataLayer.event(eventName, parameters);
  trackWithReactGA4.event(eventName, parameters);
  trackWithGtag.event(eventName, parameters);
  
  // Also track in Clarity
  trackClarityEvent(eventName, parameters);
};
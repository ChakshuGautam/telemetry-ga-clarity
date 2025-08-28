declare global {
  interface Window {
    dataLayer: any[];
    clarity: (...args: any[]) => void;
  }
}

export const trackGTMEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters
    });
    console.log('GTM Event:', eventName, parameters);
  }
};

export const trackClarityCustomEvent = (
  eventName: string,
  customTag?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('set', eventName, customTag);
    console.log('Clarity Custom Event:', eventName, customTag);
  }
};

export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: pagePath,
      page_title: pageTitle,
    });
    console.log('GTM Page View:', pagePath, pageTitle);
  }
};
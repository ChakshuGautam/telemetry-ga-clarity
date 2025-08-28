# Telemetry Demo - Microsoft Clarity & Google Analytics Integration

This is a demo Vite React application showcasing the integration of Microsoft Clarity and Google Analytics for tracking custom events and user interactions.

## Features

- **Dual Analytics Integration**: Microsoft Clarity and Google Analytics 4 (GA4)
- **React Router**: Multiple routes with automatic page view tracking
- **Custom Event Tracking**: Various event types including:
  - User engagement (button clicks, feedback)
  - E-commerce events (purchases)
  - Video interactions
  - File downloads
  - Sign-up events
  - Custom user journey milestones

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Analytics IDs

Edit `index.html` and replace the placeholder IDs with your actual analytics IDs:

- Replace `YOUR_CLARITY_ID` with your Microsoft Clarity project ID
- Replace `YOUR_GA_MEASUREMENT_ID` with your Google Analytics measurement ID (e.g., `G-XXXXXXXXXX`)

### 3. Getting Your Analytics IDs

#### Microsoft Clarity
1. Go to [clarity.microsoft.com](https://clarity.microsoft.com)
2. Create a new project or select existing
3. Go to Settings → Setup
4. Copy your Project ID

#### Google Analytics
1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a new property or select existing
3. Go to Admin → Data Streams
4. Select your web stream
5. Copy the Measurement ID (starts with `G-`)

### 4. Run the Application
```bash
npm run dev
```

## Testing the Integration

1. **Open Browser DevTools**: Check the console for event logs
2. **Network Tab**: Monitor requests to:
   - `clarity.ms` for Microsoft Clarity
   - `google-analytics.com` or `googletagmanager.com` for GA4
3. **Navigate Between Pages**: Verify page view events are triggered
4. **Click Buttons**: Test various custom events on both Home and About pages

## Events Being Tracked

### Automatic Events
- Page views on route changes
- Standard GA4 enhanced measurement events
- Clarity session recordings

### Custom Events

#### Home Page
- `button_click`: General engagement tracking
- `purchase`: E-commerce transaction event
- `sign_up`: User registration event

#### About Page
- `feedback_submitted`: User rating/feedback
- `video_start`: Video engagement
- `file_download`: Document downloads
- `contact_form_open`: Contact intent

## Project Structure
```
telemetry-demo/
├── src/
│   ├── pages/
│   │   ├── HomePage.tsx    # Home page with event buttons
│   │   └── AboutPage.tsx   # About page with different events
│   ├── utils/
│   │   └── tracking.ts     # Analytics helper functions
│   ├── App.tsx             # Main app with routing
│   └── main.tsx           # App entry point
├── index.html             # HTML with analytics scripts
└── package.json
```

## Debugging Tips

- Events are logged to console with prefix `GA Event:` or `Clarity Custom Event:`
- Check browser network tab for actual requests being sent
- Use Google Analytics DebugView for real-time event monitoring
- Microsoft Clarity dashboard shows session recordings and heatmaps

## Important Notes

- **Privacy**: Ensure you have proper privacy policy and cookie consent
- **Testing**: Use test/development analytics properties during development
- **GDPR/CCPA**: Implement proper consent management for production use
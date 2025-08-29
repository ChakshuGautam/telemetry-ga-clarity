# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview

# Serve presentation (docs folder)
npx serve docs -p 3000
```

## Analytics Architecture

This is a **dual analytics implementation** demonstrating Microsoft Clarity and Google Analytics 4 integration patterns. The architecture supports multiple tracking approaches:

### Core Tracking System
- **Primary approach**: GTM dataLayer + direct gtag calls (`src/utils/tracking.ts`)
- **Comparison implementations**: Three different tracking methods in `src/utils/tracking-comparison.ts`
- **Global window extensions**: TypeScript declarations for `dataLayer`, `clarity`, `gtag`

### Analytics Integration Points
1. **Microsoft Clarity**: Session recordings, heatmaps, custom tagging via `window.clarity('set', eventName, customTag)`
2. **Google Tag Manager**: Events pushed to `window.dataLayer` for tag management
3. **GA4 Direct**: Direct gtag calls as fallback/complement to GTM
4. **React-GA4**: Alternative React-specific implementation (demonstration only)

### Event Tracking Patterns
- **Automatic page views**: React Router integration in `App.tsx` with `trackPageView()`
- **Custom events**: Business-specific events with rich custom properties
- **E-commerce events**: Standard GA4 e-commerce parameter structure
- **User journey events**: Cross-page tracking with Clarity custom tags

## Analytics Configuration

### Script Integration
Both `index.html` files contain analytics scripts:
- **Microsoft Clarity**: Async script with project ID `nx82kkx8r9`
- **Google Tag Manager**: Container `GTM-MT9MWSLQ`
- Scripts are loaded in `<head>` for proper initialization

### Development vs Production
- Console logging enabled for all tracking calls during development
- Analytics IDs are hardcoded (replace with environment variables for production)
- Defensive coding: All tracking wrapped in availability checks

## Presentation System

The `docs/` folder contains a **Reveal.js presentation** about analytics implementation:

### Key Presentation Features
- **Black/white design** with syntax-highlighted code
- **Vertical centering** with aggressive CSS overrides for Reveal.js
- **GitHub permalinks** to actual code examples in the repository
- **Real implementation examples** showing custom properties usage

### Presentation Development
- Modify `docs/index.html` for content changes
- Code examples should reference actual line numbers in the codebase
- Presentation is served statically (no build process required)

## Page Structure & Event Examples

### HomePage.tsx
- **Button engagement**: `button_click` with click counts and session data
- **E-commerce demo**: `purchase` event with GA4 e-commerce parameters
- **Sign-up flow**: `sign_up` event with method tracking

### AboutPage.tsx  
- **Feedback collection**: `feedback_submitted` with rating values
- **Video engagement**: `video_start` with provider tracking
- **File downloads**: `file_download` with file metadata
- **Contact intent**: `contact_form_open` event

### ComparisonPage.tsx
Demonstrates three tracking approaches side-by-side with real-time testing

### CustomPropertiesPage.tsx
Advanced examples of custom properties for business analytics:
- User profile tracking with feature flags
- Content engagement with reading metrics
- Form interaction tracking with field-level data

## Code Modification Guidelines

### Adding New Events
1. Follow the naming convention: `snake_case` event names
2. Include relevant custom properties for business context
3. Add both GTM dataLayer and Clarity tracking calls
4. Update presentation examples if the event demonstrates a new pattern

### Analytics ID Management
- Analytics IDs are currently hardcoded in `index.html`
- For production: Use environment variables and build-time replacement
- Test IDs should be used during development

### Tracking Function Updates
- Always check for `window` availability (SSR safety)
- Console log tracking calls for debugging
- Handle missing analytics scripts gracefully
- Maintain TypeScript window interface declarations
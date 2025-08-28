import { useState } from 'react';
import { trackGTMEvent } from '../utils/tracking';

export default function CustomPropertiesPage() {
  const [formData, setFormData] = useState({
    userId: 'user_' + Math.random().toString(36).substr(2, 9),
    userType: 'premium',
    contentId: 'article_123',
    contentType: 'blog_post'
  });

  // Example 1: User Properties
  const handleUserEvent = () => {
    trackGTMEvent('user_profile_update', {
      // User properties (automatically associated with user)
      user_id: formData.userId,
      user_properties: {
        account_type: formData.userType,
        subscription_level: 'premium',
        account_created_date: '2024-01-01',
        total_purchases: 5,
        lifetime_value: 499.99,
        preferred_language: 'en',
        notification_preferences: {
          email: true,
          push: false,
          sms: true
        }
      }
    });
  };

  // Example 2: Content Engagement with Custom Properties
  const handleContentEvent = () => {
    trackGTMEvent('content_engagement', {
      // Standard parameters
      engagement_time_msec: 30000,
      
      // Custom content properties
      content_id: formData.contentId,
      content_type: formData.contentType,
      content_category: 'technology',
      author_id: 'author_456',
      publish_date: '2024-11-01',
      word_count: 1500,
      reading_time_minutes: 6,
      content_tags: ['javascript', 'analytics', 'tutorial'],
      
      // Engagement metrics
      scroll_depth_percentage: 75,
      time_on_page_seconds: 120,
      interactions: {
        likes: 0,
        shares: 0,
        comments: 0,
        bookmarks: 1
      },
      
      // Context
      referrer_source: document.referrer || 'direct',
      entry_point: 'search',
      device_category: 'desktop',
      browser_name: navigator.userAgent.split(' ').pop(),
      connection_type: (navigator as any).connection?.effectiveType || 'unknown'
    });
  };

  // Example 3: Custom Business Event
  const handleBusinessEvent = () => {
    trackGTMEvent('feature_usage', {
      // Feature-specific properties
      feature_name: 'advanced_analytics',
      feature_version: '2.0',
      action_type: 'export_data',
      
      // Usage context
      usage_context: {
        workspace_id: 'ws_789',
        project_id: 'proj_456',
        team_size: 10,
        plan_type: 'enterprise'
      },
      
      // Performance metrics
      performance: {
        load_time_ms: 250,
        api_response_time_ms: 180,
        data_size_kb: 1024,
        success: true,
        error_code: null
      },
      
      // Custom flags
      flags: {
        is_trial: false,
        is_admin: true,
        has_integration: true,
        ab_test_group: 'control'
      },
      
      // Nested JSON data (will be stringified in GA4)
      metadata: JSON.stringify({
        filters_applied: ['date_range', 'user_segment'],
        export_format: 'csv',
        row_count: 5000
      })
    });
  };

  // Example 4: Form Tracking with Field-level Detail
  const handleFormEvent = () => {
    trackGTMEvent('form_interaction', {
      form_id: 'contact_form',
      form_name: 'Contact Us',
      
      // Field-level tracking
      field_interactions: {
        name: { filled: true, changed: 2, time_spent_sec: 5 },
        email: { filled: true, changed: 1, time_spent_sec: 8 },
        message: { filled: true, changed: 3, time_spent_sec: 45 }
      },
      
      // Validation
      validation_errors: [],
      submit_attempt_count: 1,
      
      // Form context
      form_location: 'custom_properties_page',
      form_variant: 'long_form',
      prefilled_fields: ['email'],
      
      // Timing
      form_start_time: new Date(Date.now() - 60000).toISOString(),
      form_submit_time: new Date().toISOString(),
      total_time_seconds: 60
    });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#fafafa' }}>Custom Properties Examples</h1>
      <p style={{ color: '#a1a1aa', marginBottom: '2rem' }}>
        Demonstrate rich custom properties that can be sent with events
      </p>

      {/* Configuration */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#fafafa' }}>Configuration</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>User ID:</label>
            <input 
              type="text" 
              value={formData.userId}
              onChange={(e) => setFormData({...formData, userId: e.target.value})}
              style={{ 
                width: '100%', 
                padding: '0.5rem',
                backgroundColor: '#27272a',
                border: '1px solid #3f3f46',
                borderRadius: '0.375rem',
                color: '#fafafa'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>User Type:</label>
            <select 
              value={formData.userType}
              onChange={(e) => setFormData({...formData, userType: e.target.value})}
              style={{ 
                width: '100%', 
                padding: '0.5rem',
                backgroundColor: '#27272a',
                border: '1px solid #3f3f46',
                borderRadius: '0.375rem',
                color: '#fafafa'
              }}
            >
              <option value="free">Free</option>
              <option value="premium">Premium</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        </div>
      </div>

      {/* Event Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card">
          <h3 style={{ color: '#fafafa' }}>User Properties</h3>
          <p style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>
            Track user attributes and preferences
          </p>
          <button onClick={handleUserEvent} style={{ marginTop: '1rem' }}>
            Send User Properties
          </button>
          <pre style={{ marginTop: '1rem', fontSize: '0.75rem' }}>
{`{
  user_id: "${formData.userId}",
  account_type: "${formData.userType}",
  subscription_level: "premium",
  total_purchases: 5,
  lifetime_value: 499.99
}`}
          </pre>
        </div>

        <div className="card">
          <h3 style={{ color: '#fafafa' }}>Content Engagement</h3>
          <p style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>
            Rich content interaction tracking
          </p>
          <button onClick={handleContentEvent} style={{ marginTop: '1rem' }}>
            Track Content Event
          </button>
          <pre style={{ marginTop: '1rem', fontSize: '0.75rem' }}>
{`{
  content_id: "${formData.contentId}",
  content_type: "${formData.contentType}",
  word_count: 1500,
  scroll_depth: 75,
  reading_time: 6,
  tags: ["js", "analytics"]
}`}
          </pre>
        </div>

        <div className="card">
          <h3 style={{ color: '#fafafa' }}>Business Metrics</h3>
          <p style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>
            Feature usage and performance data
          </p>
          <button onClick={handleBusinessEvent} style={{ marginTop: '1rem' }}>
            Track Feature Usage
          </button>
          <pre style={{ marginTop: '1rem', fontSize: '0.75rem' }}>
{`{
  feature_name: "analytics",
  workspace_id: "ws_789",
  load_time_ms: 250,
  ab_test_group: "control",
  metadata: {...}
}`}
          </pre>
        </div>

        <div className="card">
          <h3 style={{ color: '#fafafa' }}>Form Analytics</h3>
          <p style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>
            Detailed form interaction tracking
          </p>
          <button onClick={handleFormEvent} style={{ marginTop: '1rem' }}>
            Track Form Event
          </button>
          <pre style={{ marginTop: '1rem', fontSize: '0.75rem' }}>
{`{
  form_id: "contact",
  field_interactions: {
    name: {filled: true},
    email: {time: 8}
  },
  total_time: 60
}`}
          </pre>
        </div>
      </div>

      {/* GA4 Limits Info */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#fafafa' }}>📊 GA4 Custom Property Limits</h3>
        <ul>
          <li><strong>Event parameters:</strong> 25 per event (unlimited unique names)</li>
          <li><strong>User properties:</strong> 25 per project</li>
          <li><strong>Parameter value length:</strong> 100 characters</li>
          <li><strong>Parameter name length:</strong> 40 characters</li>
          <li><strong>User property name:</strong> 24 characters</li>
          <li><strong>Items array:</strong> 200 items max per event</li>
        </ul>
        
        <h4 style={{ color: '#fafafa', marginTop: '1rem' }}>Reserved Parameter Names (Automatically Processed):</h4>
        <code style={{ display: 'block', marginTop: '0.5rem' }}>
          page_location, page_referrer, page_title, screen_name, currency, value, 
          transaction_id, items, user_id, user_properties, event_category, event_label
        </code>

        <h4 style={{ color: '#fafafa', marginTop: '1rem' }}>Custom Dimensions Setup:</h4>
        <p style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>
          To use custom properties in GA4 reports:
        </p>
        <ol style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>
          <li>GA4 → Admin → Custom definitions</li>
          <li>Create custom dimension for each parameter</li>
          <li>Wait 24-48 hours for data to appear in reports</li>
          <li>Use in explorations and audiences</li>
        </ol>
      </div>

      {/* BigQuery Schema */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <h3 style={{ color: '#fafafa' }}>🗄️ BigQuery Schema</h3>
        <p style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>
          Custom properties appear in BigQuery as:
        </p>
        <pre style={{ fontSize: '0.75rem' }}>
{`event_params: [
  {
    key: "custom_property_name",
    value: {
      string_value: "text",
      int_value: 123,
      float_value: 45.67,
      double_value: 89.01
    }
  }
]`}
        </pre>
      </div>
    </div>
  );
}
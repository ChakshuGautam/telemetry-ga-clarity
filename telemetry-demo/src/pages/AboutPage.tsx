import { useState } from 'react';
import { trackGTMEvent, trackClarityCustomEvent } from '../utils/tracking';

export default function AboutPage() {
  const [feedbackScore, setFeedbackScore] = useState<number | null>(null);
  const [videoPlayed, setVideoPlayed] = useState(false);

  const handleFeedback = (score: number) => {
    setFeedbackScore(score);
    
    trackGTMEvent('feedback_submitted', {
      event_category: 'engagement',
      event_label: 'about_page_feedback',
      value: score,
    });
    
    trackClarityCustomEvent('FeedbackScore', { 
      page: 'about',
      score: score 
    });
  };

  const handleVideoPlay = () => {
    if (!videoPlayed) {
      setVideoPlayed(true);
      
      trackGTMEvent('video_start', {
        video_title: 'About Us Demo Video',
        video_provider: 'demo',
        event_category: 'video',
      });
      
      trackClarityCustomEvent('VideoEngagement', { 
        page: 'about',
        action: 'play',
        videoId: 'demo_video_1' 
      });
    }
  };

  const handleDownload = () => {
    trackGTMEvent('file_download', {
      file_name: 'company_brochure.pdf',
      file_extension: 'pdf',
      event_category: 'downloads',
    });
    
    trackClarityCustomEvent('DownloadBrochure', { 
      page: 'about',
      fileType: 'pdf' 
    });
  };

  const handleContactClick = () => {
    trackGTMEvent('contact_form_open', {
      event_category: 'engagement',
      event_label: 'about_page_contact',
    });
    
    trackClarityCustomEvent('ContactIntent', { 
      page: 'about',
      source: 'button_click' 
    });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#fafafa' }}>About Page</h1>
      <p style={{ color: '#a1a1aa', marginBottom: '2rem' }}>Learn more about our telemetry demo and how we track user interactions.</p>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#fafafa' }}>Rate Your Experience</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              onClick={() => handleFeedback(score)}
              className={feedbackScore === score ? '' : 'secondary'}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '1rem'
              }}
            >
              {score}⭐
            </button>
          ))}
        </div>
        {feedbackScore && (
          <p style={{ marginTop: '1rem', color: '#a1a1aa' }}>
            Thank you for rating us {feedbackScore} stars!
          </p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <button 
          onClick={handleVideoPlay}
          className={videoPlayed ? 'secondary' : ''}
        >
          {videoPlayed ? 'Video Played ✓' : 'Play Demo Video'}
        </button>
        
        <button 
          onClick={handleDownload}
          className="secondary"
        >
          Download Brochure
        </button>
        
        <button 
          onClick={handleContactClick}
          className="secondary"
        >
          Contact Us
        </button>
      </div>
      
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#fafafa' }}>Additional Events on This Page:</h3>
        <ul>
          <li>Feedback/Rating submissions</li>
          <li>Video engagement tracking</li>
          <li>File download tracking</li>
          <li>Contact form interactions</li>
          <li>Custom user journey milestones</li>
        </ul>
      </div>
    </div>
  );
}
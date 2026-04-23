'use client';

import Script from 'next/script';
import { useSiteMode } from './SiteModeProvider';
import { codegym } from '@/lib/site-data';

export function GlobalWidgets() {
  const { isPulse } = useSiteMode();

  if (!isPulse) return null;

  // Universal script: auto-injects all enabled widgets including the floating AI Chat
  // The loader reads which widgets are enabled from the gym's website_widget_config
  // and injects them based on the gym slug + widget key
  return (
    <>
      <Script
        src={`${codegym.baseUrl}/widgets/loader.js`}
        strategy="lazyOnload"
        id="codegym-universal-loader"
        data-gym={codegym.gymSlug}
        data-key={codegym.widgetKey}
      />
      {/* Inline fallback: render the AI Chat iframe directly so it always appears
          even if the loader script hasn't registered a chat widget yet */}
      <div
        id="codegym-chat-float"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 9999,
          width: '380px',
          maxWidth: 'calc(100vw - 2rem)',
        }}
      >
        <iframe
          src={`${codegym.baseUrl}/widgets/chat/${codegym.gymSlug}?embed=1&float=1`}
          style={{
            width: '100%',
            height: '520px',
            border: 'none',
            borderRadius: '20px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
            background: 'transparent',
          }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          allow="clipboard-write"
          title="AI Assistant"
        />
      </div>
    </>
  );
}

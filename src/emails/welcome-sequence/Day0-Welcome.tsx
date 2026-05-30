import * as React from 'react';

export default function Day0Welcome() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#111', lineHeight: '1.6' }}>
      <h2>Welcome to the Vault. Here is your Checklist.</h2>
      <p>Hey,</p>
      <p>Dre here. As promised, here is your 30-Day Mold Detox Checklist. You can download the PDF directly below:</p>
      <div style={{ margin: '30px 0' }}>
        <a 
          href="https://doseofproof.com/assets/30-day-mold-detox-checklist.pdf"
          style={{
            backgroundColor: '#000',
            color: '#fff',
            padding: '12px 24px',
            textDecoration: 'none',
            fontWeight: 'bold',
            borderRadius: '4px'
          }}
        >
          Download the Checklist
        </a>
      </div>
      <p>This checklist is the exact sequence of operations I used to open my drainage pathways and safely bind mycotoxins without crashing my system.</p>
      <p>Over the next two weeks, I'm going to send you the exact lab tests, protocols, and specialists that saved my life after the standard medical system told me I was "just anxious."</p>
      <p>Stay strong.</p>
      <p>- Dre</p>
    </div>
  );
}

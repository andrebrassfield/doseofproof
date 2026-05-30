import * as React from 'react';

export default function Day2CIRSPanel() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#111', lineHeight: '1.6' }}>
      <h2>What the CIRS panel actually tests for</h2>
      <p>Hey,</p>
      <p>If you've ever been told "your labs look normal" while you feel like your body is shutting down, this email is for you.</p>
      <p>Standard bloodwork (like a CBC or CMP) is designed to detect acute pathology. If your liver isn't failing right now, your labs will look "fine." But chronic illness lives in the optimal vs. sub-optimal gray area. It's an immune system failure.</p>
      <p>The CIRS (Chronic Inflammatory Response Syndrome) panel looks at entirely different markers:</p>
      <ul>
        <li><strong>TGF-beta 1:</strong> A marker of innate immune system hyper-reactivity.</li>
        <li><strong>C4a:</strong> Shows active inflammation in the bloodstream.</li>
        <li><strong>MSH:</strong> The master hormone that regulates sleep, pain, and gut permeability. In mold toxicity, this plummets.</li>
      </ul>
      <p>If you want the full list of tests you need to prove your illness, check out the guide below:</p>
      <div style={{ margin: '30px 0' }}>
        <a 
          href="https://doseofproof.com/products/doctors-miss-guide"
          style={{
            backgroundColor: '#000',
            color: '#fff',
            padding: '12px 24px',
            textDecoration: 'none',
            fontWeight: 'bold',
            borderRadius: '4px'
          }}
        >
          Get The "What Doctors Miss" Guide
        </a>
      </div>
      <p>Stop guessing. Get the data.</p>
      <p>- Dre</p>
    </div>
  );
}

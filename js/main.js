/* =========================================
   DOSE OF PROOF — SITE JS
   ========================================= */

// ---- NAV MOBILE TOGGLE ----
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
}

// ---- EMAIL CAPTURE FORMS ----
function setupSubscribeForm(formId, successId, errorId, emailInputId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailEl = document.getElementById(emailInputId) || form.querySelector('input[type="email"]');
    const email = emailEl?.value?.trim();
    const btn = form.querySelector('button[type="submit"]');
    const successEl = document.getElementById(successId);
    const errorEl = document.getElementById(errorId);

    if (!email) return;

    // Loading state
    if (btn) { btn.disabled = true; btn.textContent = 'Subscribing...'; }
    if (errorEl) errorEl.classList.remove('show');
    if (errorEl) errorEl.textContent = '';

    try {
      // Beehiiv API — add your Publication ID below
      // Find it at: beehiiv.com > Settings > API > Publication ID
      const PUBLICATION_ID = 'pub_e9111913-d881-4b5f-8ff4-259942c787d3';
      const response = await fetch(`https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer DlqVEKCSqTDOxCwVmfMYrN7r1EUbb340e2JvxNi1KgJNZE4ZJdc0dxo2hPrnLjiD'
        },
        body: JSON.stringify({
          email: email,
          publication_id: PUBLICATION_ID,
          source: 'doseofproof.com',
          tags: []
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        if (successEl) {
          successEl.classList.add('show');
          successEl.textContent = '✓ You\'re in. Check your inbox for the confirmation.';
        }
        form.reset();
        // Redirect to Beehiiv confirmation page
        window.location.href = 'https://doseofproof.com/welcome';
      } else if (response.status === 409) {
        // Already subscribed
        if (successEl) {
          successEl.classList.add('show');
          successEl.textContent = '✓ Already subscribed. You\'re on the list.';
        }
      } else {
        throw new Error(data.message || 'Subscription failed');
      }
    } catch (err) {
      console.error('Subscribe error:', err);
      if (errorEl) {
        errorEl.textContent = 'Something went wrong. Try again or email hello@doseofproof.com';
        errorEl.classList.add('show');
      }
      if (btn) { btn.disabled = false; btn.textContent = 'Subscribe free →'; }
    }
  });
}

// Set up all forms
setupSubscribeForm('subscribeForm', 'formSuccess', 'formError', 'emailInput');
setupSubscribeForm('subscribeForm2', 'formSuccess2', 'formError2');
setupSubscribeForm('subscribeFormMain', 'formSuccess', 'formError', 'emailInput');

// ---- ARTICLE FILTER ----
const filterBtns = document.querySelectorAll('.filter-btn');
const articleCards = document.querySelectorAll('.article-card');

if (filterBtns.length && articleCards.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      articleCards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ---- ARTICLE PAGE ESTIMATED READ TIME ----
// Auto-calculated from word count (shown via CSS [data-read] attribute)
// Simple word count for display on article pages
document.querySelectorAll('.article-body').forEach(body => {
  const text = body.innerText || body.textContent || '';
  const words = text.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / 200);
  const metaEl = document.querySelector('.article-read-time');
  if (metaEl && readTime > 0) {
    metaEl.textContent = `${readTime} min read`;
  }
});

// ---- SCROLL ANIMATIONS (subtle fade-in) ----
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .expect-item, .article-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  fadeObserver.observe(el);
});

// ---- COPY URL FOR ARTICLE SHARE ----
// Not implemented — add twitter/linkedin share buttons as needed

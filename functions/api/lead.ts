interface Env {
  RESEND_API_KEY: string;
  LEAD_EMAIL: string;
}

export async function onRequestPost(context: { request: Request, env: Env }) {
  const { request, env } = context;

  try {
    const { email } = await request.json() as { email?: string };

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
    }

    if (!env.RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), { status: 500 });
    }

    // 1. Send the email to the user with the link to the PDF
    const userEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Dose of Proof <noreply@doseofproof.com>',
        to: email,
        subject: 'Your First 30 Days Mold Detox Checklist',
        html: `
          <h1>Your checklist is ready.</h1>
          <p>Thank you for requesting The First 30 Days Mold Detox Checklist.</p>
          <p><strong><a href="https://doseofproof.com/marketing-assets/The_First_30_Days_Mold_Detox_Checklist.pdf">Click here to download your PDF</a></strong></p>
          <br/>
          <p>This is my experience. Not medical advice.</p>
          <p>- Dre</p>
        `
      })
    });

    if (!userEmailRes.ok) {
      console.error('Resend error:', await userEmailRes.text());
      return new Response(JSON.stringify({ error: 'Failed to send user email' }), { status: 500 });
    }

    // 2. Notify Andre (if LEAD_EMAIL is set)
    if (env.LEAD_EMAIL) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Dose of Proof <noreply@doseofproof.com>',
          to: env.LEAD_EMAIL,
          subject: `New lead: ${email}`,
          html: `<p>New checklist download requested by: <strong>${email}</strong></p>`
        })
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string;
}

export async function onRequestPost(context: { request: Request, env: Env }) {
  const { request, env } = context;

  try {
    const { name, email, message } = await request.json() as { name?: string, email?: string, message?: string };

    if (!name || !email || !message || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
    }

    if (!env.RESEND_API_KEY || !env.CONTACT_EMAIL) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY or CONTACT_EMAIL not configured' }), { status: 500 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Dose of Proof Contact <noreply@doseofproof.com>',
        to: env.CONTACT_EMAIL,
        subject: `Contact from ${name}`,
        reply_to: email,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `
      })
    });

    if (!res.ok) {
      console.error('Resend error:', await res.text());
      return new Response(JSON.stringify({ error: 'Failed to send contact email' }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

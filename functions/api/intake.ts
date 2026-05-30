interface Env {
  RESEND_API_KEY: string;
  LEAD_EMAIL: string;
}

export async function onRequestPost(context: { request: Request, env: Env }) {
  const { request, env } = context;

  try {
    const { name, email, condition, symptoms, labs_done, what_tried, goals } = await request.json() as any;

    if (!name || !email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid name or email' }), { status: 400 });
    }

    if (!env.RESEND_API_KEY || !env.LEAD_EMAIL) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY or LEAD_EMAIL not configured' }), { status: 500 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Dose of Proof Intake <noreply@doseofproof.com>',
        to: env.LEAD_EMAIL,
        subject: `NEW CLIENT INTAKE: ${name}`,
        reply_to: email,
        html: `
          <h2>New Coaching Intake</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <br/>
          <p><strong>Condition/Diagnosis:</strong><br/>${condition || 'N/A'}</p>
          <br/>
          <p><strong>Primary Symptoms:</strong><br/>${symptoms || 'N/A'}</p>
          <br/>
          <p><strong>Labs Done:</strong><br/>${labs_done || 'N/A'}</p>
          <br/>
          <p><strong>What They've Tried:</strong><br/>${what_tried || 'N/A'}</p>
          <br/>
          <p><strong>Goals:</strong><br/>${goals || 'N/A'}</p>
        `
      })
    });

    if (!res.ok) {
      console.error('Resend error:', await res.text());
      return new Response(JSON.stringify({ error: 'Failed to send intake email' }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

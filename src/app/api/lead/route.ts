import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string };

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const resendAudienceId = process.env.RESEND_AUDIENCE_ID;
    const leadEmail = process.env.LEAD_EMAIL;

    if (!resendApiKey) {
      return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 500 });
    }

    // 1. Send the email to the user with the link to the PDF
    const userEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Dose of Proof <noreply@doseofproof.com>",
        to: email,
        subject: "Your First 30 Days Mold Detox Checklist",
        html: `
          <h1>Your checklist is ready.</h1>
          <p>Thank you for requesting The First 30 Days Mold Detox Checklist.</p>
          <p><strong><a href="https://doseofproof.com/marketing-assets/The_First_30_Days_Mold_Detox_Checklist.pdf">Click here to download your PDF</a></strong></p>
          <br/>
          <p>This is my experience. Not medical advice.</p>
          <p>- Dre</p>
        `,
      }),
    });

    if (!userEmailRes.ok) {
      console.error("Resend error:", await userEmailRes.text());
      return NextResponse.json({ error: "Failed to send user email" }, { status: 500 });
    }

    // 2. Add to Audience (Newsletter)
    if (resendAudienceId) {
      try {
        await fetch(`https://api.resend.com/audiences/${resendAudienceId}/contacts`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            unsubscribed: false,
          }),
        });
      } catch (audienceErr) {
        console.error("Resend Audience addition error:", audienceErr);
      }
    }

    // 3. Notify Dre (if LEAD_EMAIL is set)
    if (leadEmail) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Dose of Proof <noreply@doseofproof.com>",
            to: leadEmail,
            subject: `New lead: ${email}`,
            html: `<p>New checklist download requested by: <strong>${email}</strong></p>`,
          }),
        });
      } catch (notifyErr) {
        console.error("Admin notification error:", notifyErr);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

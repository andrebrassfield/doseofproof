import { NextResponse } from "next/server";

const magnetDetails: Record<string, { title: string; pdfUrl: string; tag: string }> = {
  "start-here": {
    title: "30-Day Symptom Mapping Checklist",
    pdfUrl: "https://doseofproof.com/marketing-assets/The_First_30_Days_Mold_Detox_Checklist.pdf",
    tag: "magnet_start_here"
  },
  "testing": {
    title: "The Tests Your Doctor Won't Order (PDF + Notion template)",
    pdfUrl: "https://doseofproof.com/marketing-assets/The_First_30_Days_Mold_Detox_Checklist.pdf",
    tag: "magnet_testing"
  },
  "protocol": {
    title: "Protocol Vault Starter Kit (Notion + Airtable bases)",
    pdfUrl: "https://doseofproof.com/marketing-assets/The_First_30_Days_Mold_Detox_Checklist.pdf",
    tag: "magnet_protocol"
  },
  "mold": {
    title: "Mold Exposure Audit Workbook",
    pdfUrl: "https://doseofproof.com/marketing-assets/The_First_30_Days_Mold_Detox_Checklist.pdf",
    tag: "magnet_mold"
  },
  "cci": {
    title: "Cervical Imaging Decision Tree",
    pdfUrl: "https://doseofproof.com/marketing-assets/The_First_30_Days_Mold_Detox_Checklist.pdf",
    tag: "magnet_cci"
  }
};

export async function POST(request: Request) {
  try {
    const { email, magnet } = (await request.json()) as { email?: string; magnet?: string };

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const resendAudienceId = process.env.RESEND_AUDIENCE_ID;
    const leadEmail = process.env.LEAD_EMAIL;

    if (!resendApiKey) {
      return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 500 });
    }

    const details = magnetDetails[magnet || ""] || {
      title: "Mold Detox Checklist",
      pdfUrl: "https://doseofproof.com/marketing-assets/The_First_30_Days_Mold_Detox_Checklist.pdf",
      tag: "magnet_general"
    };

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
        subject: `Your Download: ${details.title}`,
        html: `
          <h1>Your guide is ready.</h1>
          <p>Thank you for requesting: <strong>${details.title}</strong>.</p>
          <p><strong><a href="${details.pdfUrl}">Click here to download your PDF</a></strong></p>
          <br/>
          <p>This documents my experience. Not medical advice.</p>
          <p>- Dre</p>
        `,
      }),
    });

    if (!userEmailRes.ok) {
      console.error("Resend error:", await userEmailRes.text());
      return NextResponse.json({ error: "Failed to send user email" }, { status: 500 });
    }

    // 2. Add to Audience (Newsletter) with segment tags
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
            custom_fields: {
              magnet: magnet || "general",
              tag: details.tag
            }
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
            subject: `New Lead [${magnet || "general"}]: ${email}`,
            html: `<p>New lead registered for: <strong>${details.title}</strong> by: <strong>${email}</strong></p>`,
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

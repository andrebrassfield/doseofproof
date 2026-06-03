import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, condition, symptoms, labs_done, what_tried, goals } =
      (await request.json()) as any;

    if (!name || !email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid name or email" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const leadEmail = process.env.LEAD_EMAIL;

    if (!resendApiKey || !leadEmail) {
      return NextResponse.json(
        { error: "RESEND_API_KEY or LEAD_EMAIL not configured" },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Dose of Proof Intake <noreply@doseofproof.com>",
        to: leadEmail,
        subject: `NEW CLIENT INTAKE: ${name}`,
        reply_to: email,
        html: `
          <h2>New Coaching Intake</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <br/>
          <p><strong>Condition/Diagnosis:</strong><br/>${condition || "N/A"}</p>
          <br/>
          <p><strong>Primary Symptoms:</strong><br/>${symptoms || "N/A"}</p>
          <br/>
          <p><strong>Labs Done:</strong><br/>${labs_done || "N/A"}</p>
          <br/>
          <p><strong>What They've Tried:</strong><br/>${what_tried || "N/A"}</p>
          <br/>
          <p><strong>Goals:</strong><br/>${goals || "N/A"}</p>
        `,
      }),
    });

    if (!res.ok) {
      console.error("Resend error:", await res.text());
      return NextResponse.json({ error: "Failed to send intake email" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Intake API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title") || "Dose of Proof";
    const category = searchParams.get("category") || "PROTOCOL";
    const description = searchParams.get("description") || "Not selling. Just proving.";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#050508",
            backgroundImage: "radial-gradient(circle at 75% 25%, #0d1527 0%, #050508 70%)",
            fontFamily: "sans-serif",
            padding: "80px",
            boxSizing: "border-box",
            border: "8px solid #11111a",
          }}
        >
          {/* Top Row: Category and Site Name */}
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(0, 212, 255, 0.1)",
                border: "1px solid rgba(0, 212, 255, 0.3)",
                padding: "8px 16px",
                borderRadius: "9999px",
              }}
            >
              <span
                style={{
                  color: "#00d4ff",
                  fontSize: "14px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                }}
              >
                {category}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "20px",
                  fontWeight: "bold",
                  letterSpacing: "-0.02em",
                }}
              >
                Dose of Proof
              </span>
            </div>
          </div>

          {/* Middle: Title & Description */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "40px" }}>
            <h1
              style={{
                fontSize: "56px",
                color: "#ffffff",
                fontWeight: "900",
                letterSpacing: "-0.03em",
                lineHeight: "1.15",
                margin: "0",
                padding: "0",
                maxWidth: "950px",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "22px",
                color: "#8a99ad",
                fontWeight: "400",
                lineHeight: "1.5",
                margin: "0",
                padding: "0",
                maxWidth: "850px",
              }}
            >
              {description}
            </p>
          </div>

          {/* Bottom Row: Accent Graphics and Tagline */}
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              paddingTop: "32px",
              marginTop: "40px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#22c55e" }}></div>
              <span style={{ color: "#22c55e", fontSize: "14px", fontWeight: "bold", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                VERIFIED PATHWAY
              </span>
            </div>
            <span style={{ color: "rgba(255, 255, 255, 0.3)", fontSize: "14px", letterSpacing: "0.05em" }}>
              doseofproof.com
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("OG generation error:", error);
    return new Response(`Failed to generate image`, { status: 500 });
  }
}

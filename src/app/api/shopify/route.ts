import { NextRequest, NextResponse } from "next/server";
import { shopifyClient } from "@/lib/shopify/client";
import { GET_PRODUCTS, GET_PRODUCT_BY_HANDLE, CREATE_CHECKOUT } from "@/lib/shopify/queries";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const handle = searchParams.get("handle");

  try {
    switch (action) {
      case "products": {
        const data = await shopifyClient.request(GET_PRODUCTS, { first: 20 });
        return NextResponse.json(data);
      }
      case "product": {
        if (!handle) return NextResponse.json({ error: "Handle required" }, { status: 400 });
        const data = await shopifyClient.request(GET_PRODUCT_BY_HANDLE, { handle });
        return NextResponse.json(data);
      }
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Shopify API error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { variantId, quantity = 1 } = body;

    if (!variantId) {
      return NextResponse.json({ error: "Variant ID required" }, { status: 400 });
    }

    const data = await shopifyClient.request(CREATE_CHECKOUT, {
      input: {
        lineItems: [{ variantId, quantity }],
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Checkout creation failed" }, { status: 500 });
  }
}

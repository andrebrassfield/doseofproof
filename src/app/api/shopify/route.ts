import { NextRequest, NextResponse } from "next/server";
import { shopifyFetch, GET_PRODUCTS, GET_PRODUCT_BY_HANDLE, CREATE_CART, ADD_TO_CART } from "@/lib/shopify/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const handle = searchParams.get("handle");

  try {
    switch (action) {
      case "products": {
        const data = await shopifyFetch<{ products: { edges: { node: unknown }[] } }>(
          GET_PRODUCTS,
          { first: 20 }
        );
        return NextResponse.json(data);
      }
      case "product": {
        if (!handle) return NextResponse.json({ error: "Handle required" }, { status: 400 });
        const data = await shopifyFetch<{ productByHandle: unknown }>(
          GET_PRODUCT_BY_HANDLE,
          { handle }
        );
        return NextResponse.json(data);
      }
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Shopify API error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { variantId, quantity = 1, cartId } = body;

    if (!variantId) {
      return NextResponse.json({ error: "Variant ID required" }, { status: 400 });
    }

    if (cartId) {
      const data = await shopifyFetch<{ cartLinesAdd: { cart: { id: string; checkoutUrl: string } } }>(
        ADD_TO_CART,
        {
          cartId,
          lines: [{ merchandiseId: variantId, quantity }],
        }
      );
      return NextResponse.json(data.cartLinesAdd.cart);
    }

    const data = await shopifyFetch<{ cartCreate: { cart: { id: string; checkoutUrl: string } } }>(
      CREATE_CART,
      {
        input: {
          lines: [{ merchandiseId: variantId, quantity }],
        },
      }
    );
    return NextResponse.json(data.cartCreate.cart);
  } catch {
    return NextResponse.json({ error: "Cart creation failed" }, { status: 500 });
  }
}

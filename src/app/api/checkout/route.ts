import { NextRequest, NextResponse } from "next/server";

// Product variant mapping (replace with actual Shopify variant IDs)
const PRODUCT_VARIANTS: Record<string, string> = {
  "peptide-protocol-database": "gid://shopify/ProductVariant/PEPTIDE_DB_MONTHLY",
  "30-day-mold-detox": "gid://shopify/ProductVariant/MOLD_DETOX_30DAY",
  "doctors-miss-guide": "gid://shopify/ProductVariant/DOCTORS_MISS_GUIDE",
  "protocol-vault": "gid://shopify/ProductVariant/PROTOCOL_VAULT_ANNUAL",
};

// Shopify checkout URL template
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const SHOPIFY_CHECKOUT_URL = `https://${SHOPIFY_STORE_DOMAIN}/cart`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const product = searchParams.get("product");

  if (!product || !PRODUCT_VARIANTS[product]) {
    return NextResponse.redirect(new URL("/shop", request.url));
  }

  // For now, redirect to Shopify checkout with the variant
  // In production, this would use the Storefront API to create a checkout
  const variantId = PRODUCT_VARIANTS[product];
  
  // Redirect to Shopify checkout
  const checkoutUrl = `${SHOPIFY_CHECKOUT_URL}/${variantId}:1`;
  
  return NextResponse.redirect(checkoutUrl);
}

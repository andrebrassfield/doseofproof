import { GraphQLClient } from "graphql-request";

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || "";

if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
  console.warn("Shopify credentials not configured. Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN");
}

export const shopifyClient = new GraphQLClient(
  `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
  {
    headers: {
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      "Content-Type": "application/json",
    },
  }
);

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        availableForSale: boolean;
        priceV2: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

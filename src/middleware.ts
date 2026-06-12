import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  // If request hits shop.doseofproof.com directly, redirect to path-based shop
  if (host === "shop.doseofproof.com") {
    url.host = "doseofproof.com";
    url.pathname = `/shop${url.pathname === "/" ? "" : url.pathname}`;
    return NextResponse.redirect(url, 301);
  }

  // Redirect legacy /blogs/[category]/[slug] to flat /blogs/[slug]
  // and legacy /blogs/[category] to /blogs/topics/[category]
  const pathParts = url.pathname.split("/").filter(Boolean);
  if (pathParts.length >= 2 && pathParts[0] === "blogs") {
    const legacyCategories = ["peptides", "mold-recovery", "cci", "mcas", "protocols", "supplements"];
    if (legacyCategories.includes(pathParts[1])) {
      if (pathParts.length === 3) {
        // Redirect legacy post: /blogs/peptides/some-slug -> /blogs/some-slug
        url.pathname = `/blogs/${pathParts[2]}`;
        return NextResponse.redirect(url, 301);
      } else if (pathParts.length === 2) {
        // Redirect legacy category list: /blogs/peptides -> /blogs/topics/peptides
        url.pathname = `/blogs/topics/${pathParts[1]}`;
        return NextResponse.redirect(url, 301);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

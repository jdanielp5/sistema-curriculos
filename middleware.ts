import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/sistema/paginas/curriculos")) {
    const novo = pathname.replace("/sistema/paginas/curriculos", "/curriculos/visualizar");
    return NextResponse.redirect(new URL(novo, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sistema/:path*"],
};
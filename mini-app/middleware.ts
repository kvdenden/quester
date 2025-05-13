import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/api/:path*"],
};

export default async function middleware(req: NextRequest) {
  //There has to be a better way to do this
  if (
    req.nextUrl.pathname === "/api/auth/sign-in" ||
    req.nextUrl.pathname.includes("/api/og") ||
    req.nextUrl.pathname.includes("/api/webhook") ||
    req.nextUrl.pathname.includes("/api/auth/csrf") ||
    req.nextUrl.pathname.includes("/api/auth/error") ||
    req.nextUrl.pathname.includes("/api/auth/session") ||
    req.nextUrl.pathname.includes("/api/auth/login") ||
    req.nextUrl.pathname.includes("/api/auth/callback") ||
    req.nextUrl.pathname.includes("/api/auth/signout") ||
    req.nextUrl.pathname.includes("/api/auth/providers") ||
    req.nextUrl.pathname.includes("/api/auth/csrf") ||
    req.nextUrl.pathname.includes("/api/auth/error") ||
    req.nextUrl.pathname.includes("/api/user-data") ||
    req.nextUrl.pathname.includes("/api/me")
  ) {
    return NextResponse.next();
  }

  // Get token from auth_token cookie
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 },
    );
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    // Verify the token using jose
    const { payload } = await jose.jwtVerify(token, secret);

    // Clone the request headers to add user info
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-fid", payload.fid as string);

    // Return response with modified headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

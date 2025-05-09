import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";
import { verifyMessage } from "viem";
import { fetchUser } from "@/lib/neynar";

export const POST = async (req: NextRequest) => {
  try {
    const { fid, signature, message } = await req.json();

    // Convert fid to string if it's a number
    const fidString = fid.toString();

    console.log("Attempting to fetch user with FID:", fidString);
    const user = await fetchUser(fidString);
    console.log("User fetched successfully:", user);

    // Verify signature matches custody address
    console.log("Verifying signature...");
    const isValidSignature = await verifyMessage({
      address: user.custody_address as `0x${string}`,
      message,
      signature,
    });

    if (!isValidSignature) {
      console.log("Invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Generate JWT token
    console.log("Generating JWT token...");
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jose.SignJWT({
      fid,
      walletAddress: user.custody_address,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    // Create the response
    const response = NextResponse.json({ success: true, user });

    // Set the auth cookie with the JWT token
    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
};

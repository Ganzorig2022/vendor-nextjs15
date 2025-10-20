import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const accessToken = body?.access_token || body?.token || "";

    if (!accessToken) {
      return NextResponse.json(
        { ok: false, message: "Missing access_token" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set({
      name: "access_token",
      value: accessToken,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Failed to set session cookie:", e);
    return NextResponse.json(
      { ok: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}

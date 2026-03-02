import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, currentLevel, interest, additionalInfo } = body;

    // Validate required fields
    if (!name || !email || !currentLevel || !interest) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // TODO: Send confirmation email via Resend
    // TODO: Add subscriber to ConvertKit / Mailchimp
    // TODO: Send webhook notification (e.g. Slack, Zapier)
    // TODO: Store application in database / Notion

    console.log("Application received:", {
      name,
      email,
      currentLevel,
      interest,
      additionalInfo,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

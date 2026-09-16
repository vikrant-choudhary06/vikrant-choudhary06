interface Env {
  RESEND_API_KEY?: string;
}

interface ContactPayload {
  name: string;
  email: string;
  scope?: string;
  brief: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

export const onRequestPost = async (context: PagesContext): Promise<Response> => {
  try {
    const { request, env } = context;
    const body = (await request.json()) as ContactPayload;

    // Validate required fields
    if (!body.name || !body.email || !body.brief) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, and brief are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "RESEND_API_KEY is not configured in Cloudflare Pages Environment Variables.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Call Resend REST API
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Briefing <onboarding@resend.dev>",
        to: ["vikrantchoudhary06@gmail.com"],
        reply_to: body.email,
        subject: `⚡ New Project Briefing from ${body.name} [${body.scope || "General"}]`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 2px solid #000; border-radius: 12px; background: #fffdf7;">
            <div style="display: inline-block; padding: 4px 12px; background: #d2f4e3; border: 1px solid #136c47; border-radius: 9999px; font-size: 11px; font-weight: bold; color: #136c47; margin-bottom: 16px;">
              [ PROTOCOL BRIEFING RECEIVED ]
            </div>
            <h2 style="margin: 0 0 16px; color: #000; font-size: 22px; text-transform: uppercase; letter-spacing: 0.5px;">
              ⚡ New System Inquiry
            </h2>
            <div style="background: #ffffff; border: 2px solid #000; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
              <p style="margin: 0 0 8px; font-size: 14px;"><strong>Authority Contact:</strong> ${body.name}</p>
              <p style="margin: 0 0 8px; font-size: 14px;"><strong>Protocol Email:</strong> <a href="mailto:${body.email}" style="color: #0284c7; text-decoration: none;">${body.email}</a></p>
              <p style="margin: 0; font-size: 14px;"><strong>Automation Scope:</strong> ${body.scope || "Not Specified"}</p>
            </div>
            <div style="background: #ffffff; border: 2px solid #000; border-radius: 8px; padding: 16px;">
              <strong style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #52525b; display: block; margin-bottom: 8px;">
                // SYSTEM BRIEF
              </strong>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #18181b;">${body.brief}</p>
            </div>
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e4e4e7; font-size: 11px; color: #71717a; text-align: center;">
              Dispatched from Vikrant Choudhary's Portfolio Briefing Terminal // Mathura, IN
            </div>
          </div>
        `,
      }),
    });

    const data = await resendResponse.json();

    if (!resendResponse.ok) {
      return new Response(JSON.stringify(data), {
        status: resendResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ success: true, messageId: (data as { id?: string }).id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

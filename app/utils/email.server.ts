import { Resend } from "resend";

// Conditional Resend client - uses mock in dev if no API key
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  const isProduction = process.env.NODE_ENV === "production";

  // In dev without API key, use mock
  if (!isProduction && !apiKey) {
    return createMockResend();
  }

  // Use real Resend client
  return new Resend(apiKey);
};

// Type for Resend email payload (simplified)
interface ResendEmailPayload {
  from: string;
  to: string | string[];
  replyTo?: string;
  subject: string;
  html?: string;
  text?: string;
}

// Resend email response type (simplified)
interface ResendEmailResponse {
  data: {
    id: string;
    from: string;
    to: string[];
    created_at: string;
  };
  error: unknown;
}

// Mock Resend client for development
function createMockResend() {
  return {
    emails: {
      send: async (payload: ResendEmailPayload): Promise<ResendEmailResponse> => {
        // In dev, log the email instead of sending
        console.log("\n📧 [MOCK EMAIL] Would send email:");
        console.log("To:", payload.to);
        console.log("From:", payload.from);
        console.log("Subject:", payload.subject);
        console.log("Reply-To:", payload.replyTo);
        console.log("HTML:", payload.html);
        console.log("---\n");

        // Return a mock success response matching Resend's API
        // Use Promise.resolve to satisfy async requirement
        await Promise.resolve();
        
        return {
          data: {
            id: `mock-${Date.now()}`,
            from: payload.from,
            to: Array.isArray(payload.to) ? payload.to : [payload.to],
            created_at: new Date().toISOString(),
          },
          error: null,
        };
      },
    },
  };
}

const resend = getResendClient();

export interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function sendContactEmail(data: ContactEmailData) {
  const isMock = !process.env.RESEND_API_KEY && process.env.NODE_ENV !== "production";

  try {
    const result = await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || "chiryoenergie@gmail.com",
      to: process.env.CONTACT_EMAIL_TO || "chiryoenergie@gmail.com",
      replyTo: data.email,
      subject: `Nouveau message de contact de ${data.name}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Téléphone:</strong> ${data.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
      text: `
        Nouveau message de contact
        Nom: ${data.name}
        Email: ${data.email}
        Téléphone: ${data.phone}
        Message: ${data.message}
      `,
    });

    if (result.error) {
      console.error("Error sending email:", result.error);
      throw new Error("Failed to send email");
    }

    if (isMock) {
      console.log("✅ Email logged (dev mode - not sent)");
    }

    return result.data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}


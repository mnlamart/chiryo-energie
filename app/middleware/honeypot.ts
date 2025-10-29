import { createHoneypotMiddleware } from "remix-utils/middleware/honeypot";

export const [honeypotMiddleware, getHoneypotInputProps] =
  createHoneypotMiddleware({
    randomizeNameFieldName: true,
    nameFieldName: "name__confirm",
    validFromFieldName: "from__confirm",
    encryptionSeed: process.env.HONEYPOT_ENCRYPTION_SEED,

    onSpam(error) {
      console.warn("Spam detected:", error);
      // Return a generic error to avoid revealing the honeypot
      return new Response(
        JSON.stringify({ formErrors: ["Une erreur est survenue. Veuillez réessayer."] }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
  });


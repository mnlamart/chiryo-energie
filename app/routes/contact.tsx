import { useForm, getInputProps, getTextareaProps } from "@conform-to/react";
import { parseWithZod, getZodConstraint } from "@conform-to/zod/v4";
import { useActionData, data, useRouteLoaderData } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { z } from "zod";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import * as Toast from "@radix-ui/react-toast";
import Container from "../components/Container";
import Button from "../components/Button";
import { contactInfo } from "../data/content";
import { sendContactEmail } from "../utils/email.server";
import { useEffect, useState, useCallback } from "react";
import type { loader as rootLoader } from "../root";

// Zod v4 schema for contact form validation
const contactSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Le nom est requis"
          : "Le nom doit être une chaîne de caractères",
    })
    .min(1, { error: "Le nom est requis" }),
  email: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "L'email est requis"
          : "L'email doit être une chaîne de caractères",
    })
    .email({ error: "Veuillez entrer un email valide" }),
  phone: z
    .string({
      error: (issue) =>
        issue.input === undefined || issue.input === ""
          ? "Le numéro de téléphone est requis"
          : "Le numéro de téléphone doit être une chaîne de caractères",
    })
    .min(1, { error: "Le numéro de téléphone est requis" })
    .regex(
      /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
      { error: "Veuillez entrer un numéro de téléphone valide (format français)" }
    ),
  message: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Le message est requis"
          : "Le message doit être une chaîne de caractères",
    })
    .min(10, { error: "Le message doit contenir au moins 10 caractères" }),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: contactSchema,
  });

  if (submission.status !== "success") {
    return data(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  try {
    // Send email using Resend (or mock in dev)
    await sendContactEmail({
      name: submission.value.name,
      email: submission.value.email,
      phone: submission.value.phone,
      message: submission.value.message,
    });

    return data(
      {
        ...submission.reply({ resetForm: true }),
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return data(
      submission.reply({
        formErrors: ["Une erreur est survenue lors de l'envoi. Veuillez réessayer plus tard."],
      }),
      { status: 500 }
    );
  }
}

// Static components
const ContactHeader = () => (
  <header className="text-center mb-12">
    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
      Pour me contacter
    </h1>
    <p className="text-lg text-gray-600">
      N'hésitez pas à me contacter pour toute question ou pour prendre
      rendez-vous à Joué-Les-Tours, Tours ou pour une consultation à distance
    </p>
  </header>
);

const ContactInfo = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Informations de contact
      </h2>

      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Téléphone</p>
            <a
              href={`tel:${contactInfo.phone}`}
              className="text-primary-600 hover:text-primary-700 transition-colors"
            >
              {contactInfo.phone}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Email</p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-primary-600 hover:text-primary-700 transition-colors"
            >
              {contactInfo.email}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              Localisation
            </p>
            <p className="text-gray-700">
              101 Rue de Saint-Léger
              <br />
              {contactInfo.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ContactMap = () => (
  <div className="mt-16">
    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
      Localisation
    </h2>
    <p className="text-center text-gray-600 mb-8">
      Chiryo Energie - {contactInfo.address || contactInfo.location}
    </p>
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <iframe
        src="https://www.google.com/maps?q=101+Rue+de+Saint-Léger,+Joué-lès-Tours,+37300+France&hl=fr&t=m&z=15&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Localisation de Chiryo Energie à Joué-Les-Tours"
        aria-label="Carte Google Maps montrant la localisation de Chiryo Energie à Joué-Les-Tours"
      />
    </div>
    <p className="text-center text-sm text-gray-500 mt-4">
      <a
        href="https://www.google.com/maps/search/101+Rue+de+Saint-Léger,+Joué-lès-Tours,+37300+France"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-600 hover:text-primary-700 underline"
      >
        Ouvrir dans Google Maps
      </a>
    </p>
  </div>
);

export default function Contact() {
  const lastResult = useActionData<typeof action>();
  const [open, setOpen] = useState(false);
  
  // Memoize the validation function to prevent unnecessary re-renders
  const handleValidate = useCallback(({ formData }: { formData: FormData }) => {
    return parseWithZod(formData, { schema: contactSchema });
  }, []);

  const [form, fields] = useForm({
    lastResult,
    constraint: getZodConstraint(contactSchema),
    onValidate: handleValidate,
    shouldValidate: "onBlur",
    shouldRevalidate: "onSubmit", // Only revalidate on submit, not on every input
  });

  // Show toast on successful form submission (epic-stack pattern)
  useEffect(() => {
    // Check if action returned success and form has no errors
    if (lastResult && 'success' in lastResult && lastResult.success === true) {
      // Only show toast if there are no field errors
      const result = lastResult as { success: boolean; fieldErrors?: Record<string, string[]> };
      const hasErrors = result.fieldErrors && Object.keys(result.fieldErrors).length > 0;

      if (!hasErrors) {
        setOpen(true);
        // Auto-close after 5 seconds
        const timer = setTimeout(() => {
          setOpen(false);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [lastResult]);

  const rootData = useRouteLoaderData<typeof rootLoader>("root");
  const baseUrl = rootData?.baseUrl || "https://cheryo-energy.sevend.io";

  return (
    <>
      <title>Contact - Chiryo Energie</title>
      <meta name="description" content="Contactez Chiryo Energie pour prendre rendez-vous à Joué-Les-Tours, Tours (Indre-et-Loire). Téléphone: 06.61.86.94.01. Email: chiryoenergie@gmail.com. Services de bien-être disponibles." />
      <meta name="summary" content="Contactez Chiryo Energie, Psycho énergéticienne à Joué-Les-Tours et Tours (Indre-et-Loire). Téléphone : 06.61.86.94.01. Email : chiryoenergie@gmail.com. Prenez rendez-vous pour Reiki, Sophro-relaxation, Réflexologie, Magnétisme ou Médiumnité." />
      <meta name="keywords" content="contact énergéticien Joué-Les-Tours, prendre rendez-vous Tours, contact Chiryo Energie, téléphone énergéticien Indre-et-Loire" />
      <meta property="og:title" content="Contact - Chiryo Energie" />
      <meta property="og:description" content="Contactez Chiryo Energie pour prendre rendez-vous. Téléphone: 06.61.86.94.01, Email: chiryoenergie@gmail.com." />
      <meta property="og:url" content={`${baseUrl}/contact`} />
      <meta name="twitter:title" content="Contact - Chiryo Energie" />
      <meta name="twitter:description" content="Contactez Chiryo Energie pour prendre rendez-vous à Joué-Les-Tours, France." />
      <article className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <ContactHeader />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <ContactInfo />

              {/* Contact Form */}
              <div>
                <form
                  id={form.id}
                  method="post"
                  onSubmit={form.onSubmit}
                  className="space-y-6"
                  noValidate={form.noValidate}
                >
                  {form.errors && form.errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                      {form.errors.map((error, index) => (
                        <div key={index}>{error}</div>
                      ))}
                    </div>
                  )}

                  <HoneypotInputs />

                  <div>
                    <label
                      htmlFor={fields.name.id}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Nom complet
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      {...getInputProps(fields.name, { type: "text" })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors border-gray-300"
                      aria-invalid={fields.name.errors ? "true" : "false"}
                      aria-describedby={
                        fields.name.errors ? `${fields.name.id}-error` : undefined
                      }
                    />
                    {fields.name.errors && (
                      <p
                        id={`${fields.name.id}-error`}
                        className="mt-1 text-sm text-red-600"
                        role="alert"
                      >
                        {fields.name.errors}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={fields.email.id}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      {...getInputProps(fields.email, { type: "email" })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors border-gray-300"
                      aria-invalid={fields.email.errors ? "true" : "false"}
                      aria-describedby={
                        fields.email.errors ? `${fields.email.id}-error` : undefined
                      }
                    />
                    {fields.email.errors && (
                      <p
                        id={`${fields.email.id}-error`}
                        className="mt-1 text-sm text-red-600"
                        role="alert"
                      >
                        {fields.email.errors}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={fields.phone.id}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Téléphone
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      {...getInputProps(fields.phone, {
                        type: "tel",
                      })}
                      placeholder="06 12 34 56 78"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors border-gray-300"
                      aria-invalid={fields.phone.errors ? "true" : "false"}
                      aria-describedby={
                        fields.phone.errors ? `${fields.phone.id}-error` : undefined
                      }
                    />
                    {fields.phone.errors && (
                      <p
                        id={`${fields.phone.id}-error`}
                        className="mt-1 text-sm text-red-600"
                        role="alert"
                      >
                        {fields.phone.errors}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={fields.message.id}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      {...getTextareaProps(fields.message)}
                      rows={5}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors resize-none border-gray-300"
                      aria-invalid={fields.message.errors ? "true" : "false"}
                      aria-describedby={
                        fields.message.errors
                          ? `${fields.message.id}-error`
                          : undefined
                      }
                    />
                    {fields.message.errors && (
                      <p
                        id={`${fields.message.id}-error`}
                        className="mt-1 text-sm text-red-600"
                        role="alert"
                      >
                        {fields.message.errors}
                      </p>
                    )}
                  </div>


                  <Button type="submit">
                    {form.status === "success"
                      ? "Message envoyé"
                      : "Envoyer le message"}
                  </Button>
                </form>
              </div>
            </div>

            <ContactMap />
          </div>
        </Container>
      </article>

      <Toast.Root
        className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut"
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="font-semibold">
          Message envoyé avec succès
        </Toast.Title>
        <Toast.Description className="mt-1">
          Merci ! Votre message a été envoyé. Je vous répondrai dans les plus brefs délais.
        </Toast.Description>
      </Toast.Root>
    </>
  );
}


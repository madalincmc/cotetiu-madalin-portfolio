import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.email("Enter a valid email address"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000),
  // Honeypot: real users never fill this in; bots that auto-fill every field do. Left
  // permissive here on purpose — the route handler checks it and silently no-ops for bots
  // instead of returning a validation error that would tip them off.
  company: z.string().max(200).optional().default(""),
  turnstileToken: z.string().min(1, "Verification is required"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

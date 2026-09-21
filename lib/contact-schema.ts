import { z } from 'zod';

/**
 * One schema, used by the form on the client and the route handler on the
 * server. If they ever drift, that's a bug — so they share this file.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name (at least 2 characters).')
    .max(120, 'That name is too long.'),
  email: z.string().trim().email('Please enter a valid email address.').max(254),
  message: z
    .string()
    .trim()
    .min(10, 'Please write at least 10 characters so I know what this is about.')
    .max(4000, 'Please keep it under 4000 characters.'),
  // Honeypot: real people never see this field, so a filled value means a bot.
  // Deliberately NOT validated as empty — a validation error would hand the bot
  // the name of the field that caught it. The route handler checks this value
  // and answers 200 without writing anything, so a bot learns nothing.
  website: z.string().max(4000).optional().default(''),
});

export type ContactInput = z.infer<typeof contactSchema>;

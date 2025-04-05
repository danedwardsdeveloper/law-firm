import { z } from 'zod'

export const contactFormSchema = z.object({
	email: z.string().min(1, { message: 'Please enter a valid email address' }).email({ message: 'Please enter a valid email address' }),
	message: z
		.string()
		.min(1, { message: 'Please enter a message' })
		.max(1000, { message: 'Your message must be less than 1000 characters' }),
	website: z.string().optional(), // Honeypot
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

import { genericFeedbackMessage } from '@/components/contactFormModal/ContactForm'
import { sendEmail } from '@/library/email'
import logger from '@/library/logger'
import { initialiseDevelopmentLogger } from '@/library/utilities/server'
import { contactFormSchema } from '@/library/validations'
import { type NextRequest, NextResponse } from 'next/server'

export interface ContactPOSTbody {
	message: string
	email: string
	website?: string // Honeypot
}

export interface ContactPOSTresponse {
	developmentMessage?: string
	userMessage?: typeof genericFeedbackMessage
}

export async function POST(request: NextRequest): Promise<NextResponse<ContactPOSTresponse>> {
	const routeSignature = 'POST api/message: '
	const developmentLogger = initialiseDevelopmentLogger(routeSignature)

	try {
		const body = await request.json()
		const result = contactFormSchema.safeParse(body)

		if (!result.success) {
			const developmentMessage = developmentLogger(result.error.errors[0].message)
			return NextResponse.json({ developmentMessage }, { status: 400 })
		}

		const { email, message, website } = result.data

		if (website) {
			const developmentMessage = developmentLogger('Honeypot field provided. Returning false positive')
			return NextResponse.json({ developmentMessage }, { status: 200 })
		}

		const { sentSuccessfully } = await sendEmail({
			subject: 'New message: Archer Finch Legal',
			body: `<strong>${email} sent a new message to Archer Finch Legal</strong><br/><br/><p>${message}</p>`,
		})

		if (!sentSuccessfully) {
			return NextResponse.json({ userMessage: genericFeedbackMessage }, { status: 503 })
		}

		const developmentMessage = developmentLogger('Message sent successfully', undefined, 'level3success')
		return NextResponse.json({ developmentMessage }, { status: 200 })
	} catch (error) {
		logger.error(`${routeSignature} error: `, error)
		return NextResponse.json({ userMessage: genericFeedbackMessage }, { status: 500 })
	}
}

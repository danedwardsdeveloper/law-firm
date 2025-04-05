import { SESClient, SendEmailCommand, type SendEmailRequest } from '@aws-sdk/client-ses'
import { awsAccessKeyId, awsSecretAccessKey, myPersonalEmail } from './environment/serverVariables'
import logger from './logger'

const emailClient = new SESClient({
	region: 'us-east-1',
	credentials: {
		accessKeyId: awsAccessKeyId,
		secretAccessKey: awsSecretAccessKey,
	},
})

export async function sendEmail({ subject, body }: { subject: string; body: string }): Promise<{ sentSuccessfully: boolean }> {
	const emailParams: SendEmailRequest = {
		Source: `"Archer Finch Legal" <${myPersonalEmail}>`,
		Destination: {
			ToAddresses: [myPersonalEmail],
		},
		Message: {
			Subject: {
				Data: subject,
				Charset: 'UTF-8',
			},
			Body: {
				Text: {
					Data: body,
					Charset: 'UTF-8',
				},
				Html: {
					Data: body,
					Charset: 'UTF-8',
				},
			},
		},
	}

	try {
		await emailClient.send(new SendEmailCommand(emailParams))
		return { sentSuccessfully: true }
	} catch (error) {
		logger.error('sendEmail: ', error)
		return { sentSuccessfully: false }
	}
}

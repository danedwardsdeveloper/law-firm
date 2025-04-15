'use client'
import type { ContactPOSTbody, ContactPOSTresponse } from '@/app/api/contact/route'
import { mergeClasses } from '@/library/utilities/browser'
import { type ContactFormValues, contactFormSchema } from '@/library/validations'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useProvider } from '../Provider'
import Spinner from '../Spinner'

export const genericFeedbackMessage = "Sorry, we couldn't send your message. Please try again."

export default function ContactForm() {
	const { setContactFormVisible } = useProvider()
	const [status, setStatus] = useState<'pending' | 'submitting' | 'error' | 'success'>('pending')
	const [feedbackMessage, setFeedbackMessage] = useState('')

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isValid },
	} = useForm<ContactFormValues>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			email: '',
			message: '',
			website: '',
		} as ContactPOSTbody,
		mode: 'onTouched',
	})

	async function onSubmit(data: ContactFormValues) {
		setFeedbackMessage('')
		setStatus('submitting')

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			const { userMessage }: ContactPOSTresponse = await response.json()

			if (!response.ok && userMessage) {
				setStatus('error')
				setFeedbackMessage(userMessage)
			}

			setStatus('success')
		} catch {
			setStatus('error')
			setFeedbackMessage(genericFeedbackMessage)
		}
	}

	function Header() {
		return (
			<div className="flex justify-between mb-4">
				<h2 className="text-xl font-semibold">
					{(() => {
						if (status === 'success') return <span className="text-green-600">Message sent successfully</span>
						return 'Contact us'
					})()}
				</h2>
				<button
					type="button"
					aria-label="Close contact form"
					onClick={() => setContactFormVisible(false)}
					className="group transition-colors duration-300 hover:bg-zinc-100 rounded-md p-1 text-zinc-600 hover:text-red-500"
				>
					<XCircleIcon className="size-6" aria-hidden="true" />
				</button>
			</div>
		)
	}

	function SuccessMessage() {
		const formValues = getValues()

		return (
			<div>
				<Header />
				<p>{`We'll get back to you in one working day.`}</p>
				<div className="flex justify-center text-green-600 my-4">
					<CheckCircleIcon className="size-16" aria-hidden="true" />
				</div>
				<div className="mb-4">
					<p className="font-medium">{formValues.email}</p>
					<p>{formValues.message}</p>
				</div>
			</div>
		)
	}

	if (status === 'success') return <SuccessMessage />

	return (
		<div>
			<Header />
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				{/* Email */}
				<div className="w-full mb-5">
					<div className="mb-1">
						<label htmlFor="email" className="block md:inline font-medium">
							Email
						</label>
						{errors.email && <span className="ml-0 md:ml-2 block md:inline md:mb-1 text-red-600">{errors.email.message}</span>}
					</div>

					<input
						id="email"
						type="email"
						autoComplete="email"
						{...register('email')}
						className={mergeClasses(
							'w-full rounded-md border border-gray-300 px-3 py-2 transition-all duration-300',
							errors.email && 'bg-red-100 border-l-4 border-l-red-600',
						)}
					/>
				</div>

				{/* Message */}
				<div className="w-full mb-5">
					<div className="mb-1">
						<label htmlFor="message" className="block md:inline font-medium">
							Message
						</label>
						{errors.message && <span className="ml-0 md:ml-2 block md:inline md:mb-1 text-red-600">{errors.message.message}</span>}
					</div>
					<textarea
						id="message"
						{...register('message')}
						rows={5}
						className={mergeClasses(
							'border border-gray-300 p-2 rounded-md w-full transition-all duration-300',
							errors.message && 'bg-red-100 border-l-4 border-l-red-600',
						)}
					/>
				</div>

				{/* Honeypot */}
				<div className="hidden" aria-hidden="true">
					<label htmlFor="website">Website (Leave this empty)</label>
					<input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
				</div>

				{status === 'error' && <p className="text-red-600 font-medium">{feedbackMessage || genericFeedbackMessage}</p>}

				<div className="mt-5 sm:mt-6 w-full">
					<button
						type="submit"
						disabled={!isValid || status === 'submitting'}
						className={mergeClasses(
							'inline-flex w-full justify-center active:hover:bg-green-200 hover:shadow-md active:hover:shadow-md transition-all duration-300 px-4 py-2 rounded-lg font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none',
							!isValid ? 'bg-gray-300' : status === 'submitting' ? 'bg-green-200' : 'bg-green-300',
						)}
					>
						{status === 'submitting' ? <Spinner /> : 'Send message'}
					</button>
				</div>
			</form>
		</div>
	)
}

'use client'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import dynamic from 'next/dynamic'
import { useProvider } from '../Provider'
import ContactDetails from './ContactDetails'
import ContactForm from './ContactForm'

function ContactFormModalComponent() {
	const { contactFormVisible, setContactFormVisible } = useProvider()

	return (
		<Dialog open={contactFormVisible} onClose={setContactFormVisible} className="relative z-30">
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-zinc-500/20 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
			/>

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel
						transition
						className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full sm:max-w-md sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 h-min"
					>
						<ContactForm />
						<div className="bg-zinc-100 w-full h-0.5 rounded-full my-12" />
						<ContactDetails />
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	)
}

const ContactFormModal = dynamic(() => Promise.resolve(ContactFormModalComponent), {
	ssr: false,
})

export default ContactFormModal

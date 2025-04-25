'use client'
import logger from '@/library/logger'
import { clsx } from 'clsx'
import Image from 'next/image'
import { type Dispatch, type ReactNode, type SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import CompanyLogo from './CompanyLogo'
import Spinner from './Spinner'

export default function SplashScreen() {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [splashExists, setSplashExists] = useState(true)

	useEffect(() => {
		const fontsPromise = document.fonts.ready
		const timeoutPromise = new Promise<void>((resolve) => setTimeout(() => resolve(), 800))

		Promise.all([fontsPromise, timeoutPromise])
			.then(() => setIsLoading(false))
			.catch(() => setIsLoading(false))
	}, [])

	const forceShow = false
	const showSplash = forceShow || isLoading

	useEffect(() => {
		if (showSplash) {
			setSplashExists(true)
		} else {
			const timer = setTimeout(() => {
				setSplashExists(false)
			}, 550)
			return () => clearTimeout(timer)
		}
	}, [showSplash])

	if (!splashExists) return null

	return (
		<div
			data-component="SplashScreen"
			className={clsx(
				'fixed inset-0 flex flex-col h-full z-50 items-center justify-center bg-cream-100 transition-opacity duration-500',
				showSplash ? 'opacity-100' : 'pointer-events-none opacity-0',
			)}
		>
			<div className="flex flex-col gap-y-4 items-center">
				<Spinner colour="text-black" />
				<CompanyLogo size="size-20" />
			</div>
		</div>
	)
}

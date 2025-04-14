'use client'
import { useEffect, useState } from 'react'

export default function CopyrightNotice() {
	const [currentYear, setCurrentYear] = useState('')

	useEffect(() => {
		setCurrentYear(new Date().getFullYear().toString())
	}, [])

	return (
		<div className="flex flex-col md:flex-row md:gap-x-1">
			<span>&copy; 1996 - {currentYear} Archer Finch Legal LLP.</span>
			<span>All rights reserved.</span>
		</div>
	)
}

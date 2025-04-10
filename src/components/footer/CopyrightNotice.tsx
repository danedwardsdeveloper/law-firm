'use client'
import { useEffect, useState } from 'react'

export default function CopyrightNotice() {
	const [currentYear, setCurrentYear] = useState('')

	useEffect(() => {
		setCurrentYear(new Date().getFullYear().toString())
	}, [])

	return <p>&copy; 1996 - {currentYear} Archer Finch Legal LLP. All rights reserved.</p>
}

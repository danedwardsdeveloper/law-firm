import companyLogo from '@/app/icon.svg'
import Image from 'next/image'

export default function CompanyLogo({ size }: { size: string }) {
	// Blurred placeholder isn't necessary or possible on a small SVG
	return <Image src={companyLogo} alt="Archer Finch Legal company logo" className={size} />
}

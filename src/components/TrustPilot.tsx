function TinyGreenStar() {
	return (
		<svg className="size-12 flex items-center justify-center" color="currentColour">
			<title>Trustpilot star</title>
			<g>
				<path fill="#dcdce6" d="M205.064416 46.330002h46.375587V0h-46.375587z" />
				<path fill="#dcdce6" d="M205.064416 46.330002h23.187793V0h-23.187793z" />
				<path
					d="M244.597022 19.711433l-26.3029 19.089218 3.837419-11.797827-10.047304-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418975zm-16.255436 11.798642l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z"
					fill="#FFF"
				/>
			</g>
		</svg>
	)
}

function LargeGreenStar() {
	return (
		<svg className="size-12 flex items-center justify-center" color="currentColour">
			<title>Trustpilot star</title>
			<g>
				<path color="#dcdce6" fill="#dcdce6" d="M0 46.330002h46.375586V0H0z" />
				<path
					d="M39.533936 19.711433L13.230239 38.80065l3.838216-11.797827L7.02115 19.711433h12.418975l3.837417-11.798624 3.837418 11.798624h12.418975zM23.2785 31.510075l7.183595-1.509576 2.862114 8.800152L23.2785 31.510075z"
					fill="#FFF"
				/>
			</g>
		</svg>
	)
}

function FiveGreenStars({ size }: { size: 'tiny' | 'large' }) {
	return (
		<div className="flex gap-x-0.5 h-12 items-center">
			{[1, 2, 3, 4, 5].map((star) => {
				return size === 'large' ? <LargeGreenStar key={star} /> : <TinyGreenStar key={star} />
			})}
		</div>
	)
}

export function TrustPilot() {
	return (
		<>
			<FiveGreenStars size="large" />
		</>
	)
}

export default function ContactDetails() {
	return (
		<div className="flex flex-col gap-y-6 text-start">
			<address className="not-italic">
				<span className="font-bold text-lg">Archer Finch Legal LLP</span>
				<br />
				12 Haymarket Square
				<br />
				St. James's
				<br />
				London, SW1Y 4BP
			</address>
			<div>
				<p className="font-bold text-lg">020 7946 0183</p>
				<p>Monday to Friday, 8.30am - 6pm</p>
			</div>
		</div>
	)
}

import PersonCard from './PersonCard'
import { team } from './data'

export default function TeamPage() {
	return (
		<>
			<h1>Team</h1>
			<div className="grid grid-cols-2 gap-8">
				{team.map((member) => (
					<PersonCard key={member.slug} slug={member.slug} name={member.name} specialty={member.specialty} />
				))}
			</div>
		</>
	)
}

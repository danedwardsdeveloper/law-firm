import type { Testimonial } from '@/types/definitions/testimonial'
import aliciaPeters from './images/alicia-peters.png'
import danielReeves from './images/daniel-reeves.png'
import drElenaKapoor from './images/dr-elena-kapoor.png'
import martinDedeine from './images/martin-dedeine.png'
import sarahChen from './images/sarah-chen.png'

export const testimonials: Testimonial[] = [
	{
		service: 'Trademark protection',
		writer: {
			name: 'Sarah Chen',
			role: 'Trademark protection officer',
		},
		company: 'Curology',
		photo: sarahChen,
		altText: 'Headshot of Sarah Chen, Trademark protection officer at Curology',
		content: [
			'When a competitor launched products with branding confusingly similar to ours, Archer Finch Legal stepped in with decisive action to protect our trademark rights.',

			'Their team quickly assessed our position and developed a strategy that resolved the issue without drawn-out litigation. Their cease-and-desist approach was firm yet professional, preserving important industry relationships.',

			'Thanks to Archer Finch, our brand identity remains distinctive and protected in the competitive skincare market.',
		],
	},
	{
		service: 'IP due diligence',
		writer: {
			name: 'Alicia Peters',
			role: 'Managing partner',
		},
		company: 'Horizon Ventures Capital',
		photo: aliciaPeters,
		altText: 'Professional portrait of Alicia Peters, Managing partner at Horizon Ventures Capital',
		content: [
			'Archer Finch Legal has been instrumental in our investment due diligence process, particularly in evaluating the IP portfolios of potential acquisitions.',

			'Their thorough IP audits have uncovered critical issues that might have otherwise gone undetected, saving us from costly post-investment complications.',

			'The Archer Finch team translated complex IP matters into clear business implications, which is exactly what we need when making time-sensitive investment decisions.',
		],
	},
	{
		service: 'Licensing agreement',
		writer: {
			name: 'Martin Dedeine',
			role: 'Chief creative officer',
		},
		company: 'Asobo Studio',
		photo: martinDedeine,
		altText: 'Martin Dedeine, Chief creative officer at Asobo Studio, works in the office with three other team members',
		content: [
			'Archer Finch Legal helped us navigate the complex licensing negotiations for A Plague Tale with clarity and precision.',

			'Their team understood both our creative vision and commercial objectives, ensuring the licensing agreement protected our intellectual property while maximising distribution opportunities.',

			'Working with Archer Finch has given us the confidence to focus on creating extraordinary gaming experiences while knowing our IP rights are secure.',
		],
	},

	{
		service: 'Patent application',
		writer: {
			name: 'Dr. Elena Kapoor',
			role: 'Chief innovation officer',
		},
		company: 'MediTech Limited',
		photo: drElenaKapoor,
		altText: 'Dr. Elena Kapoor, Chief innovation officer at MediTech Limited, in the laboratory',
		content: [
			'Navigating the patent process for our revolutionary medical monitoring device seemed overwhelming until we partnered with Archer Finch Legal.',

			'Their team guided us through every step with remarkable clarity, translating complex patent requirements into actionable steps. They strategically structured our application to maximise protection while anticipating potential challenges from competitors.',

			"With Archer Finch's expertise, we secured our patent ahead of schedule, allowing us to confidently launch our product and attract crucial second-round funding.",
		],
	},
	{
		service: 'Copyright infringement',
		writer: {
			name: 'Daniel Reeves',
			role: 'Film maker',
		},
		photo: danielReeves,
		altText: 'Daniel Reeves, film maker, with his camera',
		content: [
			'When I discovered unauthorised copies of my documentary being distributed on multiple platforms, Archer Finch Legal responded with immediate and effective action.',

			'Their cease-and-desist strategy not only removed the infringing content but secured fair compensation for lost revenue. They understood the unique challenges independent filmmakers face in protecting their work.',

			'Archer Finch gave me the legal support I needed to focus on creating films instead of fighting copyright battles.',
		],
	},
]

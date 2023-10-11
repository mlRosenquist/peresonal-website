<script lang="ts">
	import Anchor from './Anchor.svelte';
	import type { Education } from './Education';
	import EducationView from './EducationView.svelte';
	import type { Experience } from './Experience';
	import ExperienceView from './ExperienceView.svelte';
	import type { Project } from './Project';
	import { type Skill, SkillType, SkillLevel } from './Skill';

	const experiences: Experience[] = [
		{
			image: 'dg.png',
			title: 'Consultant',
			company: 'Delegate',
			descriptions: [
				'Scoping, Designing and Architecturing IT solutions at customers in various domains.',
				'Implementing and maintaining CRM systems and integrations, primarily consisting of various azure components.',
				'Configuring and maintaining CI/CD pipelines together with having a strong focus on DX.'
			],
			location: 'Aarhus',
			start: 'Sep 2019',
			end: 'Present'
		},
		{
			image: 'defence.svg',
			title: 'Constable',
			company: 'The Danish Defence',
			descriptions: [
				'Experienced the in-flexible boundaries of working in the military.',
				'Learned to work structured and disciplined to achieve a common goal.'
			],
			location: 'Aalborg',
			start: 'Sep 2013',
			end: 'Jul 2015'
		},
		{
			image: 'riotgames.svg',
			title: 'Proffesional player',
			company: 'Riot Games',
			descriptions: [
				'Played in one of the first championship seasons of League of Legends.',
				'Worked hard to become one of the best worldwide at my role.',
				'Lived, travelled and worked together with a cohesive team.'
			],
			location: 'Worldwide',
			start: 'Sep 2010',
			end: 'Sep 2011'
		}
	];

	const educations: Education[] = [
		{
			institution: 'Aarhus University - Department of Electrical and Computer Engineering',
			descriptions: [
				"Completed a Bachelor's in Software Technology, gaining a solid foundation in algorithms, data structures, and software design.",
				'Worked on academic projects that honed my problem-solving skills and exposed me to web and mobile app development.'
			],
			location: 'Aarhus',
			start: 'Sep 2017',
			end: 'Jan 2020',
			link: 'https://ece.au.dk/'
		},
		{
			institution: 'Aarhus University - Department of Electrical and Computer Engineering',
			descriptions: [
				"Advanced my studies with a Master's, exploring specialized topics like Artificial Intelligence, Machine Learning, and Distributed Systems.",
				'Engaged in intensive research projects and benefited from guidance by renowned professors.'
			],
			location: 'Aarhus',
			start: 'Jan 2020',
			end: 'Jan 2022',
			link: 'https://ece.au.dk/'
		}
	];

	const projects: Project[] = [...Array(9).keys()].map((x) => ({
		title: `Project Title ${x + 1}`,
		link: `https://projectlink${x + 1}.com`,
		logo: `projectlogo${x + 1}.png`,
		description: `This is the description for Project Title ${
			x + 1
		}. It aims to showcase the diverse applications of Project ${
			x + 1
		} in real-world scenarios. The project integrates multiple technologies and provides solutions to various challenges faced in today's dynamic digital environment. It's a result of extensive research and collaboration among professionals.`
	}));

	const skills: Skill[] = [
		{
			type: SkillType.ProgrammingLanguage,
			name: 'C#',
			level: SkillLevel.Preferred
		},
		{
			type: SkillType.ProgrammingLanguage,
			name: 'TS',
			level: SkillLevel.Preferred
		},
		{
			type: SkillType.ProgrammingLanguage,
			name: 'Python',
			level: SkillLevel.WorkingKnowledge
		},
		{
			type: SkillType.ProgrammingLanguage,
			name: 'GO',
			level: SkillLevel.WorkingKnowledge
		},

		{
			type: SkillType.Data,
			name: 'Pandas',
			level: SkillLevel.WorkingKnowledge
		},
		{
			type: SkillType.Data,
			name: 'SQL',
			level: SkillLevel.Preferred
		},
		{
			type: SkillType.Data,
			name: 'MongoDB',
			level: SkillLevel.WorkingKnowledge
		},

		{
			type: SkillType.Web,
			name: 'React',
			level: SkillLevel.Preferred
		},
		{
			type: SkillType.Web,
			name: 'Svelte',
			level: SkillLevel.WorkingKnowledge
		},

		{
			type: SkillType.MLAndImageProcessing,
			name: 'Numpy',
			level: SkillLevel.WorkingKnowledge
		},
		{
			type: SkillType.MLAndImageProcessing,
			name: 'PyTorch',
			level: SkillLevel.Interested
		},
		{
			type: SkillType.MLAndImageProcessing,
			name: 'Sklearn',
			level: SkillLevel.Interested
		},

		{
			type: SkillType.Tools,
			name: 'Git',
			level: SkillLevel.Preferred
		},
		{
			type: SkillType.Tools,
			name: 'Docker',
			level: SkillLevel.WorkingKnowledge
		},
		{
			type: SkillType.Tools,
			name: 'Kubernetes',
			level: SkillLevel.Interested
		},
		{
			type: SkillType.Tools,
			name: 'Azure',
			level: SkillLevel.Preferred
		},
		{
			type: SkillType.Tools,
			name: 'AWS',
			level: SkillLevel.Interested
		}
	];

	function getKeyByValue(value: string): keyof typeof SkillType | undefined {
		return Object.keys(SkillType).find(
			(key) => SkillType[key as keyof typeof SkillType] === value
		) as keyof typeof SkillType | undefined;
	}

	function getSkillsOfValueType(value: string) {
		const key = getKeyByValue(value);
		if (!key) return [];
		return skills.filter((x) => x.type === SkillType[key]);
	}

	const skillValues = Object.values(SkillType);
</script>

<main class="flex flex-col space-y-2">
	<h1 class="text-4xl font-bold leading-tight">Morten Lyng Rosenquist</h1>
	<span class="flex flex-row space-x-1 pb-1">
		<p class="text-base font-light leading-tight">Consultant at</p>
		<p class="text-base font-normal leading-tight">Delegate</p>
		<p class="text-base font-light leading-tight">graduated in 2023</p>
	</span>
	<div id="communication" class="flex flex-row space-x-8">
		<Anchor href="https://github.com/mlRosenquist" text="mlRosenquist">
			<svg class="w-3 h-3" viewBox="0 0 20 20">
				<path
					d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
				/>
			</svg>
		</Anchor>

		<Anchor href="mailto:lyngrosenquistmorten@gmail.com" text="lyngrosenquistmorten@gmail.com">
			<svg viewBox="0 0 24 20" class="w-3 h-3">
				<path
					d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"
				/>
				<path
					d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"
				/>
			</svg>
		</Anchor>

		<Anchor href="https://www.linkedin.com/in/mortenlyngrosenquist/" text="Morten Lyng Rosenquist">
			<svg class="w-3 h-3" viewBox="0 0 24 24">
				<path
					d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
				/>
			</svg>
		</Anchor>
		<Anchor href="morten.rosenquist.live" text="morten.rosenquist.live">
			<svg viewBox="0 0 24 20" class="w-3 h-3">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
				/>
			</svg>
		</Anchor>
		<Anchor href="tel:+4542363964" text="+45 42363964">
			<svg viewBox="0 0 24 24" class="w-3 h-3">
				<path
					fill-rule="evenodd"
					d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
					clip-rule="evenodd"
				/>
			</svg>
		</Anchor>
	</div>

	<div>
		<h3>Proffesional experience</h3>
		{#each experiences as experience}
			<div class="mb-2">
				<ExperienceView {experience} />
			</div>
		{/each}
	</div>

	<div>
		<h3>Education</h3>
		{#each educations as education}
			<EducationView {education} />
		{/each}
	</div>

	<div>
		<h3>Projects</h3>
		<div class="grid grid-cols-3 grid-rows-3 gap-4">
			{#each projects as project}
				<div class="flex flex-col">
					<span class="flex flex-row">
						<a href={project.link}>
							<p class="font-mono font-bold">
								{project.title}
							</p>
						</a>
						<img src={project.logo} />
					</span>
					<p class="text-sm text-justify break-words">{project.description}</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="flex flex-col">
		<div class="flex flex-row justify-between items-center">
			<h3>Skills</h3>
			<span class="flex flex-row space-x-1">
				<div class="border-red-500 border-2 rounded-md">
					<p class="m-[0.05rem]">{SkillLevel.Preferred}</p>
				</div>
				<div class="border-red-500 border-2 rounded-md">
					<p class="m-[0.05rem]">{SkillLevel.WorkingKnowledge}</p>
				</div>
				<div class="border-red-500 border-2 rounded-md">
					<p class="m-[0.05rem]">{SkillLevel.Interested}</p>
				</div>
			</span>
		</div>

		<div class="grid grid-rows-3 grid-cols-3 gap-4">
			{#each skillValues as value}
				<div>
					<p>{value}</p>
					<div class="flex flex-row space-x-1">
						{#each getSkillsOfValueType(value) as skill}
							<div class="border-2 rounded-md border-red-200">
								<p class="m-[0.05rem]">{skill.name}</p>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>

<style lang="postcss">
	h3 {
		@apply text-[18px] font-normal pb-1;
	}

	#communication > a > span {
		@apply flex flex-row items-center space-x-[0.1rem];
	}

	#communication > a > span > svg {
		@apply w-3 h-3 fill-[#4ccccc]/50 stroke-[#4ccccc]/50;
	}

	#communication > a > span > p {
		@apply text-xs text-[#4ccccc];
	}
</style>

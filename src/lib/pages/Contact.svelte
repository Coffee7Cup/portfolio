<script>
	import { onMount, getContext } from 'svelte';
	import GrainyText from '$lib/components/GrainyText.svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { GithubIcon, Linkerd, Twitter } from '@dev.icons/svelte/mono';
	import { browser } from '$app/environment';
	import linkedin from '$lib/assets/linkedin.svg';

	gsap.registerPlugin(ScrollTrigger);

	let sectionEl = $state();
	let formStatus = $state('');
	let name = $state('');
	let message = $state('');

	const portfolio = getContext('portfolio');
	const personal = portfolio.personal;

	function handleSubmit(e) {
		e.preventDefault();

		formStatus = 'sending';

		const subject = encodeURIComponent('Portfolio Inquiry');
		const body = encodeURIComponent(`Hi, I'm ${name},\n\n${message}`);

		window.location.href = `mailto:maddysai9848@gmail.com?subject=${subject}&body=${body}`;

		setTimeout(() => {
			formStatus = 'success';
		}, 800);
	}
	onMount(() => {
		const ctx = gsap.context(() => {
			gsap.from('.contact-form-container', {
				y: 50,
				opacity: 0,
				duration: 0.8,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top 60%',
					toggleActions: 'play none none reverse'
				}
			});

			gsap.from('.contact-info-container', {
				y: 40,
				opacity: 0,
				duration: 0.8,
				delay: 0.15,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top 60%',
					toggleActions: 'play none none reverse'
				}
			});
		}, sectionEl);

		return () => ctx.revert();
	});
</script>

<section
	bind:this={sectionEl}
	id="contact"
	class="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-bg-main md:flex-row"
>
	<!-- CONTACT title -->
	<div
		class="pointer-events-none z-30 flex w-full shrink-0 items-center justify-center pt-24 md:absolute md:left-0 md:h-full md:w-20 md:translate-x-10 md:px-4 md:pt-0"
	>
		<div class="whitespace-nowrap md:-rotate-90">
			<GrainyText
				text="CONTACT"
				size="text-[3rem] md:text-[7rem] font-stroke-display"
				id="contact"
			/>
		</div>
	</div>
	<!-- Content -->
	<div
		class="relative z-20 flex w-full flex-1 flex-col justify-start px-6 pt-10 pb-20 md:absolute md:right-0 md:h-screen md:w-screen md:justify-center md:px-0 md:py-0"
	>
		<div class="grid w-full gap-12 pr-6 md:grid-cols-2 md:pr-10 md:pl-32 lg:pr-20 lg:pl-40">
			<!-- Contact Info & Socials -->
			<div class="contact-info-container order-1 flex flex-col justify-between md:order-1">
				<div>
					<h3 class="mb-6 font-stroke-display text-xl font-extrabold text-accent md:text-2xl">
						Let's connect.
					</h3>
					<p class="mb-8 font-main text-sm leading-relaxed text-text-sub md:text-base">
						Whether you want to discuss a low-level systems project, talk about a backend
						infrastructure, or just talk tech, feel free to reach out. I'm always open to discussing
						new opportunities.
					</p>

					<div class="flex flex-col gap-4">
						<div class="flex items-center gap-4">
							<div
								class="flex h-11 w-11 items-center justify-center rounded-lg border border-text-main/10 bg-text-main/5 text-accent"
							>
								<svg
									class="h-5 w-5"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<div>
								<span class="block font-main text-xs text-text-sub">Email Address</span>
								<a
									href="mailto:{personal.email}"
									class="font-main text-sm font-semibold text-text-main transition-colors duration-300 hover:text-accent"
								>
									{personal.email}
								</a>
							</div>
						</div>
					</div>
				</div>

				<!-- Social Links Grid -->
				<div class="mt-12">
					<span
						class="mb-4 block font-main text-xs font-semibold tracking-wider text-text-sub uppercase"
					>
						Follow Me
					</span>
					<div class="flex flex-wrap gap-3">
						<a
							href={personal.github}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-2 rounded-xl border border-text-main/10 bg-text-main/5 px-5 py-3 font-main text-sm font-medium text-accent transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(255,0,0,0.15)]"
						>
							{#if browser}
								<GithubIcon size={20} />
							{/if}
							<span class="text-text-main">GitHub</span>
						</a>
						<a
							href={personal.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-2 rounded-xl border border-text-main/10 bg-text-main/5 px-5 py-3 font-main text-sm font-medium text-accent transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(255,0,0,0.15)]"
						>
							{#if browser}
								<img src={linkedin} alt="linkedin" class="h-5 w-5 text-white" />
							{/if}
							<span class="text-text-main">LinkedIn</span>
						</a>
						<a
							href={personal.twitter}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-2 rounded-xl border border-text-main/10 bg-text-main/5 px-5 py-3 font-main text-sm font-medium text-accent transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(255,0,0,0.15)]"
						>
							{#if browser}
								<Twitter size={20} />
							{/if}
							<span class="text-text-main">Twitter</span>
						</a>
					</div>
				</div>

				<!-- Footer -->
				<div class="mt-16 hidden border-t border-text-main/10 pt-6 md:block">
					<p class="font-main text-xs text-text-sub">
						&copy; {new Date().getFullYear()}
						{personal.name}. Built with SvelteKit, GSAP, and Tailwind.
					</p>
				</div>
			</div>

			<!-- Contact Form -->
			<div class="contact-form-container order-2 md:order-2">
				<h3 class="mb-6 font-stroke-display text-xl font-extrabold text-accent md:text-2xl">
					Send a message.
				</h3>

				<form onsubmit={handleSubmit} class="flex flex-col gap-5">
					<div>
						<label
							for="name"
							class="mb-2 block font-main text-xs font-semibold tracking-wider text-text-sub uppercase"
						>
							Name
						</label>

						<input
							type="text"
							bind:value={name}
							id="name"
							required
							placeholder="Your name"
							class="w-full rounded-xl border border-text-main/15 bg-text-main/5 px-4 py-3 font-main text-sm text-text-main placeholder-text-sub/50 outline-hidden transition-all duration-300 outline-none focus:border-accent focus:bg-transparent focus:shadow-[0_0_15px_rgba(255,0,0,0.1)] focus:ring-0 focus:ring-offset-0"
						/>
					</div>

					<div>
						<label
							for="message"
							class="mb-2 block font-main text-xs font-semibold tracking-wider text-text-sub uppercase"
						>
							Message
						</label>
						<textarea
							id="message"
							required
							bind:value={message}
							rows="4"
							placeholder="What are we building?"
							class="w-full resize-none rounded-xl border border-text-main/15 bg-text-main/5 px-4 py-3 font-main text-sm text-text-main placeholder-text-sub/50 transition-all duration-300 outline-none focus:border-accent focus:bg-transparent focus:shadow-[0_0_15px_rgba(255,0,0,0.1)] focus:ring-0 focus:ring-offset-0 focus:outline-none"
						></textarea>
					</div>
					<button
						type="submit"
						disabled={formStatus === 'sending' || formStatus === 'success'}
						class="mt-2 flex items-center justify-center rounded-xl bg-accent px-6 py-3.5 font-stroke-clean text-sm font-bold tracking-wider text-white uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] active:scale-[0.98] disabled:scale-100 disabled:opacity-50"
					>
						{#if formStatus === 'sending'}
							Sending...
						{:else if formStatus === 'success'}
							Message Sent!
						{:else}
							Send Message
						{/if}
					</button>
				</form>

				<!-- Footer (Mobile Only) -->
				<div class="mt-16 border-t border-text-main/10 pt-6 md:hidden">
					<p class="font-main text-xs text-text-sub">
						&copy; {new Date().getFullYear()}
						{personal.name}. Built with SvelteKit, GSAP, and Tailwind.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.contact-rotate-title {
		transform: rotate(-90deg);
	}

	@media (max-width: 767px) {
		.contact-rotate-title {
			opacity: 0.12;
			position: absolute;
			left: -4.5rem;
			top: 50%;
			transform: rotate(-90deg) translateX(-50%);
			transform-origin: center center;
		}
	}
</style>

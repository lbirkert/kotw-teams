<script lang="ts">
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Header member={data.member} />

<slot />

<footer>
	<p>
		Made with 💕 by Lucas Birkert
		<span> | </span>
		&copy; 2023 KekOnTheWorld
	</p>
</footer>

<style>
	footer {
		border-top: var(--b1);
		padding: 20px 10px;
		text-align: center;
	}
</style>

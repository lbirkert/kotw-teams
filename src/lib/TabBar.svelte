<script context="module" lang="ts">
	export type Path = {
		pathname?: string;
		url?: string;
		name: string;
		exact?: boolean;
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';

	export let active = (path: Path, url: URL) => {
		if (!path.pathname) {
			return false;
		}

		return path.exact ? url.pathname == path.pathname : url.pathname.startsWith(path.pathname);
	};

	export let paths: Path[] = [
		{
			pathname: '/',
			exact: true,
			name: 'Overview'
		},
		{
			pathname: '/scrum',
			name: 'Scrum'
		},
		{
			pathname: '/tasks',
			name: 'Tasks'
		},
		{
			pathname: '/members',
			name: 'Members'
		},
		{
			pathname: '/snapshots',
			name: 'Snapshots'
		}
	];
</script>

<nav>
	<ul>
		{#each paths as path}
			<li class:active={active(path, $page.url)}>
				<a href={path.pathname || path.url}>{path.name}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		position: sticky;
		z-index: 100;
		top: 0;

		overflow-y: scroll;
		scrollbar-width: none;
		border-bottom: var(--b1);
		background-color: var(--bg);
		height: 42px;
	}

	ul {
		display: flex;
		column-gap: 10px;
	}

	a {
		text-decoration: none;
		padding: 5px 10px;
		border-radius: 5px;
		position: relative;
	}

	a:hover {
		background: var(--tab-hover-bg);
		color: var(--tab-hover-fg);
	}

	li {
		padding: 10px 10px;
	}

	li.active {
		font-weight: bold;
		border-bottom: 3px solid lightgreen;
	}
</style>

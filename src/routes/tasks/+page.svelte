<script lang="ts">
	import type { ClientCoDto } from '$lib/shared/dto/ProfileDto.js';
	import { storeGet } from '$lib/shared/dtoHelpers';
	import type { PageData } from './$types.js';

	export let data: PageData;
	let clientsFiltered = data.clients;
	let targetEntity: ClientCoDto;

	// INTERACTIVITY: side menu
	const resetEntity = (targetId: number) => {
		targetEntity = data.clients.find((s) => {
			return s.entityId == targetId;
		}) as ClientCoDto;
	};

	resetEntity(data.targetId);

	const filterHandler = (event: Event) => {
		const el = event.target as HTMLInputElement;
		const v = el.value.toLowerCase();

		if (v.length > 0) {
			clientsFiltered = data.clients.filter((p) => {
				const n = p.entityName.toLowerCase();
				return new RegExp(v).test(n);
			});
		} else {
			clientsFiltered = data.clients;
		}
	};
</script>

<div>
	<h1><a href="/"> MasterList </a></h1>
	<nav>
    <!--
		<input type="text" class="mb-small" placeholder="Filter Names" on:input={filterHandler} />
		<ul class="sidebar">
			{#each clientsFiltered as item}
				<li><a href="/clients/co/{item.entityId}/tasks">{item.entityName}</a></li>
			{/each}
		</ul>
    -->
	</nav>
</div>

<main>
	<h2>Browse Tasks</h2>
	<div class="button-group">
    <!--
		<a class="button small" href="/tasks?targetId={targetEntity?.entityId}"> All </a>
    {#each storeGet("svcTypeId") as item}
		<a class="button small" href="/tasks?targetId={targetEntity?.entityId}">
      {item.label}
    </a>
    {/each}
      --->
	</div>
</main>
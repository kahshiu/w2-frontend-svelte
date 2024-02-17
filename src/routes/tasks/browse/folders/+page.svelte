<script lang="ts">
	import type { ClientCoDto } from '$lib/shared/dto/ProfileDto.js';
	import { findSvcTypeId, storeGet } from '$lib/shared/dtoHelpers';
	import type { PageData } from './$types.js';

	export let data: PageData;
	console.log('tracing data: ', data);

	let tasksGrouped = {};
	let tasksFiltered = {};
	let targetEntity: ClientCoDto;

	/*
	// INTERACTIVITY: side menu
	const resetEntity = (targetId: number) => {
		targetEntity = data.clients.find((s) => {
			return s.entityId == targetId;
		}) as ClientCoDto;
	};

	resetEntity(data.targetId);

	*/
	const groupAssignments = () => {
		for(let i = 0; i<data.assignments.length; i++) {
			const curr = data.assignments[i];
			const key = curr.
			tasksGrouped[]
		}
	}

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
		<h3>Filter Task Types</h3>
		<ul class="sidebar">
			<li>
				<input type="checkbox" name="isAllSvcTypeId" id="isAllSvcTypeId" />
				<label for="isAllSvcTypeId">ALL</label>
			</li>
			{#each storeGet('svcTypeId') as item}
				<li>
					<input type="checkbox" name="listOfSvcTypeIds" id="svcTypeId-{item.code}" />
					<label for="svcTypeId-{item.code}"> {item.label} </label>
				</li>
			{/each}
		</ul>
		<hr />
		<h3>Filter Years</h3>
		<input type="text" name="" />
	</nav>
</div>

<main>
	<h2>Folder Tasks</h2>
	<!---
	<div class="button-group">
		<button>Apply Filter</button>
	</div>
	-->

	<table class="border-all">
		<thead>
			<tr>
				<th class="narrow">#</th>
				<th class="narrow">Task</th>
				<th class="narrow">Year</th>
				<th>Owner</th>
				<th>Pic</th>
				<th>External SP</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each data.assignments as item, index}
				{@const svcTypeLabel = findSvcTypeId(item.svcTypeId)}
				<tr>
					<td class="narrow">{index + 1}. </td>
					<td class="narrow">{svcTypeLabel}</td>
					<td class="narrow">{item.svcYear}</td>
					<td>{item.entityName}</td>
					<td>{item.picName}</td>
					<td>{item.spName}</td>
					<td>
						<a href="/tasks/{item.svcYear}/{svcTypeLabel}?taskId={item.taskId}">Edit</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>

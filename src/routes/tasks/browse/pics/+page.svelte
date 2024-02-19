<script lang="ts">
	import type { ClientCoDto } from '$lib/shared/dto/ProfileDto.js';
	import { MySvcTypeId, type SvcTypeId, type SvcTypeLabel } from '$lib/shared/dto/enums.js';
	import type { TaskAssignmentDto } from '$lib/shared/dto/TaskDto.js';
	import {
		findProfileStatus,
		findSvcTypeId,
		findTaskStatusCode,
		findWorkflowStatusCode,
		showCapitalise,
		storeGet
	} from '$lib/shared/dtoHelpers';
	import type { PageData } from './$types.js';

	export let data: PageData;
	console.log('tracing data: ', data);

	let sortedNames = data.uniqPicNames.sort();
	let svcTypeSelected: SvcTypeId[] = [];
	let picSelected: string[] = [];
	let tasksGrouped = {} as Record<string, TaskAssignmentDto[]>;

	let years: number[] = [new Date().getFullYear()];
	let yearText = '';
	let viewAllYears = false;

	const selectAllSvcType = () => {
		svcTypeSelected = Object.values(MySvcTypeId);
	};
	const clearAllSvcType = () => {
		svcTypeSelected = [];
	};
	selectAllSvcType();

	const selectAllPic = () => {
		picSelected = [...sortedNames];
	};
	const clearAllPic = () => {
		picSelected = [];
	};
	selectAllPic();

	const processAssignments = () => {
		// NOTE: filtering
		tasksGrouped = {};
		const temp = data.assignments.filter((a) => {
			const isSvcTypeMatched = svcTypeSelected.includes(a.svcTypeId);
			const isYearMatched = years.includes(a.svcYear);
			const isPicMatched = picSelected.includes(a.picName);
			return isSvcTypeMatched && (viewAllYears || (!viewAllYears && isYearMatched)) && isPicMatched;
		});
		const unassigned: TaskAssignmentDto[] = [];
		const unassignedKey = '-- Unassigned --';

		// NOTE: grouping
		for (let i = 0; i < temp.length; i++) {
			const curr = temp[i];
			const key = curr.picName;
			if (key === unassignedKey) {
				unassigned.push(curr);
				continue;
			}
			const keyExists = key in tasksGrouped;
			if (!keyExists) tasksGrouped[key] = [];
			tasksGrouped[key].push(curr);
		}
		tasksGrouped[unassignedKey] = unassigned;
	};

	const autoAddHandler = (e: Event) => {
		const el = e.target as HTMLInputElement;
		const { value } = el;

		const MIN_LENGTH = 4;
		let filtered = value.replace(/[^0-9]/, '');

		if (filtered.length >= MIN_LENGTH) {
			const validYear = filtered.slice(0, MIN_LENGTH);
			years = [...years, Number(validYear)];
			filtered = filtered.slice(MIN_LENGTH);
		}
		yearText = filtered;
	};

	const removeYear = (index: number) => {
		years.splice(index, 1);
		years = [...years];
	};

	processAssignments();
	$: svcTypeSelected, processAssignments();
	$: picSelected, processAssignments();
	$: years, processAssignments();
	$: viewAllYears, processAssignments();

	const getPicLink = (item: TaskAssignmentDto, svcTypeLabel: string) => {
		const qs = new URLSearchParams();
		qs.append("taskId", item.taskId.toString());
		return `/tasks/${item.svcYear}/${svcTypeLabel}?${qs.toString()}`
	}
</script>

<div>
	<h1><a href="/"> MasterList </a></h1>
	<nav>
		<h3>Filter PIC</h3>
		<div class="button-group">
			<button class="small" on:click={() => selectAllPic()}>Select All</button>
			<button class="small" on:click={() => clearAllPic()}>Clear All</button>
		</div>
		<ul class="pic">
			{#each sortedNames as item, key}
				<li>
					<input
						type="checkbox"
						name="listOfPics"
						id="picId-{item}"
						value={item}
						bind:group={picSelected}
					/>
					<label for="picId-{item}"> {item} </label>
				</li>
			{/each}
		</ul>

		<hr />
		<h3>Filter Task Types</h3>
		<div class="button-group">
			<button class="small" on:click={() => selectAllSvcType()}>Select All</button>
			<button class="small" on:click={() => clearAllSvcType()}>Clear All</button>
		</div>
		<ul class="sidebar">
			{#each storeGet('svcTypeId') as item}
				<li>
					<input
						type="checkbox"
						name="listOfSvcTypeIds"
						id="svcTypeId-{item.code}"
						value={item.code}
						bind:group={svcTypeSelected}
					/>
					<label for="svcTypeId-{item.code}"> {item.label} </label>
				</li>
			{/each}
		</ul>

		<hr />
		<h3>Filter Years</h3>
		<div class="mb-medium">
			<input type="checkbox" bind:checked={viewAllYears} id="bypassYears" />
			<label for="bypassYears">View all years</label>
		</div>

		<input
			type="text"
			name="yearText"
			id="yearText"
			bind:value={yearText}
			on:input={autoAddHandler}
		/>
		<ul class="years-field">
			{#each years as item, key}
				<li>
					{item}
					<input type="button" class="small" on:click={(e) => removeYear(key)} value="Remove" />
				</li>
			{/each}
		</ul>
	</nav>
</div>

<main>
	<h2>PIC Tasks</h2>
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
				<th>Owner</th>
				<th class="narrow">Year</th>
				<th>Task Status</th>
				<th>Workflow Status</th>
				<th>Actions</th>
			</tr>
		</thead>
		{#each Object.entries(tasksGrouped) as [key, value]}
			{@const titleCapitalised = showCapitalise(key)}
			<tbody>
				<tr><td colspan="7"><h4>{titleCapitalised}</h4></td></tr>
				{#each value as item, index}
					{@const svcTypeLabel = findSvcTypeId(item.svcTypeId)}
					<tr>
						<td class="narrow">{index + 1}. </td>
						<td class="narrow">{svcTypeLabel}</td>
						<td>{item.entityName}</td>
						<td class="narrow">{item.svcYear}</td>
						<td class="narrow">{findTaskStatusCode(item.taskStatusCode)}</td>
						<td class="narrow">{findWorkflowStatusCode(item.workflowStatus)}</td>
						<td>
							<a href={getPicLink(item, svcTypeLabel)}>Edit</a>
						</td>
					</tr>
				{/each}
			</tbody>
		{/each}
	</table>
</main>

<style>
	.years-field {
		list-style-type: none;
		padding-left: 0rem;
	}
</style>

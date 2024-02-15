<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import ClientCo from '$lib/components/display/ClientCo.svelte';
	import TaskAccount from '$lib/components/forms/TaskAccount.svelte';
	import TaskAudit from '$lib/components/forms/TaskAudit.svelte';
	import TaskCP204 from '$lib/components/forms/TaskCP204.svelte';
	import TaskCosec from '$lib/components/forms/TaskCosec.svelte';
	import TaskFormC from '$lib/components/forms/TaskFormC.svelte';
	import TaskFormE from '$lib/components/forms/TaskFormE.svelte';
	import type { ClientCoDto } from '$lib/shared/dto/ProfileDto';
	import type { TaskClientDto } from '$lib/shared/dto/TaskDto';
	import { MyEntityType, MySvcTypeId } from '$lib/shared/dto/enums';
	import {
		findSvcStatusCode,
		findSvcTypeId,
		isFolderSuspended,
		showCapitalise
	} from '$lib/shared/dtoHelpers';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let tasksFiltered: TaskClientDto[] = data.tasks;
	let taskTargeted: TaskClientDto;
	let taskYear: string;
	let taskLabel: string;

	// INTERACTIVITY: side menu
	const filterHandler = (event: Event) => {
		const el = event.target as HTMLInputElement;
		const v = el.value.toLowerCase();

		if (v.length > 0) {
			tasksFiltered = data.tasks.filter((t) => {
				const n = t.entityName.toLowerCase();
				return new RegExp(v).test(n);
			});
		} else {
			tasksFiltered = data.tasks;
		}
	};

	const resetTask = (targetId: number) => {
		taskTargeted = data.tasks.find((t) => {
			return t.taskId == targetId;
		}) as TaskClientDto;

		taskLabel = showCapitalise(findSvcTypeId(taskTargeted.svcTypeId));
		taskYear = taskTargeted.svcYear;

		// console.log('tracing targeted', taskTargeted);
	};
	resetTask(data.taskId);

	// console.log("tracing data", data, taskTargeted)

	// INTERACTIVITY: page
	const getUrl = (data: PageData, taskId: number) =>
		`/tasks/${data.year}/${data.svcTypeLabel}?taskId=${taskId}`;

	const getClientUrl = (client: ClientCoDto) => {
		let url = '';
		if (client.entityType === MyEntityType.INDIVIDUAL) url = `/clients/indi/${client.entityId}`;
		else if (client.entityType === MyEntityType.COMPANY) url = `/clients/co/${client.entityId}`;
		return url;
	};

	/*
	const getFolderUrl = (client: ClientCoDto) => {
		let url = '';
		if (client.entityType === MyEntityType.INDIVIDUAL)
			url = `/clients/indi/${client.entityId}/services`;
		else if (client.entityType === MyEntityType.COMPANY)
			url = `/clients/co/${client.entityId}/services`;
		return url;
	};
	*/
	afterNavigate(() => {
		resetTask(data.taskId);
		// resetKeys(data.services);
	});
</script>

<div>
	<h1><a href="/"> MasterList </a></h1>
	<nav>
		<input type="text" class="mb-small" placeholder="Filter Names" on:input={filterHandler} />
		<ul class="sidebar">
			{#each tasksFiltered as item}
				<li><a href={getUrl(data, item.taskId)}>{item.entityName}</a></li>
			{/each}
		</ul>
	</nav>
</div>

<main>
	<nav class="breadcrumb">
		<ul>
			<li><a href="/tasks">Tasks</a></li>
			<li>[Task ID: {data.taskId}]</li>
		</ul>
	</nav>
	<h2>Edit Task</h2>

	<h3><u>Task Owner Details</u></h3>
	<div class="button-group">
		<a class="button small" href={getClientUrl(taskTargeted)}>Edit Task Owner</a>
	</div>

	<ClientCo targetEntity={taskTargeted} />

	<h3><u>Folder Details</u></h3>
	<div class="button-group">
		<input
			type="button"
			class="small"
			value="Create Folders"
			on:click={() => {
				goto(`/clients/co/${taskTargeted.entityId}/services`);
			}}
		/>
		<input
			type="button"
			class="small"
			value="Create Tasks"
			on:click={() => {
				goto(`/clients/co/${taskTargeted.entityId}/tasks`);
			}}
		/>
	</div>
	<table class="border-all">
		<thead>
			<tr>
				<th class="narrow">ID</th>
				<th>Service Folder Type</th>
				<th>Default PIC Assigned</th>
				<th>Default External SP</th>
				<th>Folder Status</th>
			</tr>
		</thead>
		<tbody>
			<tr class={isFolderSuspended(taskTargeted.svcStatusCode) ? 'gray-text' : ''}>
				<td class="narrow"> {taskTargeted.svcId} </td>
				<td> {findSvcTypeId(taskTargeted.svcTypeId)} </td>
				<td> {taskTargeted.picName} </td>
				<td> {taskTargeted.svcProviderName} </td>
				<td> {findSvcStatusCode(taskTargeted.svcStatusCode)} </td>
			</tr>
		</tbody>
	</table>

	<h3><u>{taskYear} {taskLabel} Details</u></h3>

	<form method="POST" action="?/save">
		<input type="hidden" readonly name="taskId" value={taskTargeted.taskId} />
		<input type="hidden" readonly name="svcId" value={taskTargeted.svcId} />
		<input type="hidden" readonly name="ownerId" value={taskTargeted.ownerId} />

		{#if taskTargeted.svcTypeId === MySvcTypeId.ACCOUNT}
			<TaskAccount />
		{:else if taskTargeted.svcTypeId === MySvcTypeId.AUDIT}
			<TaskAudit />
		{:else if taskTargeted.svcTypeId === MySvcTypeId.COSEC}
			<TaskCosec />
		{:else if taskTargeted.svcTypeId === MySvcTypeId.FORM_C}
			<TaskFormC />
		{:else if taskTargeted.svcTypeId === MySvcTypeId.FORM_E}
			<TaskFormE />
		{:else if taskTargeted.svcTypeId === MySvcTypeId.CP204}
			<TaskCP204 />
		{/if}

		<div class="form-actions">
			<input type="submit" value="Save" />
		</div>

	</form>
</main>

<!-- year indication -->

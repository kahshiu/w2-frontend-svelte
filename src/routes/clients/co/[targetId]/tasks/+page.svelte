<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import Abbrev from '$lib/components/display/Abbrev.svelte';
	import ClientCo from '$lib/components/display/ClientCo.svelte';
	import type { SvcProviderCoDto, ClientCoDto } from '$lib/shared/dto/ProfileDto';
	import {
		findSvcStatusCode,
		findSvcTypeId,
		findTaskStatusCode,
		isFolderSuspended,
		isSelected,
		isTaskHidden,
		isTaskKived,
		sortedSvcTypeId
	} from '$lib/shared/dtoHelpers';
	import type { PageData } from './$types.js';

	export let data: PageData;

	// console.log('tracing data: ', data);

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

	// Display helper functions
	const findHomePic = (svcProviders: SvcProviderCoDto[], targetId: number | null | undefined) => {
		const unassignedName = `-- Unassigned --`;
		if (targetId === undefined || targetId === null) return unassignedName;

		const homeStaff = svcProviders[0].staff;
		const homePic = homeStaff.find((s) => {
			return s.entityId === targetId;
		});
		return homePic?.staffName ?? unassignedName;
	};

	const findSvcProvider = (
		svcProviders: SvcProviderCoDto[],
		targetId: number | null | undefined
	) => {
		const unassignedName = `-- Unassigned --`;
		if (targetId === undefined && targetId === null) return unassignedName;

		const targetCo = svcProviders.find((s) => {
			return s.entityId === targetId;
		});
		return targetCo?.entityName ?? unassignedName;
	};

	let years: number[] = [];
	let yearText = '';

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

		// console.log(value, "")
	};

	const removeYear = (index: number) => {
		years.splice(index, 1);
		years = [...years];
	};

	let isInvalid = true;
	let message = 'At least ONE entry in years';
	$: {
		isInvalid = years.length == 0;
	}

	const handleSubmit = (e: Event) => {
		const taskForm = document.getElementById('taskForm') as HTMLFormElement;
		const isYes = confirm('This will submit your changes. Proceed?');
		if (isYes) {
			taskForm.submit();
		}
	};

	afterNavigate(() => {
		resetEntity(data.targetId);
	});
</script>

<div>
	<h1><a href="/"> MasterList </a></h1>
	<nav>
		<input type="text" class="mb-small" placeholder="Filter Names" on:input={filterHandler} />
		<ul class="sidebar">
			{#each clientsFiltered as item}
				<li><a href="/clients/co/{item.entityId}/tasks">{item.entityName}</a></li>
			{/each}
		</ul>
	</nav>
</div>

<main>
	<nav class="breadcrumb">
		<ul>
			<li><a href="/clients">List of Clients</a></li>
			<li><a href="/clients/co/{targetEntity?.entityId}">{targetEntity?.entityName}</a></li>
			<li>Create Tasks</li>
		</ul>
	</nav>
	<h2>Create Tasks</h2>

	<h3><u>Client Details</u></h3>
	<div class="button-group">
		<a class="button small" href="/clients/co/{targetEntity?.entityId}">Edit Client Details</a>
	</div>
	<ClientCo {targetEntity} />

	<h3><u>Client Folders</u></h3>
	<div class="button-group">
		<input
			type="button"
			class="small"
			value="Create Folders"
			on:click={() => {
				goto(`/clients/co/${data.targetId}/services`);
			}}
		/>
	</div>
	{#if data.services.length > 0}
		<table class="border-all">
			<thead>
				<tr>
					<th class="narrow">ID</th>
					<th>Folder Type</th>
					<th>Default PIC Assigned</th>
					<th>Default External SP</th>
					<th>Folder Status</th>
				</tr>
			</thead>
			<tbody>
				{#each sortedSvcTypeId as item, key}
					{@const targetService = data.services.find((s) => s.svcTypeId == item.code)}
					{#if targetService}
						<tr class={isFolderSuspended(targetService.svcStatusCode) ? 'gray-text' : ''}>
							<td class="narrow"> {targetService.svcId} </td>
							<td> {findSvcTypeId(targetService.svcTypeId)} </td>
							<td> {findHomePic(data.svcProviders, targetService.defaultPicId)} </td>
							<td> {findSvcProvider(data.svcProviders, targetService.defaultSvcProviderId)} </td>
							<td> {findSvcStatusCode(targetService.svcStatusCode)} </td>
						</tr>
					{/if}
				{/each}
			</tbody>
			<tfoot>
				<div class="field-description">
					<Abbrev></Abbrev>
				</div>
			</tfoot>
		</table>
	{:else}
		-- No folders created --
	{/if}

	<h3><u>Client Tasks</u></h3>
	{#if data.tasks.length > 0}
		<table class="border-all">
			<thead>
				<tr>
					<th class="narrow">Year</th>
					<th>Task Type</th>
					<th>PIC Assigned</th>
					<th>External SP</th>
					<th>Task Status</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{#each data.tasks as item, key}
					{#if !isTaskHidden(item)}
						<tr class={isTaskKived(item.taskStatusCode) ? 'gray-text' : ''}>
							<td class="narrow"> {item.svcYear} </td>
							<td> {findSvcTypeId(item.svcTypeId)} </td>
							<td> {findHomePic(data.svcProviders, item.picId)} </td>
							<td> {findSvcProvider(data.svcProviders, item.svcProviderId)} </td>
							<td> {findTaskStatusCode(item.taskStatusCode)} </td>
							<td>
								<a href="/tasks/{item.svcYear}/{findSvcTypeId(item.svcTypeId)}?taskId={item.taskId}"
									>Edit</a
								>
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	{:else}
		-- No tasks created --
	{/if}

	<h3><u>Tasks Creation</u></h3>
	<form id="taskForm" method="POST" action="?/save">
		<ul>
			<li>You should create folders first, then add tasks to it.</li>
			<li>You cannot add tasks to SUSPENDED folders.</li>
		</ul>
		{#if data.services.length > 0}
			<table>
				<thead>
					<tr>
						<th>Types of Task</th>
						<th>PIC</th>
						<th>Ext. SP</th>
					</tr>
				</thead>
				<tbody>
					{#each sortedSvcTypeId as item, key}
						{@const targetService = data.services.find((s) => s.svcTypeId == item.code)}
						{#if targetService}
							{@const isDisabled = isFolderSuspended(targetService.svcStatusCode)}
							{@const fnameOwnerId = `service.${item.label}.ownerId`}
							{@const fnameYear = `service.${item.label}.listOfSvcYears`}
							{@const fnameSvcId = `service.${item.label}.svcId`}
							{@const fnameSvcTypeId = `service.${item.label}.svcTypeId`}
							{@const fnamePicId = `service.${item.label}.picId`}
							{@const fnameSvcProviderId = `service.${item.label}.svcProviderId`}
							<tr>
								<td>
									<input
										type="hidden"
										readonly
										disabled={isDisabled}
										name={fnameYear}
										value={years.join(',')}
									/>
									<input
										type="checkbox"
										id={fnameSvcId}
										name={fnameSvcId}
										disabled={isDisabled}
										value={targetService.svcId}
									/>
									<input
										type="hidden"
										readonly
										disabled={isDisabled}
										name={fnameSvcTypeId}
										value={targetService.svcTypeId}
									/>
									<input
										type="hidden"
										readonly
										disabled={isDisabled}
										name={fnameOwnerId}
										value={data.targetId}
									/>
									<label class="field-label" for={fnameSvcId}>{item.label}</label>
								</td>
								<td>
									<select name={fnamePicId} disabled={isDisabled}>
										<option value="0" selected={targetService.defaultPicId === null}>
											-- Unassigned --
										</option>
										{#each data.svcProviders[0].staff as item}
											{@const isStaffSelected = isSelected(
												targetService.defaultPicId,
												item.entityId
											)}
											<option value={item.entityId} selected={isStaffSelected}
												>{item.staffName}</option
											>
										{/each}
									</select>
								</td>
								<td>
									<select name={fnameSvcProviderId} disabled={isDisabled}>
										<option value="0" selected={targetService.defaultSvcProviderId === null}>
											-- Unassigned --
										</option>
										{#each data.svcProviders as item}
											{@const isSPSelected = isSelected(
												targetService.defaultSvcProviderId,
												item.entityId
											)}
											<option value={item.entityId} selected={isSPSelected}
												>{item.entityName}</option
											>
										{/each}
									</select>
								</td>
							</tr>
						{/if}
					{/each}
				</tbody>
			</table>
			<h4>Years</h4>
			<div class="row-add">
				<input
					type="text"
					name="yearText"
					id="yearText"
					bind:value={yearText}
					on:input={autoAddHandler}
				/>
				<label for="yearText">
					Type into textbox YEAR. Years will populate on every 4th digit.
				</label>
			</div>
			<ul class="years-field">
				{#each years as item, key}
					<li>
						<input type="number" name="years" value={item} />
						<input type="button" class="small" on:click={(e) => removeYear(key)} value="Remove" />
					</li>
				{/each}
			</ul>

			<div class="form-actions">
				{#if isInvalid}
					<p>{message}</p>
				{/if}
				<input type="submit" disabled={isInvalid} value="Save" />
			</div>
		{:else}
			-- No folders created --
		{/if}
	</form>

	<br />
</main>

<style>
	.years-field {
		list-style-type: none;
		padding-left: 0rem;
	}
	.years-field li {
		padding: var(--spacing-x-small) var(--spacing-small);
	}
	.row-add {
		background-color: var(--color-blue-200);
		padding: var(--spacing-x-small) var(--spacing-small);
	}
</style>

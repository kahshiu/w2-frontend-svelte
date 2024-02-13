<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import ServiceFolder from '$lib/components/ServiceFolder.svelte';
	import ClientCo from '$lib/components/display/ClientCo.svelte';
	import type { SvcProviderCoDto, ClientCoDto, StaffSvelteDto } from '$lib/shared/dto/ProfileDto';
	import { MySvcStatusCode } from '$lib/shared/dto/enums.js';
	import { filledObj, findSvcStatusCode, findSvcTypeId, isArrayOfEmptyObj } from '$lib/shared/dtoHelpers';
	import type { PageData } from './$types.js';

	export let data: PageData;

	console.log("tracing data: ", data)

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
	const findHomePic = (svcProviders: SvcProviderCoDto[], targetId: number | null) => {
		const unassignedName = `-- Unassigned --`;
		if (targetId === null) return unassignedName;

		const homeStaff = svcProviders[0].staff;
		const homePic = homeStaff.find((s) => {
			return s.entityId === targetId;
		});
		return homePic?.staffName ?? unassignedName;
	};

	const findSvcProvider = (svcProviders: SvcProviderCoDto[], targetId: number | null) => {
		const unassignedName = `-- Unassigned --`;
		if (targetId === null) return unassignedName;

		const targetCo = svcProviders.find((s) => {
			return s.entityId === targetId;
		});
		return targetCo?.entityName ?? unassignedName;
	};


	const isSelected = (target: number | null, curr: number | null) => {
		if (target === null || curr === null) return false;
		return target === curr;
	};

	let years: number[] = [];
	let newYear: number = 0;
	const addYear = () => {
		years = [...years, newYear];
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
	<h1>MasterList</h1>
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
			<li><a href="/clients">Clients</a></li>
			<li><a href="/clients/co/{targetEntity?.entityId}">{targetEntity?.entityName}</a></li>
			<li>Tasks</li>
		</ul>
	</nav>
	<h2>Create Service Tasks</h2>

	<h3><u>Client Details</u></h3>
	<ClientCo {targetEntity} />

	<h3><u>Folder Details</u></h3>
	<div class="button-group">
		<input
			type="button"
			class="small"
			value="Manage Service Folders"
			on:click={() => {
				goto(`/clients/co/${data.targetId}/services`);
			}}
		/>
	</div>
	{#if isArrayOfEmptyObj(Object.values(data.services))}
		-- No folders created --
	{:else}
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
				{#each Object.entries(data.services) as [key, value]}
					{#if filledObj(value)}
						<tr
							class={[MySvcStatusCode.SUSPENDED].includes(value?.svcStatusCode)
								? 'gray-text'
								: ''}
						>
							<td class="narrow">
								{value?.svcId}
							</td>
							<td>
								{findSvcTypeId(value?.svcTypeId)}
							</td>
							<td>
								{findHomePic(data.svcProviders, value.defaultPicId)}
							</td>
							<td>
								{findSvcProvider(data.svcProviders, value.defaultSvcProviderId)}
							</td>
							<td>
								{findSvcStatusCode(value?.svcStatusCode)}
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	{/if}

	<h3><u>Task Creation</u></h3>
	<form id="taskForm" method="POST" action="?/save" on:submit|preventDefault={handleSubmit}>
		<ul>
			<li>You should create folders first, then add tasks to it.</li>
			<li>You cannot add tasks to SUSPENDED folders.</li>
		</ul>
		{#if isArrayOfEmptyObj(Object.values(data.services))}
			-- No folders created --
		{:else}
			<table>
				<thead>
					<tr>
						<th>Types of Task</th>
						<th>PIC</th>
						<th>Ext. SP</th>
					</tr>
				</thead>
				<tbody>
					{#each Object.entries(data.services) as [key, value]}
						{@const isDisabled = [MySvcStatusCode.SUSPENDED].includes(value.svcStatusCode)}
						{#if filledObj(value)}
							<tr>
								<td>
									<input
										type="checkbox"
										value={value.svcTypeId}
										id={`svcTypeId-${value.svcTypeId}`}
										name="listOfSvcTypeIds"
										disabled={isDisabled}
									/>
									<label class="field-label" for={`svcTypeId-${value.svcTypeId}`}>
										{findSvcTypeId(value?.svcTypeId)}
									</label>
								</td>
								<td>
									<select name={'asdf'} disabled={isDisabled}>
										<option value="0" selected={value.defaultPicId === null}>
											-- Unassigned --
										</option>
										{#each data.svcProviders[0].staff as item}
											<option
												value={item.entityId}
												selected={isSelected(value.defaultPicId, item.entityId)}
												>{item.staffName}</option
											>
										{/each}
									</select>
								</td>
								<td>
									<select name={'asdf'} disabled={isDisabled}>
										<option value="0" selected={value.defaultSvcProviderId === null}>
											-- Unassigned --
										</option>
										{#each data.svcProviders as item}
											<option
												value={item.entityId}
												selected={isSelected(value.defaultSvcProviderId, item.entityId)}
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
			<input type="hidden" readonly name="entityId" value={data.targetId} />
			<div class="row-add">
				<input type="number" name="newYear" min="1980" max="2100" bind:value={newYear} />
				<input type="button" class="small" on:click={(e) => addYear()} value="Add" />
			</div>
			<ul class="years-field">
				{#each years as item, key}
					<li>
						<input type="number" name="years" min="1980" max="2100" value={item} />
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

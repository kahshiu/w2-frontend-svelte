<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import ServiceFolder from '$lib/components/ServiceFolder.svelte';
	import ClientCo from '$lib/components/display/ClientCo.svelte';
	import type { ClientCoDto } from '$lib/shared/dto/ProfileDto';
	import type { ServiceDto } from '$lib/shared/dto/ServiceDto.js';
	import type { DefinitionDto, MySvcTypeId, SvcTypeId } from '$lib/shared/dto/enums';
	import { storeGet } from '$lib/shared/dtoHelpers';

	export let data;

	let clientsFiltered = data.clients;
	let targetEntity: ClientCoDto;

	// INTERACTIVITY: side menu
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

	const resetEntity = (targetId: number) => {
		targetEntity = data.clients.find((s) => {
			return s.entityId == targetId;
		}) as ClientCoDto;
	};

	resetEntity(data.targetId);

	// INTERACTIVITY: service types
	const storeSvcTypeId = storeGet("svcTypeId") as DefinitionDto<typeof MySvcTypeId>[];
	const sortedSvcTypeId = storeSvcTypeId.sort((a, b) => {
		return a.code - b.code;
	})

	let disabledCodes: SvcTypeId[] = [];
	let checkedCodes: SvcTypeId[] = [];
	let selectedCode: SvcTypeId | null = null;
	let viewAll: boolean = true;
	$: {
		if (checkedCodes.length > 0 && selectedCode === null) {
			selectedCode = checkedCodes[0];
		}
	}

	const resetKeys = (targetServices: ServiceDto[]) => {
		disabledCodes = [];
		checkedCodes = [];
		selectedCode = null;
		viewAll = true;

		for (const item of targetServices) {
			const code = item.svcTypeId;
			disabledCodes.push(code);
			checkedCodes.push(code);
			if (selectedCode === null) {
				selectedCode = code;
			}
		}
		/*
		console.log("tracing variables: disabledCodes", disabledCodes)
		console.log("tracing variables: checkedCodes", checkedCodes)
		console.log("tracing variables: selectedCode", selectedCode)
		*/
	};

	afterNavigate(() => {
		resetEntity(data.targetId);
		resetKeys(data.services);
	});
</script>

<div>
	<h1>MasterList</h1>
	<nav>
		<input type="text" class="mb-small" placeholder="Filter Names" on:input={filterHandler} />
		<ul class="sidebar">
			{#each clientsFiltered as item}
				{@const url = `/clients/co/${item.entityId}/services`}
				<li><a href={url}>{item.entityName}</a></li>
			{/each}
		</ul>
	</nav>
</div>

<main>
	<nav class="breadcrumb">
		<ul>
			<li><a href="/clients">Clients</a></li>
			<li><a href="/clients/co/{targetEntity?.entityId}">{targetEntity?.entityName}</a></li>
			<li>Services</li>
		</ul>
	</nav>
	<h2>Create Service Folders</h2>

	<h3><u>Client Details</u></h3>
	<ClientCo {targetEntity} />

	<h3><u>Folder Details</u></h3>
	<div class="button-group">
		<input
			type="button"
			class="small"
			value="Manage Tasks for Folders"
			on:click={() => {
				goto(`/clients/co/${data.targetId}/tasks`);
			}}
		/>
	</div>
	<div class="data-2-col">
		<table>
			<thead>
				<tr>
					<th>Available Folders</th>
					<th>Action</th>
				</tr>
			</thead>

			<tbody>
				{#each sortedSvcTypeId as item, key}
					{@const fieldId = `initService-${item.label}`}
					{@const isDisabled = disabledCodes.includes(item.code)}
					<tr>
						<td>
							<input
								type="checkbox"
								id={fieldId}
								name="initService"
								value={item.code}
								disabled={isDisabled}
								bind:group={checkedCodes}
							/>
							<label for={fieldId}>{item.label}</label>
						</td>
						<td>
							<button
								class="small {checkedCodes.includes(item.code) ? '' : 'hidden'}"
								on:click={() => {
									selectedCode = item.code;
									viewAll = false;
								}}>View</button
							>
						</td>
					</tr>
				{/each}
				<tr class="row-add">
					<td class="narrow">
						<i>
							Toggle to all view available service folders
							<div class={viewAll ? 'hidden' : ''}>Selected: <b>View One Only</b></div>
							<div class={!viewAll ? 'hidden' : ''}>Selected: <b>View All</b></div>
						</i>
					</td>
					<td>
						<button
							class="small"
							disabled={checkedCodes.length === 0}
							on:click={() => {
								viewAll = !viewAll;
							}}>View All</button
						>
					</td>
				</tr>
			</tbody>
		</table>
		<ul>
			<li>Tick checkboxes to select specific folders for creation.</li>
			<li>You only need to create folders <i><u>once</u></i>.</li>
			<li>Tasks can be added <i><u>after</u></i> folder(s) are created.</li>
			<li>
				You can subsequenly change folder status to <bold>ACTIVE/ SUSPEND</bold>.
			</li>
			<li>
				<bold>SUSPEND-ed</bold> folders will <i><u>cease</u></i> to create tasks.
			</li>
		</ul>
	</div>

	<form method="POST" action="?/save">
		{#each sortedSvcTypeId as { label, code }}
			{#if checkedCodes.includes(code)}
				{@const targetSvc = data.services.find((item)=>item.svcTypeId == code)}
				<div class={selectedCode === code || viewAll ? '' : 'hidden'}>
					<ServiceFolder
						svcProviders={data.svcProviders}
						ownerId={data.targetId}
						svcTypeId={code}
						defaultPicId={targetSvc?.defaultPicId ?? 0}
						defaultSvcProviderId={targetSvc?.defaultSvcProviderId ?? 0}
						remarks={targetSvc?.remarks ?? []}
						svcStatusCode={targetSvc?.svcStatusCode ?? 0}
					/>
				</div>
			{/if}
		{/each}
		<div class="form-actions">
			<p>
				If you do encounter unresponsive save, please "view all" folders. There are invalid form
				fields, esp Folder Status
			</p>
			<input type="submit" value="Save" />
		</div>
	</form>
</main>

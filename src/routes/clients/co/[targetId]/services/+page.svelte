<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import ServiceFolder from '$lib/components/ServiceFolder.svelte';
	import ClientCo from '$lib/components/disp/ClientCo.svelte';
	import { MyDefinition } from '$lib/shared/MyDefinition';
	import type { ClientCoDto } from '$lib/shared/dto/ProfileDto.js';
	import type { ServiceDataset, ServiceKeys } from '$lib/shared/dto/ServiceDto.js';
	import { filledObj } from '$lib/shared/utils.js';

	export let data;

	let clientsFiltered = data.clients;
	let targetEntity: ClientCoDto;
	let myDefinition = new MyDefinition(data.definitions);

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

	// INTERACTIVITY: service types
	let disabledKeys: ServiceKeys[] = [];
	let checkedKeys: ServiceKeys[] = [];
	let selectedKey: ServiceKeys | null = null;
	let viewAll: boolean = false;
	$: {
		if (checkedKeys.length > 0 && selectedKey === null) {
			selectedKey = checkedKeys[0];
		}
	}

	const resetKeys = (targetServices: ServiceDataset) => {
		disabledKeys = [];
		checkedKeys = [];
		selectedKey = null;
		viewAll = false;

		for (const key in targetServices) {
			const cKey = key as ServiceKeys;
			const cService = targetServices[cKey];
			const cExists = filledObj(cService);
			if (cExists) {
				disabledKeys.push(cKey);
				checkedKeys.push(cKey);
				if (selectedKey === null) {
					selectedKey = cKey;
				}
			}
		}
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
				<li><a href="/clients/co/{item.entityId}/services">{item.entityName}</a></li>
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

	<ClientCo {myDefinition} {targetEntity} />

	<br />
	<div class="data-2-col">
		<table>
			<thead>
				<tr>
					<th>Available Services</th>
					<th>Action</th>
				</tr>
			</thead>

			<tbody>
				{#each Object.entries(data.definitions.serviceType) as [_, value]}
					<tr>
						<td>
							<input
								type="checkbox"
								id="initService-{value.label}"
								name="initService"
								value={value.label}
								disabled={disabledKeys.includes(value.label)}
								bind:group={checkedKeys}
							/>
							<label for="initService-{value.label}">{value.label}</label>
						</td>
						<td>
							<button
								class="small {checkedKeys.includes(value.label)? '':'hidden'}"
								on:click={() => {
									selectedKey = value.label;
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
							disabled={checkedKeys.length === 0}
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
			<li>
				You can subsequenly change folder status to <bold>ACTIVE/ SUSPEND</bold>.
			</li>
			<li>
				<bold>SUSPEND-ed</bold> folders will <i><u>cease</u></i> to create tasks.
			</li>
		</ul>
	</div>

	<form method="POST" action="?/save">
		{#each data.definitions.serviceType as { label, code }}
			{#if checkedKeys.includes(label)}
				<div class={selectedKey === label || viewAll ? '' : 'hidden'}>
					<ServiceFolder
						definitions={data.definitions}
						svcProviders={data.svcProviders}
						ownerId={data.targetId}
						svcTypeId={code}
						defaultPicId={data.services?.[label]?.defaultPicId ?? 0}
						defaultSvcProviderId={data.services?.[label]?.defaultSvcProviderId ?? 0}
						remarks={data.services?.[label]?.remarks ?? []}
						svcStatusCode={data.services?.[label]?.svcStatusCode ?? 0}
					/>
				</div>
			{/if}
		{/each}
		<div class="form-actions">
			<input type="submit" value="Save" />
		</div>
	</form>
</main>

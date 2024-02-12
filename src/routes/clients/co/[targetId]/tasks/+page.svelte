<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import ServiceFolder from '$lib/components/ServiceFolder.svelte';
	import ClientCo from '$lib/components/disp/ClientCo.svelte';
	import { MyDefinition } from '$lib/shared/MyDefinition';
	import type { SvcProviderCoDto, ClientCoDto, StaffSvelteDto } from '$lib/shared/dto/ProfileDto';
	import type { ServiceDataset, ServiceKeys } from '$lib/shared/dto/ServiceDto.js';
	import { filledObj } from '$lib/shared/utils.js';

	export let data;

	console.log('tracing data: ', data);

	let clientsFiltered = data.clients;
	let myDefinition = new MyDefinition(data.definitions);
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

	const isArrayOfEmptyObj = (arr: any[]) => {
		const isFilled = Object.entries(arr).filter(([key, value]) => filledObj(value));
		return isFilled.length == 0;
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
	<ClientCo {myDefinition} {targetEntity} />

  <h3><u>Service Details</u></h3>
	{#if isArrayOfEmptyObj(data.services)}
		-- No service folders to show --
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
						<tr>
							<td class="narrow">
								{value?.svcId}
							</td>
							<td>
								{myDefinition.findEntry('serviceType', value?.svcTypeId)}
							</td>
							<td>
								{findHomePic(data.svcProviders, value.defaultPicId)}
							</td>
							<td>
								{findSvcProvider(data.svcProviders, value.defaultSvcProviderId)}
							</td>
							<td>
								{myDefinition.findEntry('serviceStatusCode', value?.svcStatusCode)}
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	{/if}

  <h3><u>Task Creation</u></h3>
  <form method="POST" action="?/save">
    <div class="form-col-2">
      <div class="form-field">
        <input type="hidden" readonly name="entityId" value={data.targetId} />
        <pre>

        year 
        svc_id (folder)
        svc_type_id (known)
        svc_provider_id (known)
        pic_id (known)

        table sortable
        existing records by year/ type/ pic, sp
        </pre>
      </div>
    </div>
    

  </form>

	<br />
</main>

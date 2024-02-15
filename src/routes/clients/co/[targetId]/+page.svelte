<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import ClientCoForm from '$lib/components/ClientCoForm.svelte';
	import type { ClientCoDto } from '$lib/shared/dto/ProfileDto';
	import { dtStrISO } from '$lib/shared/dtoHelpers';

	export let data;

	let clientsFiltered = data.clients;
	let targetEntity: ClientCoDto;

	// SECTION: filtering
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

	// SECTION: resetting
	const resetEntity = (targetId: number) => {
		targetEntity = data.clients.find((s) => {
			return s.entityId == targetId;
		}) as ClientCoDto;
	};
	resetEntity(data.targetId);

	afterNavigate(() => {
		resetEntity(data.targetId);
	});
</script>

<div>
	<h1><a href="/"> MasterList </a></h1>
	<a class="button mb-small" href="/clients/co/new">New Company Client</a>
	<nav>
		<input type="text" class="mb-small" placeholder="Filter Names" on:input={filterHandler} />
		<ul class="sidebar">
			{#each clientsFiltered as item}
				{@const url = `/clients/co/${item.entityId}`}
				<li><a href={url}>{item.entityName}</a></li>
			{/each}
		</ul>
	</nav>
</div>

<main>
	<nav class="breadcrumb">
		<ul>
			<li><a href="/clients">Clients</a></li>
			<li>{targetEntity?.entityName}</li>
		</ul>
	</nav>

	<h2>Update Company Client</h2>

	<div class="button-group">
		<input
			type="button"
			value="Service Folders"
			on:click={() => {
				goto(`/clients/co/${data.targetId}/services`);
			}}
		/>
		<input
			type="button"
			value="Folder Tasks"
			on:click={() => {
				goto(`/clients/co/${data.targetId}/tasks`);
			}}
		/>
	</div>

	<form method="POST" action="?/save">
		<ClientCoForm
			entityId={targetEntity.entityId}
			entityName={targetEntity.entityName}
			entitySubtype={targetEntity.entitySubtype}
			coRegNoOld={targetEntity.coRegNoOld}
			coRegNoNew={targetEntity.coRegNoNew}
			dateIncorp={dtStrISO(targetEntity.dateIncorp ?? '')}
			dateCommence={dtStrISO(targetEntity.dateCommence ?? '')}
			incomeTaxBranch={targetEntity.incomeTaxBranch}
			incomeTaxNo={targetEntity.incomeTaxNo}
			employerNo={targetEntity.employerNo}
			directorName={targetEntity.directorDetails?.name}
			directorIc={targetEntity.directorDetails?.ic}
			directorLogin={targetEntity.directorDetails?.login}
			directorPwd={targetEntity.directorDetails?.pwd}
			contactDetails={targetEntity.contactDetails}
			entityStatus={targetEntity.entityStatus}
			profileStatus={targetEntity.profileStatus}
			remarks={targetEntity.remarks}
		/>
		<div class="form-actions">
			<input type="submit" value="Save" />
		</div>
	</form>
</main>

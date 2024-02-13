<script lang="ts">
	import NavMain from '$lib/components/NavMain.svelte';
	import type { SvcProviderCoDto } from '$lib/shared/dto/ProfileDto';
	import { findEntityStatus, showPrimaryContact } from '$lib/shared/dtoHelpers';

	export let data;
	const svcProviders: SvcProviderCoDto[] = data.svcProviders;
</script>

<NavMain></NavMain>
<main>
	<h2>List of Service Providers</h2>

	<div class="button-group">
    <a class="button" href="/svc-providers/co/new">New Company Service Provider</a>
	</div>

	<table class="border-all">
		<thead>
			<tr>
				<th class="narrow">#</th>
				<th>Svc Provider</th>
				<th>Primary Contact</th>
				<th>Status</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each svcProviders as item, index}
				<tr>
					<td class="narrow">{index + 1}. </td>
					<td>ID: {item.entityId}, {item.entityName} </td>
					<td>{showPrimaryContact(item)}</td>
					<td>{findEntityStatus(item.entityStatus)}</td>
					<td class="narrow">
						<a href="/svc-providers/co/{item.entityId}">Edit</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>

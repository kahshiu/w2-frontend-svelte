<script lang="ts">
	import NavMain from '$lib/components/NavMain.svelte';
	import { MyDefinition } from '$lib/shared/MyDefinition.js';
	import type { DefinitionStore } from '$lib/shared/dto/DefinitionDto.js';
	import type { ClientCoDto } from '$lib/shared/dto/ProfileDto.js';
	import { displayPrimaryContact } from '$lib/shared/dtoHelpers.js';

	export let data;
	const definitions: DefinitionStore = data.definitions;
	const myDefinition = new MyDefinition(definitions);
	const clients: ClientCoDto[] = data.clients;

</script>

<NavMain></NavMain>
<main>
	<h2>List of Company Clients</h2>

	<div class="button-group">
		<a class="button" href="/clients/co/new">New Company Client</a>
	</div>

	<table class="border-all">
		<thead>
			<tr>
				<th class="narrow">#</th>
				<th>Company Name</th>
				<th>Primary Contact</th>
				<th>Status</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each clients as item, index}
				<tr>
					<td class="narrow">{index + 1}. </td>
					<td>ID: {item.entityId}, {item.entityName} </td>
					<td>{displayPrimaryContact(myDefinition, item)}</td>
					<td>{myDefinition.findEntry('entityStatus', item.entityStatus)}</td>
					<td class="narrow">
						<a href="/clients/co/{item.entityId}">Edit</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>


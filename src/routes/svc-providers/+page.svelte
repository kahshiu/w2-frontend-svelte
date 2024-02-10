<script lang="ts">
	import NavMain from '$lib/components/NavMain.svelte';
	import { MyDefinition } from '$lib/shared/MyDefinition.js';
	import type { DefinitionStore } from '$lib/shared/dto/DefinitionDto.js';
	import type { SvcProviderCoDto } from '$lib/shared/dto/ProfileDto.js';

	export let data;
	const definitions: DefinitionStore = data.definitions;
	const myDefinition = new MyDefinition(definitions);
	const svcProviders: SvcProviderCoDto[] = data.svcProviders;

	const displayPrimaryContact = (item: SvcProviderCoDto) => {
		const pContact = item.contactDetails.find((i) => {
			return [true, 'on'].includes(i.isPrimary);
		});
		if (pContact === undefined) return '';
		return `${pContact.name}: ${pContact.contact} [${myDefinition.findEntry('contactType', Number(pContact.type))}]`;
	};
</script>

<NavMain></NavMain>
<main>
	<h2>List of Service Providers</h2>

	<div class="mb-small">
		<button>New Service Provider</button>
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
					<td>{displayPrimaryContact(item)}</td>
					<td>{myDefinition.findEntry('entityStatus', item.entityStatus)}</td>
					<td class="narrow">
						<a href="/svc-providers/co/{item.entityId}">Edit</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>

<script lang="ts">
	import NavMain from '$lib/components/NavMain.svelte';
	import ClientTooltip from '$lib/components/display/clientTooltip.svelte';
	import type { ClientCoServices } from '$lib/shared/dto/ProfileDto';
	import {
		findEntityStatus,
		showPrimaryContact,
		formulateIndicators,
		dtStrFormatter,
		defaultFormatOptions,
		findMonth
	} from '$lib/shared/dtoHelpers';

	export let data;
	const clients: ClientCoServices[] = data.clients;
</script>

<NavMain></NavMain>
<main>
	<h2>List of Clients</h2>

	<div class="button-group">
		<a class="button" href="/clients/co/new">New Company Client</a>
	</div>

	<table class="border-all">
		<thead>
			<tr>
				<th class="narrow">#</th>
				<th>Co. Name</th>
				<th>Primary Contact</th>
				<th style="text-align: center">
					Engaged Services
					<pre>{formulateIndicators({
							accStatusCode: 1,
							formcStatusCode: 1,
							formeStatusCode: 1,
							cp204StatusCode: 1,
							auditStatusCode: 1,
							cosecStatusCode: 1
						})}</pre>
				</th>
				<th>Co. Status</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each clients as item, index}
				<tr>
					<td class="narrow">{index + 1}. </td>
					<td>
						<ClientTooltip {item}>
							<a href="/clients/co/{item.entityId}">
								ID: {item.entityId}, {item.entityName}
							</a>
						</ClientTooltip>
					</td>
					<td>{showPrimaryContact(item)}</td>
					<td style="white-space: nowrap">
						<pre>{formulateIndicators(item)}</pre>
					</td>
					<td>{findEntityStatus(item.entityStatus)}</td>
					<td class="narrow">
						<a href="/clients/co/{item.entityId}">Edit</a>
					</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="5">
					<div class="field-description mt-med">
						Note: <br />
						<b>Mouse over</b> company name to peek its details
						<br />
						<br />
						Indicators: <br />
						Active Folder will register as engaged service
					</div>
				</td>
			</tr>
		</tfoot>
	</table>
</main>

<style>
</style>

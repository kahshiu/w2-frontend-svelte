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

	let years: number[] = [];
	let yearText = '';

	$: yearsJoined = years.join(',');

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
</script>

<NavMain></NavMain>
<main>
	<h2>Create Yearly Tasks</h2>
	<hr />

	<h3>1. Mass creation:</h3>
	<form method="POST" action="?/create">
		<p>
			Create for all clients. System will guarantee one task created for each engaged service for
			every client
		</p>
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
			<input type="hidden" name="listOfYears" bind:value={yearsJoined} />
			{#each years as item, key}
				<li>
					{item}
					<input type="button" class="small" on:click={(e) => removeYear(key)} value="Remove" />
				</li>
			{/each}
		</ul>
		<input type="submit" value="Create for ALL" />
	</form>

	<!---
	<hr />
	<h3>2. Selective creation:</h3>
	<ul>
		<li>Key in the <b><i>Year</i></b> to create tasks for.</li>
		<li><b><i>Select</i></b> client for task creation.</li>
		<li>Once done selecting, click on <b><i>Create for Selected</i></b>.</li>
		<li>
			For each client, <b><i>one</i></b> task will be created for
			<b><i>every engaged service</i></b>
		</li>
		<li>
			System will skip creation if pre-existing task is detected, thus, guarantee one task for every
			engaged service each year
		</li>
	</ul>
	<br />

	<form method="POST" action="?/selective">
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
				</tr>
			</thead>
			<tbody>
				{#each clients as item, index}
					<tr>
						<td class="narrow">
							<input type="checkbox" />
						</td>
						<td>
							<ClientTooltip {item}>
								ID: {item.entityId}, {item.entityName}
							</ClientTooltip>
						</td>
						<td>{showPrimaryContact(item)}</td>
						<td style="white-space: nowrap">
							<pre>{formulateIndicators(item)}</pre>
						</td>
						<td>{findEntityStatus(item.entityStatus)}</td>
					</tr>
				{/each}
			</tbody>
			<tfoot> </tfoot>
		</table>

		<div class="button-group">
			<a class="button" href="/clients/co/new">Create for Selected</a>
		</div>
	</form>
	-->
</main>

<style>
</style>

<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import StaffForm from '$lib/components/StaffForm.svelte';
	import type { ContactDto } from '$lib/shared/dto/JsonDto.js';
	import type { StaffSvelteDto, SvcProviderCoDto } from '$lib/shared/dto/ProfileDto.js';
	import { EntityStatus } from '$lib/shared/dto/enums';

	export let data;
	let svcProviderFiltered = data.svcProviders;
	let entityId: number;
	let entityName: string;
	let entityStatus: EntityStatus;
	let contactDetails: ContactDto[];
	let staff: StaffSvelteDto[];

	const resetEntity = (targetEntity: SvcProviderCoDto) => {
		entityId = targetEntity.entityId;
		entityName = targetEntity.entityName;
		entityStatus = targetEntity.entityStatus;
		contactDetails = targetEntity.contactDetails;
		staff = targetEntity.staff;
	};
	resetEntity(data.targetEntity as SvcProviderCoDto);

	const filterHandler = (event: Event) => {
		const el = event.target as HTMLInputElement;
		const v = el.value.toLowerCase();

		if (v.length > 0) {
			svcProviderFiltered = data.svcProviders.filter((p) => {
				const n = p.entityName.toLowerCase();
				return n.match(v);
			});
		} else {
			svcProviderFiltered = data.svcProviders;
		}
	};

	afterNavigate(() => {
		resetEntity(data.targetEntity as SvcProviderCoDto);
	});
</script>

<div>
	<h1>MasterList</h1>

	<nav>
		<input type="button" class="mb-small" value="New Service Provider" />
		<input type="text" class="mb-small" placeholder="Filter Names" on:input={filterHandler} />
		<ul class="sidebar">
			{#each data.svcProviders as item, key}
				<li><a href="/svc-providers/co/{item.entityId}">{item.entityName}</a></li>
			{/each}
		</ul>
	</nav>
</div>

<main>
	<div class="breadcrumb">
		<ul>
			<li><a href="/svc-providers">List of Service Provider</a></li>
			<li>{entityName} [ID: {entityId}]</li>
		</ul>
	</div>

	<h2>
		{#if entityId > 0}
			Update Service Providers
		{:else}
			New Service Providers
		{/if}
	</h2>

	<form method="POST" action="?/save">
		<div class="form-col-2">
			<div class="form-field">
				<input type="hidden" readonly name="entityId" value={entityId} />
				<label class="field-label" for="entityName">Company Name:</label>
				<input
					type="text"
					id="entityName"
					name="entityName"
					placeholder="Type here"
					class="stretch-half"
					bind:value={entityName}
				/>
			</div>
			<div class="form-field">
				<label class="field-label" for="entityStatus">Company Status:</label>
				<div>
					{#each data.definitions.entityStatus as item}
						<div class="field-spacing">
							<input
								type="radio"
								name="entityStatus"
								id="entityStatus{item.code}"
								value={item.code}
								bind:group={entityStatus}
							/>
							<label for="entityStatus{item.code}">{item.label}</label>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<hr />
		<ContactForm contactTypes={data.definitions.contactType} allContacts={[...contactDetails]} />

		<hr />
		<StaffForm staffStatus={data.definitions.entityStatus} allStaff={staff} />

		<div class="form-actions">
			<input type="submit" value="Save" />
			<input class="reset" type="button" value="Cancel" />
		</div>
	</form>
</main>

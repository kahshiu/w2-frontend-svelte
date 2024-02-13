<script lang="ts">
	import ContactForm from '$lib/components/forms/ContactForm.svelte';
	import StaffForm from '$lib/components/forms/StaffForm.svelte';
	import type { ContactDto } from '$lib/shared/dto/JsonDto';
	import type { StaffSvelteDto } from '$lib/shared/dto/ProfileDto';
	import type { EntityStatus } from '$lib/shared/dto/enums';
	import { storeGet } from '$lib/shared/dtoHelpers';

	export let entityId: number;
	export let entityName: string;
	export let entityStatus: EntityStatus;
	export let contactDetails: ContactDto[];
	export let staff: StaffSvelteDto[];
</script>

<div class="form-col-2">
	<div class="form-field">
		<input type="hidden" readonly name="entityId" value={entityId} />
		<label class="field-label" for="entityName">Company Name:</label>
		<input
			type="text"
			id="entityName"
			name="entityName"
			placeholder="Type name here"
			required
			bind:value={entityName}
		/>
	</div>
	<div class="form-field">
		<label class="field-label" for="entityStatus">Company Status:</label>
		{#each storeGet('entityStatus') as item}
			{@const fieldId = `entityStatus-${item.code}`}
			<div class="field-spacing">
				<input
					type="radio"
					name="entityStatus"
					id={fieldId}
					value={item.code}
					required
					bind:group={entityStatus}
				/>
				<label for={fieldId}>{item.label}</label>
			</div>
		{/each}
	</div>
</div>

<hr />
<ContactForm allContacts={[...contactDetails]} />

<hr />
<StaffForm allStaff={staff} />

<script lang="ts">
	import type { DefinitionDto2 } from '$lib/shared/dto/enums';
	import { storeGet } from '$lib/shared/dtoHelpers';
	import RadioGroup from './RadioGroup.svelte';

	export let homePic: DefinitionDto2[];
	export let svcProviders: DefinitionDto2[];

	export let picId: number;
	export let svcProviderId: number;
	export let taskStatusCode: number;
</script>

<fieldset>
	<legend>Assignment</legend>
	<div class="form-field">
		<label class="field-label" for="picId">Internal PIC: </label>
		<select id="picId" name="picId" bind:value={picId}>
			<option value="0">-- Unassigned --</option>
			{#each homePic as item}
				<option value={item.code}>{item.label}</option>
			{/each}
		</select>
	</div>

	<div class="form-field">
		<label class="field-label" for="svcProviderId">External Service Provider </label>
		<select name="svcProviderId" id="svcProviderId" bind:value={svcProviderId}>
			<option value="0">-- Unassigned --</option>
			{#each svcProviders as item}
				<option value={item.code}>{item.label}</option>
			{/each}
		</select>
	</div>

	<div class="form-field">
		<label class="field-label" for="taskStatusCode">Task Status:</label>
		<RadioGroup
			fieldName="taskStatusCode"
			options={storeGet('taskStatusCode')}
			selectedItem={taskStatusCode}
			required={true}
		/>
	</div>
</fieldset>
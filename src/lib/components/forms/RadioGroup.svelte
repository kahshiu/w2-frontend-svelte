<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { DefinitionDto2 } from '$lib/shared/dto/enums';

	export let fieldName: string = 'field123';
	export let options: DefinitionDto2[] = [];
	export let selectedItem: number;
	export let required: boolean = false;

	const dispatch = createEventDispatcher();
</script>

{#each options as item}
	{@const isSelected = item.code == selectedItem}
	{@const fieldId = `${fieldName}-${item.code}`}
	<div class="field-spacing">
		<input
			type="radio"
			name={fieldName}
			id={fieldId}
			value={item.code}
			{required}
			bind:group={selectedItem}
			on:click={() => {
				dispatch(`${fieldName}-update`, {
					fieldName,
					pValue: selectedItem,
					value: item.code,
					options,
				});
			}}
		/>
		<label class={isSelected ? 'label-selected' : ''} for={fieldId}>{item.label}</label>
	</div>
{/each}

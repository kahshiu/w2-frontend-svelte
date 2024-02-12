<script lang="ts">
	import type { DefinitionDto } from '$lib/shared/dto/DefinitionDto';

  export let fieldName: string = "field123";
	export let options: DefinitionDto[] = [];
	export let selectedItem: number;
	export let required: boolean = false;
</script>

{#each options as item}
	<div class="field-spacing">
		<input
			type="radio"
			name={fieldName}
			id="{fieldName}-{item.code}"
			value={item.code}
			required={required}
			bind:group={selectedItem}
		/>
		<label class={item.code == selectedItem? 'label-selected': ''} for="{fieldName}-{item.code}">{item.label}</label>
	</div>
{/each}

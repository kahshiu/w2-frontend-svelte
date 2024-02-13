<script lang="ts">
	export let fieldName: string = 'field123';
	export let options: { code: number; label: string }[] = [];
	export let selectedItem: number;
	export let required: boolean = false;
</script>

{#each options as item}
	{@const isSelected = item.code == selectedItem}
	{@const fieldId = `${fieldName}-${item.code}`}
	<div class="field-spacing">
		<input
			type="radio"
			name={fieldName}
			id={fieldId}
			value={item.code.toString()}
			{required}
			bind:group={selectedItem}
		/>
		<label class={isSelected ? 'label-selected' : ''} for={fieldId}>{item.label}</label>
	</div>
{/each}

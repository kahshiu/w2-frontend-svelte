<script lang="ts">
	import type { RemarksDto } from '$lib/shared/dto/JsonDto';
	import { dtFormatter } from '$lib/shared/utils';
	export let title = 'Title';
	export let allRemarks: RemarksDto[] = [];
	export let getFieldName = (index: number, name: string) => {
		return `remarks.${index}.${name}`;
	};

	export let getNewFieldName = () => "newRemarks";
	const removeRemarks = (item: RemarksDto, index: number) => {
		allRemarks.splice(index, 1);
		allRemarks = [...allRemarks];
	};

</script>

<table style="width: 100%">
	<caption>
		<h3>{title.toUpperCase()} REMARKS HISTORY</h3>
	</caption>
	<thead>
		<tr>
			<th>Date</th>
			<th class="wide">Remarks</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each allRemarks as item, index}
			<tr>
				<td>
					{dtFormatter(new Date(item.date))}
					<input type="hidden" name={getFieldName(index, 'date')} value={item.date} />
				</td>
				<td><textarea class="stretch-max" rows=3 name={getFieldName(index, 'remarks')} value={item.remarks}></textarea></td>
				<td><input type="button" on:click={() => removeRemarks(item, index)} value="Remove" /></td>
			</tr>
		{/each}
	</tbody>
</table>
<br />
<br />

<div class="form-col-2">
	<div class="form-field">
		<label class="field-name" for="rem">{title.toUpperCase()} NEW REMARKS: </label>
		<div>
			<textarea name={getNewFieldName()} class="stretch-max" rows="5"></textarea>
		</div>
	</div>
</div>

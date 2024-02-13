<script lang="ts">
	import type { RemarksDto } from '$lib/shared/dto/JsonDto';
	import { showCapitalise } from '$lib/shared/dtoHelpers';
	import { dtFormatter } from '$lib/shared/utils';
	export let title = 'Title';
	export let allRemarks: RemarksDto[] = [];
	export let getFieldName = (index: number, name: string) => {
		return `remarks.${index}.${name}`;
	};
	export let getNewFieldName = () => 'newRemarks';

	const titleCapitalised = showCapitalise(title);
	const removeRemarks = (item: RemarksDto, index: number) => {
		allRemarks.splice(index, 1);
		allRemarks = [...allRemarks];
	};
</script>

<h3>{titleCapitalised} Remarks History</h3>
<table class="border-all">
	<thead>
		<tr>
			<th>Date</th>
			<th class="wide">Remarks</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		{#each allRemarks as item, index}
			{@const fnameDate = getFieldName(index, 'date')}
			{@const fnameRemarks = getFieldName(index, 'remarks')}
			{@const formattedDate = dtFormatter(new Date(item.date))}
			<tr>
				<td class="wide">
					{formattedDate}
					<input type="hidden" name={fnameDate} value={item.date} />
				</td>
				<td><textarea name={fnameRemarks} rows="4" value={item.remarks}></textarea></td>
				<td><input type="button" on:click={() => removeRemarks(item, index)} value="Remove" /></td>
			</tr>
		{/each}
		<tr class="row-add">
			<td>
				<b>New <i>{titleCapitalised}</i> Remarks</b>
				<br />
				Type into textbox and save the entire form
			</td>
			<td>
				<div class="form-field">
					<label class="field-label" for="newRemarks"></label>
					<textarea name={getNewFieldName()} rows="4"></textarea>
				</div>
			</td>
		</tr>
	</tbody>
</table>

<script lang="ts">
	import type { RemarksDto } from '$lib/shared/dto/JsonDto';
	import { dtFormatter } from '$lib/shared/utils';
	export let title = 'Title';
	export let allRemarks: RemarksDto[] = [];
	export let getFieldName = (index: number, name: string) => {
		return `remarks.${index}.${name}`;
	};

	export let getNewFieldName = () => 'newRemarks';
	const removeRemarks = (item: RemarksDto, index: number) => {
		allRemarks.splice(index, 1);
		allRemarks = [...allRemarks];
	};
</script>

<table class="border-all">
	<caption>
		<h3>{title.toUpperCase()} REMARKS HISTORY</h3>
	</caption>
	<thead>
		<tr>
			<th>Date</th>
			<th class="wide">Remarks</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		{#each allRemarks as item, index}
			<tr>
				<td class="wide">
					{dtFormatter(new Date(item.date))}
					<input type="hidden" name={getFieldName(index, 'date')} value={item.date} />
				</td>
				<td
					><textarea
						class="stretch-max"
						rows="4"
						name={getFieldName(index, 'remarks')}
						value={item.remarks}
					></textarea></td
				>
				<td><input type="button" on:click={() => removeRemarks(item, index)} value="Remove" /></td>
			</tr>
		{/each}
		<tr class="row-add">
			<td>
				<b>New <i>{title.toUpperCase()}</i> Remarks</b> 
				<br/>
				Type into textbox and save the entire form
			</td>
			<td>
				<div class="form-field">
					<label class="field-label" for="newRemarks"></label>
					<textarea name="newRemarks" class="stretch-max" rows="4"></textarea>
				</div>
			</td>
			<td>
				<quote>
				</quote>
			</td>
		</tr>
	</tbody>
</table>
<br />
<br />

<div class="form-col-2"></div>

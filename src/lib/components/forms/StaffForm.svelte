<script lang="ts">
	import type { StaffSvelteDto } from '$lib/shared/dto/ProfileDto';
	import { storeGet } from '$lib/shared/dtoHelpers';

	export let entityStatus = storeGet("entityStatus");
	export let coId: number = 0;
	export let allStaff: StaffSvelteDto[] = [];

	let newEntityId = 0;
	let newStaffName = '';
	let newStaffStatus = '1';
	let newStaffNotes = '';
	let newContactEmail = '';
	let newContactHandphone = '';
	let newContactNotes = '';

	const getFieldName = (index: number, name: string) => `staff.${index}.${name}`;

	const addStaff = () => {
		allStaff = [
			// @ts-ignore
			...allStaff,
			{
				coId,
				entityId: newEntityId,
				staffName: newStaffName,
				// @ts-ignore
				staffStatus: newStaffStatus,
				staffNotes: newStaffNotes,
				contactEmail: newContactEmail,
				contactHandphone: newContactHandphone,
				contactNotes: newContactNotes
			}
		];
		// reset values
		newEntityId = 0;
		newStaffName = '';
		newStaffStatus = '1';
		newStaffNotes = '';
		newContactEmail = '';
		newContactHandphone = '';
		newContactNotes = '';
	};

	const removeStaff = (index: number) => {
		allStaff.splice(index, 1);
		allStaff = [...allStaff];
	};
</script>

<table class="no-border">
	<caption>
		<h3>STAFF DETAILS</h3>
	</caption>
	<thead>
		<tr>
			<th class="narrow">#</th>
			<th>Staff Details</th>
			<th>Contact Details</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		{#each allStaff as item, index}
			{@const fnameEntityId = getFieldName(index, 'entityId')}
			{@const fnameStaffName = getFieldName(index, 'staffName')}
			{@const fnameStaffStatus = getFieldName(index, 'staffStatus')}
			{@const fnameStaffNotes = getFieldName(index, 'staffNotes')}
			{@const fnameContactHp = getFieldName(index, 'contactHandphone')}
			{@const fnameContactEmail = getFieldName(index, 'contactEmail')}
			{@const fnameContactNotes = getFieldName(index, 'contactNotes')}
			<tr>
				<td class="narrow">{index + 1}.</td>
				<td>
					<div class="form-field">
						<input type="hidden" name={fnameEntityId} bind:value={item.entityId} />
						<div class="tooltip-anchor">
							<span class="tooltip">Staff Name</span>
							<input
								type="text"
								class="field-spacing"
								name={fnameStaffName}
								placeholder="Staff Name"
								required
								bind:value={item.staffName}
							/>
						</div>
						<div class="tooltip-anchor">
							<span class="tooltip">Staff Status</span>
							<select
								class="field-spacing"
								name={fnameStaffStatus}
								required
								bind:value={item.staffStatus}
							>
								{#each entityStatus as item}
									<option value={item.code.toString()}>{item.label}</option>
								{/each}
							</select>
						</div>
						<div class="tooltip-anchor">
							<span class="tooltip">Staff Note</span>
							<textarea
								class="field-spacing"
								name={fnameStaffNotes}
								rows="4"
								placeholder="Staff Notes"
								bind:value={item.staffNotes}
							></textarea>
						</div>
					</div>
				</td>

				<td>
					<div class="form-field">
						<div class="tooltip-anchor">
							<span class="tooltip">Staff Handphone</span>
							<input
								type="text"
								class="field-spacing"
								name={fnameContactHp}
								placeholder="Contact Handphone"
								bind:value={item.contactHandphone}
							/>
						</div>
						<div class="tooltip-anchor">
							<span class="tooltip">Staff Email</span>
							<input
								type="text"
								class="field-spacing"
								name={fnameContactEmail}
								placeholder="Contact Email"
								bind:value={item.contactEmail}
							/>
						</div>
						<div class="tooltip-anchor">
							<span class="tooltip">Staff Contact Note</span>
							<textarea
								class="field-spacing"
								name={fnameContactNotes}
								rows="4"
								placeholder="Contact Notes"
								bind:value={item.contactNotes}
							></textarea>
						</div>
					</div>
				</td>

				<td>
					<div class="form-field">
						<input
							type="button"
							value="Remove"
							on:click={() => {
								removeStaff(index);
							}}
						/>
					</div>
				</td>
			</tr>
		{/each}
		<tr class="row-add">
			<td class="narrow"></td>
			<td>
				<div class="form-field">
					<input
						type="text"
						class="field-spacing"
						name="newStaffName"
						placeholder="Staff Name"
						required
						bind:value={newStaffName}
					/>
					<select class="field-spacing" name="newStaffStatus" required bind:value={newStaffStatus}>
						{#each entityStatus as item}
							<option value={item.code.toString()}>{item.label}</option>
						{/each}
					</select>
					<textarea
						name="newStaffNotes"
						class="field-spacing"
						rows="4"
						placeholder="Staff Notes"
						bind:value={newStaffNotes}
					></textarea>
				</div>
			</td>
			<td>
				<div class="form-field">
					<input
						type="text"
						class="field-spacing"
						name="newContactHandphone"
						placeholder="Contact Handphone"
						bind:value={newContactHandphone}
					/>
					<input
						type="text"
						class="field-spacing"
						name="newContactEmail"
						placeholder="Contact Email"
						bind:value={newContactEmail}
					/>
					<textarea
						name="newContactNotes"
						class="field-spacing"
						rows="4"
						placeholder="Contact Notes"
						bind:value={newContactNotes}
					></textarea>
				</div>
			</td>
			<td>
				<div class="form-field">
					<input
						type="button"
						value="Add"
						on:click={() => {
							addStaff();
						}}
					/>
				</div>
			</td>
		</tr>
	</tbody>
</table>

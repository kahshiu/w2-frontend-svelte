<script lang="ts">
	import type { DefinitionDto } from '$lib/shared/dto/DefinitionDto';
	import type { StaffSvelteDto } from '$lib/shared/dto/ProfileDto';

	export let staffStatus: DefinitionDto[] = [];
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
			<tr>
				<td class="narrow">{index + 1}.</td>
				<td>
					<div class="form-field">
						<input
							type="hidden"
							name={getFieldName(index, 'entityId')}
							bind:value={item.entityId}
						/>
						<div class="tooltip-anchor">
							<span class="tooltip">Staff Name</span>
							<input
								type="text"
								class="field-spacing"
								name={getFieldName(index, 'staffName')}
								placeholder="Staff Name"
								required
								bind:value={item.staffName}
							/>
						</div>
						<div class="tooltip-anchor">
							<span class="tooltip">Staff Status</span>
							<select
								class="field-spacing"
								name={getFieldName(index, 'staffStatus')}
								required
								bind:value={item.staffStatus}
							>
								{#each staffStatus as item}
									<option value={item.code.toString()}>{item.label}</option>
								{/each}
							</select>
						</div>
						<div class="tooltip-anchor">
							<span class="tooltip">Staff Note</span>
							<textarea
								class="field-spacing"
								name={getFieldName(index, 'staffNotes')}
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
								name={getFieldName(index, 'contactHandphone')}
								placeholder="Contact Handphone"
								bind:value={item.contactHandphone}
							/>
						</div>
						<div class="tooltip-anchor">
							<span class="tooltip">Staff Email</span>
							<input
								type="text"
								class="field-spacing"
								name={getFieldName(index, 'contactEmail')}
								placeholder="Contact Email"
								bind:value={item.contactEmail}
							/>
						</div>
						<div class="tooltip-anchor">
							<span class="tooltip">Staff Contact Note</span>
							<textarea
								class="field-spacing"
								name={getFieldName(index, 'contactNotes')}
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
						{#each staffStatus as item}
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

<script lang="ts">
	import type { ContactDto } from '$lib/shared/dto/JsonDto';
	import { storeGet } from '$lib/shared/dtoHelpers';

	export let allContacts: ContactDto[] = [];

	let newName = '';
	let newType = '1';
	let newContact = '';
	let newNote = '';

	const getFieldName = (index: number, name: string) => `contactDetails.${index}.${name}`;
	const addContact = () => {
		allContacts = [
			// @ts-ignore
			...allContacts,
			{
				name: newName,
				// @ts-ignore
				type: newType,
				contact: newContact,
				note: newNote,
				isPrimary: false
			}
		];

		// reset values
		newName = '';
		newType = '1';
		newContact = '';
		newNote = '';
	};
	const removeContact = (index: number) => {
		allContacts.splice(index, 1);
		allContacts = [...allContacts];
	};
	const resetAllPrimary = () => {
		allContacts.forEach((c) => {
			c.isPrimary = false;
		});
	};
</script>

<table class="no-border">
	<caption>
		<h3>CONTACT DETAILS</h3>
	</caption>
	<thead>
		<tr>
			<th class="narrow">#</th>
			<th>Name</th>
			<th colspan="2">Contact</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		{#each allContacts as contact, index}
			<tr>
				<td class="narrow">{index + 1}.</td>
				<td>
					<input
						type="text"
						name={getFieldName(index, 'name')}
						placeholder="Contact person"
						required
						bind:value={contact.name}
					/>
				</td>
				<td>
					<div class="field-spacing">
						<input
							type="checkbox"
							name={getFieldName(index, 'isPrimary')}
							id={getFieldName(index, 'isPrimary')}
							bind:checked={contact.isPrimary}
							on:click={() => resetAllPrimary()}
						/>
						<label for={getFieldName(index, 'isPrimary')}>Is Primary?</label>
					</div>
					<select
						class="field-spacing"
						name={getFieldName(index, 'type')}
						value={contact.type.toString()}
					>
						{#each storeGet('contactType') as item, index}
							<option value={item.code.toString()}>{item.label}</option>
						{/each}
					</select>
					<div class="tooltip-anchor">
						<span class="tooltip">Contact Details</span>
						<input
							class="field-spacing"
							type="text"
							name={getFieldName(index, 'contact')}
							placeholder="Contact"
							required
							bind:value={contact.contact}
						/>
					</div>
				</td>
				<td>
					<div class="tooltip-anchor">
						<span class="tooltip">Contact Notes</span>
						<textarea name={getFieldName(index, 'note')} rows="4" bind:value={contact.note}
						></textarea>
					</div>
				</td>
				<td
					><input
						type="button"
						value="Remove"
						on:click={() => {
							removeContact(index);
						}}
					/>
				</td>
			</tr>
		{/each}
		<tr class="row-add">
			<td class="narrow"></td>
			<td>
				<input type="text" name="newContactName" placeholder="Contact person" bind:value={newName} />
			</td>
			<td>
				<select class="field-spacing" name="newContactType" bind:value={newType}>
					{#each storeGet('contactType') as item, index}
						<option value={item.code.toString()}>{item.label}</option>
					{/each}
				</select>
				<input type="text" class="field-spacing" name="newContact" placeholder="Contact" bind:value={newContact} />
			</td>
			<td>
				<textarea name="newNote" rows="4" bind:value={newNote} placeholder="Contact Notes"></textarea>
			</td>
			<td
				><input
					type="button"
					value="Add"
					on:click={() => {
						addContact();
					}}
				/>
			</td>
		</tr>
	</tbody>
</table>

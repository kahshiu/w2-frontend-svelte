<script lang="ts">
	import type { DefinitionDto } from '$lib/shared/dto/DefinitionDto';
	import type { ContactDto } from '$lib/shared/dto/JsonDto';

	export let allContacts: ContactDto[] = [];
	export let contactTypes: DefinitionDto[] = [];

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
					<input type="text" name={getFieldName(index, 'name')} bind:value={contact.name} />
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
						{#each contactTypes as item, index}
							<option value={item.code.toString()}>{item.label}</option>
						{/each}
					</select>
					<input
						class="field-spacing"
						type="text"
						name={getFieldName(index, 'contact')}
						bind:value={contact.contact}
					/>
				</td>
				<td>
					<textarea name={getFieldName(index, 'note')} rows="4" bind:value={contact.note}
					></textarea>
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
				<input type="text" name="newContactName" class="stretch-max" bind:value={newName} />
			</td>
			<td>
				<select class="field-spacing" name="newContactType" bind:value={newType}>
					{#each contactTypes as item}
						<option value={item.code.toString()}>{item.label}</option>
					{/each}
				</select>
				<input type="text" class="field-spacing" name="newContact" bind:value={newContact} />
			</td>
			<td>
				<textarea name="newNote" rows="4" bind:value={newNote}></textarea>
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

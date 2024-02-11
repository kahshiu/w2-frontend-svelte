<script lang="ts">
	import type { DefinitionStore } from '$lib/shared/dto/DefinitionDto';
	import type { ContactDto, RemarksDto } from '$lib/shared/dto/JsonDto';
	import { EntityStatus, ProfileStatus } from '$lib/shared/dto/enums';
	import { dtStrISO } from '$lib/shared/utils';
	import ContactForm from './forms/ContactForm.svelte';
	import RadioGroup from './forms/RadioGroup.svelte';
	import RemarksHistory from './forms/RemarksHistory.svelte';

	export let definitions: DefinitionStore;
	export let entityId = 0;
	export let entityName = '';
	export let entitySubtype = 1;
	export let coRegNoOld = '';
	export let coRegNoNew = '';
	export let dateIncorp = '';
	export let dateCommence = dtStrISO('');
	export let incomeTaxBranch = dtStrISO('');
	export let incomeTaxNo = '';
	export let employerNo = '';
	export let directorName = '';
	export let directorIc = '';
	export let directorLogin = '';
	export let directorPwd = '';

	export let entityStatus: EntityStatus = EntityStatus.ACTIVE;
	export let profileStatus: ProfileStatus = ProfileStatus.PRE_ACTIVATION;
	export let contactDetails: ContactDto[] = [];
	export let remarks: RemarksDto[] = [];
</script>

<div class="form-col-2">
	<div class="form-field">
		<label class="field-label" for="entityName">Company Name:</label>
		<div>
			<input type="hidden" readonly name="entityId" value={entityId} />
			<input
				type="text"
				name="entityName"
				id="entityName"
				placeholder="Type name here"
				required
				bind:value={entityName}
			/>
		</div>
	</div>

	<div class="form-field">
		<label class="field-label" for="entityName">Company Type:</label>
		<RadioGroup fieldName="entitySubtype" options={definitions.entitySubtype} selectedItem={entitySubtype} />
	</div>

	<div class="form-field">
		<label class="field-label" for="entityStatus">Company status:</label>
		<RadioGroup fieldName="entityStatus" options={definitions.entityStatus} selectedItem={entityStatus} />
	</div>

	<div class="form-field">
		<label class="field-label" for="entityStatus">Profile status:</label>
		<RadioGroup fieldName="profileStatus" options={definitions.profileStatus} selectedItem={profileStatus} />
	</div>

	<div class="form-field">
		<label class="field-label" for="coRegNoNew">Co. Reg. No (New):</label>
		<input
			type="text"
			name="coRegNoNew"
			id="coRegNoNew"
			placeholder="Type new registration number here"
			bind:value={coRegNoNew}
		/>
	</div>

	<div class="form-field">
		<label class="field-label" for="coRegNoOld">Co. Reg. No (Old):</label>
		<input
			type="text"
			name="coRegNoOld"
			id="coRegNoOld"
			placeholder="Type old registration number here"
			bind:value={coRegNoOld}
		/>
	</div>

	<div class="form-field">
		<label class="field-label" for="dateIncorp">Date Incorp.</label>
		<input
			type="date"
			name="dateIncorp"
			id="dateIncorp"
			placeholder="Type incorporation date here"
			bind:value={dateIncorp}
		/>
	</div>

	<div class="form-field">
		<label class="field-label" for="dateCommence">Date Commence:</label>
		<input
			type="date"
			name="dateCommence"
			id="dateCommence"
			placeholder="Type commencement date here"
			bind:value={dateCommence}
		/>
	</div>

	<div class="form-field">
		<label class="field-label" for="incomeTaxNo">Income Tax No:</label>
		<div>
			<input
				type="text"
				name="incomeTaxNo"
				id="incomeTaxNo"
				placeholder="Type income tax number here"
				bind:value={incomeTaxNo}
			/>
		</div>
	</div>

	<div class="form-field">
		<label class="field-label" for="incomeTaxBranch">Income Tax Branch:</label>
		<div>
			<input
				type="text"
				name="incomeTaxBranch"
				id="incomeTaxBranch"
				placeholder="Type income tax branch here"
				bind:value={incomeTaxBranch}
			/>
		</div>
	</div>

	<div class="form-field">
		<label class="field-label" for="employerNo">Employer No:</label>
		<input
			type="text"
			name="employerNo"
			id="employerNo"
			placeholder="Type employer number here"
			bind:value={employerNo}
		/>
	</div>

	<div></div>

	<div class="form-field">
		<label class="field-label" for="directorName">Director Name</label>
		<div>
			<input
				type="text"
				name="directorDetails.name"
				id="directorName"
				placeholder="Type director name here"
				bind:value={directorName}
			/>
		</div>
	</div>

	<div class="form-field">
		<label class="field-label" for="directorIc">Director Ic</label>
		<div>
			<input
				type="text"
				name="directorDetails.ic"
				id="directorIc"
				placeholder="Type director IC here"
				bind:value={directorIc}
			/>
		</div>
	</div>

	<div class="form-field">
		<label class="field-label" for="directorLogin">Director Login</label>
		<div>
			<input
				type="text"
				name="directorDetails.login"
				id="directorLogin"
				bind:value={directorLogin}
			/>
		</div>
	</div>

	<div class="form-field">
		<label class="field-label" for="directorPwd">Director Password</label>
		<div>
			<input type="text" name="directorDetails.pwd" id="directorPwd" bind:value={directorPwd} />
		</div>
	</div>
</div>

<hr />
<ContactForm contactTypes={definitions.contactType} allContacts={[...contactDetails]} />

<hr />
<RemarksHistory title={'Profile'} allRemarks={[...remarks]} />

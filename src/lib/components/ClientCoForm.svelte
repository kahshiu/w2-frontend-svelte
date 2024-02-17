<script lang="ts">
	import type { ContactDto, RemarksDto } from '$lib/shared/dto/JsonDto';
	import {
		MyEntityStatus,
		MyProfileStatus,
		type EntityStatus,
		type ProfileStatus
	} from '$lib/shared/dto/enums';
	import { storeGet } from '$lib/shared/dtoHelpers';
	import ContactForm from './forms/ContactForm.svelte';
	import RadioGroup from './forms/RadioGroup.svelte';
	import RemarksHistory from './forms/RemarksHistory.svelte';

	export let entityId = 0;
	export let entityName = '';
	export let entitySubtype = 1;
	export let coRegNoOld = '';
	export let coRegNoNew = '';
	export let dateIncorp = '';
	export let dateCommence = '';
	export let incomeTaxBranch = '';
	export let incomeTaxNo = '';
	export let employerNo = '';
	export let directorName = '';
	export let directorIc = '';
	export let directorLogin = '';
	export let directorPwd = '';

	export let entityStatus: EntityStatus = MyEntityStatus.ACTIVE;
	export let profileStatus: ProfileStatus = MyProfileStatus.PRE_ACTIVATION;
	export let contactDetails: ContactDto[] = [];
	export let remarks: RemarksDto[] = [];

	export let yearEndMth = 0;
	export let arDueMth = 0;
</script>

<div class="form-col-2">
	<div>
		<div class="form-field">
			<input type="hidden" readonly name="entityId" value={entityId} />
			<label class="field-label" for="entityName">Company Name:</label>
			<input
				type="text"
				name="entityName"
				id="entityName"
				placeholder="Type name here"
				required
				bind:value={entityName}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="entityName">Company Type:</label>
			<RadioGroup
				fieldName="entitySubtype"
				options={storeGet('entitySubtype')}
				selectedItem={entitySubtype}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="coRegNoNew">Co. Reg. No:</label>
			<div class="tooltip-anchor">
				<span class="tooltip">Co. Reg. No. (New)</span>
				<input
					type="text"
					class="field-spacing"
					name="coRegNoNew"
					id="coRegNoNew"
					placeholder="Type new registration number here"
					bind:value={coRegNoNew}
				/>
			</div>
			<div class="tooltip-anchor">
				<span class="tooltip">Co. Reg. No. (Old)</span>
				<input
					type="text"
					class="field-spacing"
					name="coRegNoOld"
					id="coRegNoOld"
					placeholder="Type old registration number here"
					bind:value={coRegNoOld}
				/>
			</div>
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
			<label class="field-label" for="yearEndMth">Year-end Month:</label>
			<select id="yearEndMth" name="yearEndMth" bind:value={yearEndMth}>
				<option value=0> -- Blank -- </option>
				{#each storeGet("month") as item}
					<option value={item.code}>{item.label}</option>
				{/each}
			</select>
		</div>

		<div class="form-field">
			<label class="field-label" for="arDueMth">AR Due Month:</label>
			<select id="arDueMth" name="arDueMth" bind:value={arDueMth}>
				<option value=0> -- Blank -- </option>
				{#each storeGet("month") as item}
					<option value={item.code}>{item.label}</option>
				{/each}
			</select>
		</div>
	</div>

	<div>
		<div class="form-field">
			<label class="field-label" for="incomeTaxNo">Income Tax Details:</label>
			<div class="tooltip-anchor">
				<span class="tooltip">Income Tax No</span>
				<input
					type="text"
					class="field-spacing"
					name="incomeTaxNo"
					id="incomeTaxNo"
					placeholder="Type income tax number here"
					bind:value={incomeTaxNo}
				/>
			</div>
			<div class="tooltip-anchor">
				<span class="tooltip">Income Tax Branch</span>
				<input
					type="text"
					class="field-spacing"
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
		<div class="form-field">
			<label class="field-label" for="entityStatus">Company status:</label>
			<RadioGroup
				fieldName="entityStatus"
				options={storeGet('entityStatus')}
				required={true}
				selectedItem={entityStatus}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="entityStatus">Profile status:</label>
			<RadioGroup
				fieldName="profileStatus"
				options={storeGet('profileStatus')}
				required={true}
				selectedItem={profileStatus}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="directorName">Director Details</label>

			<div class="tooltip-anchor">
				<span class="tooltip">Director Name</span>
				<input
					type="text"
					class="field-spacing"
					name="directorDetails.name"
					id="directorName"
					placeholder="Type director name here"
					bind:value={directorName}
				/>
			</div>
			<div class="tooltip-anchor">
				<span class="tooltip">Director IC</span>
				<input
					type="text"
					class="field-spacing"
					name="directorDetails.ic"
					id="directorIc"
					placeholder="Type director IC here"
					bind:value={directorIc}
				/>
			</div>
			<div class="tooltip-anchor">
				<span class="tooltip">Director Login</span>
				<input
					type="text"
					class="field-spacing"
					name="directorDetails.login"
					id="directorLogin"
					bind:value={directorLogin}
				/>
			</div>
			<div class="tooltip-anchor">
				<span class="tooltip">Director Pwd</span>
				<input
					type="text"
					class="field-spacing"
					name="directorDetails.pwd"
					id="directorPwd"
					bind:value={directorPwd}
				/>
			</div>
		</div>
	</div>
</div>

<hr />
<ContactForm allContacts={[...contactDetails]} />

<hr />
<RemarksHistory title={'Profile'} allRemarks={[...remarks]} />

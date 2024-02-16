<script lang="ts">
	import type { RemarksDto } from '$lib/shared/dto/JsonDto';
	import { MyFeeType, type DefinitionDto2, MyInvoiceStatusCode } from '$lib/shared/dto/enums';
	import { dtStrISO, showCapitalise, storeGet } from '$lib/shared/dtoHelpers';

	import RadioGroup from './RadioGroup.svelte';
	import RemarksHistory from './RemarksHistory.svelte';
	import TaskAssignment from './TaskAssignment.svelte';
	import TaskInvoice from './TaskInvoice.svelte';

	const feeType = MyFeeType.TAX_AGENT_FEE
	export let fee = '';
	export let hasManagementAcc = 0;
	export let dateManagementAcc = dtStrISO('');

	export let hasTaxDraft1 = 0;
	export let dateTaxDraft1 = dtStrISO('');

	export let hasAuditDraft = 0;
	export let dateAuditDraft = dtStrISO('');

	export let dateTaxDraftWip = dtStrISO('');
	export let dateTaxDraftToReview = dtStrISO('');
	export let dateTaxDraftFromReview = dtStrISO('');
	export let dateTaxDraftToClient = dtStrISO('');
	export let dateTaxDraftSignedBack = dtStrISO('');
	export let dateSubmission = dtStrISO('');

	let dateManagementAccRequired = false;
	let dateTaxDraft1Required = false;
	let dateAuditDraftRequired = false;

	// assignment props
	export let homePic: DefinitionDto2[] = [];
	export let svcProviders: DefinitionDto2[] = [];

	export let picId: number = 0;
	export let svcProviderId: number = 0;
	export let taskStatusCode: number = 100;

  // invoice props
	export let invoiceNo = '';
	export let invoiceAmount = '';
	export let invoiceDate = '';
	export let paymentNote = '';
	export let invoiceStatusCode = MyInvoiceStatusCode.TASK_IN_PROGRESS;

	// remarks component
	export let remarks: RemarksDto[] = [];
</script>

<div class="form-col-2">
	<fieldset>
		<legend>{showCapitalise('FORM_C')}</legend>
		<div class="form-field">
			<input type="hidden" name="feeType" value={feeType}>
			<label class="field-label" for="fee"> Tax agent fee: </label>
			<input
				type="text"
				class="field-spacing"
				name="fee"
				id="fee"
				placeholder="Tax agent fee here"
				bind:value={fee}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="hasManagementAcc"> Has management account? </label>
			<div class="field-description">
				Set "NO" if direct pass to AUDIT without TAX draft <br />
				Set "YES", register date management account received
			</div>
			<RadioGroup
				fieldName="hasManagementAcc"
				options={storeGet('yesNo')}
				selectedItem={hasManagementAcc}
				on:hasManagementAcc-update={(e) => {
					const { value } = e.detail;
					dateManagementAccRequired = value == 1;
				}}
			/>
			<input
				type="date"
				class="field-spacing"
				name="dateManagementAcc"
				id="dateManagementAcc"
				required={dateManagementAccRequired}
				bind:value={dateManagementAcc}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="hasTaxDraft1"> Has 1st TAX draft to auditor? </label>
			<div class="field-description">Set "YES", register date 1st TAX draft to auditor</div>
			<RadioGroup
				fieldName="hasTaxDraft1"
				options={storeGet('yesNo')}
				selectedItem={hasTaxDraft1}
				on:hasTaxDraft1-update={(e) => {
					const { value } = e.detail;
					dateTaxDraft1Required = value == 1;
				}}
			/>
			<input
				type="date"
				class="field-spacing"
				name="dateTaxDraft1"
				id="dateTaxDraft1"
				required={dateTaxDraft1Required}
				bind:value={dateTaxDraft1}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="hasAuditDraft">Received draft AUDIT report?</label>
			<div class="field-description">Set "YES", register date received draft AUDIT report</div>
			<RadioGroup
				fieldName="hasAuditDraft"
				options={storeGet('yesNo')}
				selectedItem={hasAuditDraft}
				on:hasAuditDraft-update={(e) => {
					const { value } = e.detail;
					dateAuditDraftRequired = value == 1;
				}}
			/>
			<input
				type="date"
				class="field-spacing"
				name="dateAuditDraft"
				id="dateAuditDraft"
				required={dateAuditDraftRequired}
				bind:value={dateAuditDraft}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="dateTaxDraftWip">Date for tax draft work in progress:</label>
			<input
				type="date"
				class="field-spacing"
				name="dateTaxDraftWip"
				id="dateTaxDraftWip"
				bind:value={dateTaxDraftWip}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="dateTaxDraftToReview">Date TAX draft pass to review:</label>
			<input
				type="date"
				class="field-spacing"
				name="dateTaxDraftToReview"
				id="dateTaxDraftToReview"
				bind:value={dateTaxDraftToReview}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="dateTaxDraftFromReview"
				>Date TAX draft return from review:</label
			>
			<input
				type="date"
				class="field-spacing"
				name="dateTaxDraftFromReview"
				id="dateTaxDraftFromReview"
				bind:value={dateTaxDraftFromReview}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="dateTaxDraftToClient">Date TAX draft send to client:</label>
			<input
				type="date"
				class="field-spacing"
				name="dateTaxDraftToClient"
				id="dateTaxDraftToClient"
				bind:value={dateTaxDraftToClient}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="dateTaxDraftSignedBack">
				Date TAX draft signed back from client:
			</label>
			<div class="field-description">Will proceed to submission review next</div>
			<input
				type="date"
				class="field-spacing"
				name="dateTaxDraftSignedBack"
				id="dateTaxDraftSignedBack"
				bind:value={dateTaxDraftSignedBack}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="fee"> Submission date </label>
			<div class="field-description">Make sure copy saved in server</div>
			<input type="date" name="dateSubmission" id="dateSubmission" bind:value={dateSubmission} />
		</div>
	</fieldset>
	<div>
		<TaskAssignment {homePic} {svcProviders} {picId} {svcProviderId} {taskStatusCode} />
		<TaskInvoice {invoiceNo} {invoiceAmount} {invoiceDate} {paymentNote} {invoiceStatusCode}/>
	</div>
</div>

<RemarksHistory title={'FORM_C'} allRemarks={[...remarks]} />

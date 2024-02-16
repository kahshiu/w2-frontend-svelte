<script lang="ts">
	import { MyInvoiceStatusCode, type DefinitionDto2, MyFeeType } from '$lib/shared/dto/enums';
	import { dtStrISO, storeGet } from '$lib/shared/dtoHelpers';
	import RadioGroup from './RadioGroup.svelte';
	import RemarksHistory from './RemarksHistory.svelte';
	import TaskAssignment from './TaskAssignment.svelte';
	import TaskInvoice from './TaskInvoice.svelte';

	const feeType = MyFeeType.TAX_AGENT_FEE
	export let fee = '';
	export let accountByUs: number = 0;
	export let dateDocsIn: string = dtStrISO('');
	export let dateDraftReview: string = dtStrISO('');
	export let dateDraftReturn: string = dtStrISO('');
	export let dateClientSigned: string = dtStrISO('');
	export let isFeePaid: number = 0;
	export let dateSubmission: string = dtStrISO('');

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
</script>

<div class="form-col-2">
	<fieldset>
		<legend>Form E</legend>

		<div class="form-field">
			<input type="hidden" name="feeType" value={feeType}>
			<label class="field-label" for="fee">Tax agent fee:</label>
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
			<label class="field-label" for="accountByUs">Account done by us?</label>
			<RadioGroup fieldName="accountByUs" options={storeGet('yesNo')} selectedItem={accountByUs} />
		</div>

		<div class="form-field">
			<label class="field-label" for="dateDocsIn">Date for docs in:</label>
			<input
				type="date"
				name="dateDocsIn"
				id="dateDocsIn"
				placeholder="Date docs in here"
				bind:value={dateDocsIn}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="dateDraftReview">Date for draft review:</label>
			<input
				type="date"
				name="dateDraftReview"
				id="dateDraftReview"
				placeholder="Date draft review here"
				bind:value={dateDraftReview}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="dateDraftReturn">Date for draft return:</label>
			<input
				type="date"
				name="dateDraftReturn"
				id="dateDraftReturn"
				placeholder="Date draft return here"
				bind:value={dateDraftReturn}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="dateClientSigned">Date client signed:</label>
			<input
				type="date"
				name="dateClientSigned"
				id="dateClientSigned"
				placeholder="Date client signed here"
				bind:value={dateClientSigned}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="isFeePaid">Is our fee paid?</label>
			<RadioGroup fieldName="isFeePaid" options={storeGet('yesNo')} selectedItem={isFeePaid} />
		</div>

		<div class="form-field">
			<label class="field-label" for="submission1">Submission:</label>
			<input
				type="date"
				class="field-spacing"
				name="dateSubmission"
				id="dateSubmission"
				placeholder="Submission 1 here"
				bind:value={dateSubmission}
			/>
			<div class="field-description">*Make sure save in server</div>
		</div>
	</fieldset>
	<div>
		<TaskAssignment {homePic} {svcProviders} {picId} {svcProviderId} {taskStatusCode} />
		<TaskInvoice {invoiceNo} {invoiceAmount} {invoiceDate} {paymentNote} {invoiceStatusCode}/>
	</div>
</div>

<RemarksHistory title={'FORM_E'} allRemarks={[]} />

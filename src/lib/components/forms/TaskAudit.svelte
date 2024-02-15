<script lang="ts">
	import { MyInvoiceStatusCode, type DefinitionDto2 } from '$lib/shared/dto/enums';
	import { storeGet } from '$lib/shared/dtoHelpers';
	import RadioGroup from './RadioGroup.svelte';
	import TaskAssignment from './TaskAssignment.svelte';
	import TaskInvoice from './TaskInvoice.svelte';

	export let closingStock = 0;
	export let isLateFiling = 0;

	export let workflowStatusCode = 0;

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
		<legend>AUDIT</legend>

		<div class="form-field">
			<label class="field-label" for="closingStock">Closing stock &gt; 300K:</label>
			<RadioGroup
				fieldName="closingStock"
				options={storeGet('yesNo')}
				selectedItem={closingStock}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="dateAuditDue">AUDIT due date:</label>
			<input type="date" name="dateAuditDue" id="dateAuditDue" placeholder="Audit due date here" />
		</div>

		<div class="form-field">
			<label class="field-label" for="dateReadyAudit">Date ready for AUDIT:</label>
			<input type="date" name="dateReadyAudit" id="dateReadyAudit" placeholder="Date ready here" />
		</div>

		<div class="form-field">
			<label class="field-label" for="dateQueriesReceived">Queries received:</label>
			<input
				type="date"
				name="dateQueriesReceived"
				id="dateQueriesReceived"
				placeholder="Date queries here"
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="dateQueriesReplied">Queries replied:</label>
			<input
				type="date"
				name="dateQueriesReplied"
				id="dateQueriesReplied"
				placeholder="Date queries replied here"
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="dateAuditPageSigned">Signing Page - AUDIT:</label>
			<input
				type="date"
				name="dateAuditPageSigned"
				id="dateAuditPageSigned"
				placeholder="Date audit page here"
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="dateTaxPageSigned">Signing Page - TAX:</label>
			<input
				type="date"
				name="dateTaxPageSigned"
				id="dateTaxPageSigned"
				placeholder="Date tax page signed here"
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="dateCosecAccPageSigned">
				Signing Page - CO SEC Approval AC:
			</label>
			<input
				type="date"
				name="dateCosecAccPageSigned"
				id="dateCosecAccPageSigned"
				placeholder="Date co. sec. acc. page here"
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="dateSendbackClient">Date sendback client:</label>
			<input
				type="date"
				name="dateSendbackClient"
				id="dateSendbackClient"
				placeholder="Date sendback client here"
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="dateSendbackAuditor">Date sendback auditor:</label>
			<input
				type="date"
				name="dateSendbackAuditor"
				id="dateSendbackAuditor"
				placeholder="Date sendback auditor here"
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="dateReportScanned">AUDIT Report (Scan to server):</label>
			<input
				type="date"
				name="dateReportScanned"
				id="dateReportScanned"
				placeholder="Date report scanned here"
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="dateLate">Late Filing:</label>
			<RadioGroup
				fieldName="isLateFiling"
				options={storeGet('yesNo')}
				selectedItem={isLateFiling}
			/>
		</div>
	</fieldset>

	<div>
		<TaskAssignment {homePic} {svcProviders} {picId} {svcProviderId} {taskStatusCode} />
		<TaskInvoice {invoiceNo} {invoiceAmount} {invoiceDate} {paymentNote} {invoiceStatusCode} />
	</div>
</div>

<!--
	<div class="form-field">
		<label class="field-label" for="feeType">Date submitted:</label>
    <input type="date" name="dateSubmitted" id="dateSubmitted" placeholder="Date submitted here"  />
	</div>

<div class="form-field">
	<label class="field-label" for="workflowStatusCode">Workflow Status:</label>
	<RadioGroup
		fieldName="workflowStatusCode"
		options={storeGet('workflowStatusCode')}
		required={true}
		selectedItem={workflowStatusCode}
	/>
  -->

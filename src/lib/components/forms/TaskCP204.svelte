<script lang="ts">
	import { MyInvoiceStatusCode, type DefinitionDto2 } from "$lib/shared/dto/enums";
	import TaskAssignment from "./TaskAssignment.svelte";
	import TaskInvoice from "./TaskInvoice.svelte";

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
    year indicator, back and forth 1 y
		<legend>CP204 </legend>

		<div class="form-field">
			<label class="field-label" for="revision2">Revisions:</label>
			<!-- money field -->
			<input
				type="text"
				class="field-spacing"
				name="cpSubmission"
				id="cpSubmission"
				placeholder="Submission 1 here"
			/>
			<input
				type="text"
				class="field-spacing"
				name="cpRevision1"
				id="cpRevision1"
				placeholder="Revision 1 here"
			/>
			<input
				type="text"
				class="field-spacing"
				name="cpRevision2"
				id="cpRevision2"
				placeholder="Revision 2 here"
			/>
			<input
				type="text"
				class="field-spacing"
				name="cpRevisionMth11"
				id="cpRevisionMth11"
				placeholder="Revision month 11 here"
			/>
		</div>
	</fieldset>

	<div>
		<TaskAssignment {homePic} {svcProviders} {picId} {svcProviderId} {taskStatusCode} />
		<TaskInvoice {invoiceNo} {invoiceAmount} {invoiceDate} {paymentNote} {invoiceStatusCode}/>
	</div>
</div>

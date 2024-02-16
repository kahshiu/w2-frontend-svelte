<script lang="ts">
	import { MyInvoiceStatusCode, type DefinitionDto2, MySvcTypeId } from "$lib/shared/dto/enums";
	import TaskAssignment from "./TaskAssignment.svelte";
	import TaskInvoice from "./TaskInvoice.svelte";

	export let svcId = 0;
	export let svcTypeId = MySvcTypeId.CP204;

	export let svcYear = 0;
	export let submission1 = "";
	export let revision1 = "";
	export let revision2 = "";
	export let revisionMth11 = "";

	export let svcYearPrev = 0;
	export let submission1Prev = "";
	export let revision1Prev = "";
	export let revision2Prev = "";
	export let revisionMth11Prev = "";

	export let svcYearNext = 0;
	export let submission1Next = "";
	export let revision1Next = "";
	export let revision2Next = "";
	export let revisionMth11Next = "";

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
		<legend>CP204 </legend>

		<div class="form-field">
			<label class="field-label" for="revision2">Revisions {svcYearPrev}:</label>
			<input
				type="text"
				class="field-spacing"
				name="submission1Prev"
				id="submission1Prev"
				placeholder="{svcYearPrev} submission 1 here"
				bind:value={submission1Prev}
			/>
			<input
				type="text"
				class="field-spacing"
				name="revision1Prev"
				id="revision1Prev"
				placeholder="{svcYearPrev} revision 1 here"
				bind:value={revision1Prev}
			/>
			<input
				type="text"
				class="field-spacing"
				name="revision2Prev"
				id="revision2Prev"
				placeholder="{svcYearPrev} revision 2 here"
				bind:value={revision2Prev}
			/>
			<input
				type="text"
				class="field-spacing"
				name="revisionMth11Prev"
				id="revisionMth11Prev"
				placeholder="{svcYearPrev} revision month 11 here"
				bind:value={revisionMth11Prev}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="revision2">Revisions {svcYear}:</label>
			<input
				type="text"
				class="field-spacing"
				name="submission1"
				id="submission1"
				placeholder="{svcYear} submission 1 here"
				bind:value={submission1}
			/>
			<input
				type="text"
				class="field-spacing"
				name="revision1"
				id="revision1"
				placeholder="{svcYear} revision 1 here"
				bind:value={revision1}
			/>
			<input
				type="text"
				class="field-spacing"
				name="revision2"
				id="revision2"
				placeholder="{svcYear} revision 2 here"
				bind:value={revision2}
			/>
			<input
				type="text"
				class="field-spacing"
				name="revisionMth11"
				id="revisionMth11"
				placeholder="{svcYear} revision month 11 here"
				bind:value={revisionMth11}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="revision2">Revisions {svcYearNext}:</label>
			<input
				type="text"
				class="field-spacing"
				name="submission1Next"
				id="submission1Next"
				placeholder="{svcYearNext} submission 1 here"
				bind:value={submission1Next}
			/>
			<input
				type="text"
				class="field-spacing"
				name="revision1Next"
				id="revision1Next"
				placeholder="{svcYearNext} revision 1 here"
				bind:value={revision1Next}
			/>
			<input
				type="text"
				class="field-spacing"
				name="revision2Next"
				id="revision2Next"
				placeholder="{svcYearNext} revision 2 here"
				bind:value={revision2Next}
			/>
			<input
				type="text"
				class="field-spacing"
				name="revisionMth11Next"
				id="revisionMth11Next"
				placeholder="{svcYearNext} revision month 11 here"
				bind:value={revisionMth11Next}
			/>
	</fieldset>

	<div>
		<TaskAssignment {homePic} {svcProviders} {picId} {svcProviderId} {taskStatusCode} />
		<TaskInvoice {invoiceNo} {invoiceAmount} {invoiceDate} {paymentNote} {invoiceStatusCode}/>
	</div>
</div>

<script lang="ts">
	import { MyInvoiceStatusCode } from "$lib/shared/dto/enums";
	import { dtStrISO, storeGet } from "$lib/shared/dtoHelpers";
	import RadioGroup from "./RadioGroup.svelte";

	export let invoiceNo = '';
	export let invoiceAmount = '';
	export let invoiceDate = dtStrISO('');
	export let paymentNote = '';
	export let invoiceStatusCode = MyInvoiceStatusCode.TASK_IN_PROGRESS;
</script>

<fieldset>
	<legend>Invoice Details</legend>
	<div class="form-field">
		<label class="field-label" for="invoiceNo">Invoice Details:</label>
		<input
			type="text"
			class="field-spacing"
			name="invoiceNo"
			id="invoiceNo"
			placeholder="Invoice no here"
			bind:value={invoiceNo}
		/>
		<input
			type="text"
			class="field-spacing"
			name="invoiceAmount"
			id="invoiceAmount"
			placeholder="Invoice amount here"
			bind:value={invoiceAmount}
		/>
		<input
			type="date"
			class="field-spacing"
			name="invoiceDate"
			id="invoiceDate"
			bind:value={invoiceDate}
		/>
	</div>

	<div class="form-field">
		<label class="field-label" for="invoiceAmount">Payment Details:</label>
		<textarea
			class="field-spacing"
			name="paymentNote"
			rows="4"
			placeholder="Payment note here"
			bind:value={paymentNote}
		></textarea>
		<input type="date" name="paymentAmount" id="paymentAmoount" placeholder="Payment amount here" />
	</div>

	<div class="form-field">
		<label class="field-label" for="invoiceStatusCode">Invoice Status:</label>
		<RadioGroup
			fieldName="invoiceStatusCode"
			options={storeGet('invoiceStatusCode')}
			selectedItem={invoiceStatusCode}
		/>
	</div>
</fieldset>

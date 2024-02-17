<script lang="ts">
	import { MyInvoiceStatusCode } from '$lib/shared/dto/enums';
	import { dtStrISO, storeGet } from '$lib/shared/dtoHelpers';
	import { onMount } from 'svelte';
	import RadioGroup from './RadioGroup.svelte';

	export let invoiceNo = '';
	export let invoiceAmount = '';
	export let invoiceDate = '';
	export let paymentNote = '';
	export let paymentDate = '';
	export let invoiceStatusCode = MyInvoiceStatusCode.TASK_IN_PROGRESS;
</script>

<fieldset>
	<legend>Invoice Details</legend>
	<div class="form-field">
		<label class="field-label" for="invoiceNo">Invoice Details:</label>
		<div class="tooltip-anchor">
			<span class="tooltip">Invoice No</span>
			<input
				type="text"
				class="field-spacing"
				name="invoiceNo"
				id="invoiceNo"
				placeholder="Invoice no here"
				bind:value={invoiceNo}
			/>
		</div>
		<div class="tooltip-anchor">
			<span class="tooltip">Invoice Amount</span>
			<input
				type="text"
				class="field-spacing"
				name="invoiceAmount"
				id="invoiceAmount"
				placeholder="Invoice amount here"
				bind:value={invoiceAmount}
			/>
		</div>
		<div class="tooltip-anchor">
			<span class="tooltip">Invoice Date</span>
			<input
				type="date"
				class="field-spacing"
				name="invoiceDate"
				id="invoiceDate"
				bind:value={invoiceDate}
			/>
		</div>
	</div>

	<div class="form-field">
		<label class="field-label" for="paymentDate">Payment Details:</label>
		<div class="tooltip-anchor">
			<span class="tooltip">Payment Date</span>
			<input
				type="date"
				class="field-spacing"
				name="paymentDate"
				id="paymentDate"
				bind:value={paymentDate}
			/>
		</div>
		<div class="tooltip-anchor">
			<span class="tooltip">Payment Note</span>
			<textarea
				class="field-spacing"
				name="paymentNote"
				rows="4"
				placeholder="Payment note here"
				bind:value={paymentNote}
			></textarea>
		</div>
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

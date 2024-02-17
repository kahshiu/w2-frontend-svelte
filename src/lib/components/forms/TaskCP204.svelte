<script lang="ts">
	import type { RemarksDto } from '$lib/shared/dto/JsonDto';
	import { MyInvoiceStatusCode, type DefinitionDto2, MySvcTypeId } from '$lib/shared/dto/enums';
	import RemarksHistory from './RemarksHistory.svelte';
	import TaskAssignment from './TaskAssignment.svelte';
	import TaskInvoice from './TaskInvoice.svelte';

	export let svcId = 0;
	export let svcTypeId = MySvcTypeId.CP204;

	export let svcYear = 0;
	export let submission1 = '';
	export let revision1 = '';
	export let revision2 = '';
	export let revisionMth11 = '';

	export let svcYearPrev = 0;
	export let submission1Prev = '';
	export let revision1Prev = '';
	export let revision2Prev = '';
	export let revisionMth11Prev = '';

	export let svcYearNext = 0;
	export let submission1Next = '';
	export let revision1Next = '';
	export let revision2Next = '';
	export let revisionMth11Next = '';

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
	export let paymentDate = '';
	export let invoiceStatusCode = MyInvoiceStatusCode.TASK_IN_PROGRESS;

	export let remarks: RemarksDto[] = []
</script>

<div class="form-col-2">
	<fieldset>
		<legend>CP204 </legend>

		<div class="form-field">
			<label class="field-label" for="revision2">Revisions {svcYearPrev}:</label>
			<div class="tooltip-anchor">
				<span class="tooltip">{svcYearPrev} submission1</span>
				<input
					type="text"
					class="field-spacing"
					name="submission1Prev"
					id="submission1Prev"
					placeholder="{svcYearPrev} submission 1 here"
					bind:value={submission1Prev}
				/>
			</div>
			<div class="tooltip-anchor">
				<span class="tooltip">{svcYearPrev} revision1</span>
				<input
					type="text"
					class="field-spacing"
					name="revision1Prev"
					id="revision1Prev"
					placeholder="{svcYearPrev} revision 1 here"
					bind:value={revision1Prev}
				/>
			</div>
			<div class="tooltip-anchor">
				<span class="tooltip">{svcYearPrev} revision2</span>
				<input
					type="text"
					class="field-spacing"
					name="revision2Prev"
					id="revision2Prev"
					placeholder="{svcYearPrev} revision 2 here"
					bind:value={revision2Prev}
				/>
			</div>
			<div class="tooltip-anchor">
				<span class="tooltip">{svcYearPrev} revision month 11</span>
				<input
					type="text"
					class="field-spacing"
					name="revisionMth11Prev"
					id="revisionMth11Prev"
					placeholder="{svcYearPrev} revision month 11 here"
					bind:value={revisionMth11Prev}
				/>
			</div>
		</div>

		<div class="form-field">
			<label class="field-label" for="revision2">Revisions {svcYear}:</label>
			<div class="tooltip-anchor">
				<span class="tooltip">{svcYear} submission1</span>
				<input
					type="text"
					class="field-spacing"
					name="submission1"
					id="submission1"
					placeholder="{svcYear} submission 1 here"
					bind:value={submission1}
				/>
			</div>
			<div class="tooltip-anchor">
				<span class="tooltip">{svcYear} revision1</span>
				<input
					type="text"
					class="field-spacing"
					name="revision1"
					id="revision1"
					placeholder="{svcYear} revision 1 here"
					bind:value={revision1}
				/>
			</div>
			<div class="tooltip-anchor">
				<span class="tooltip">{svcYear} revision2</span>
				<input
					type="text"
					class="field-spacing"
					name="revision2"
					id="revision2"
					placeholder="{svcYear} revision 2 here"
					bind:value={revision2}
				/>
			</div>
			<div class="tooltip-anchor">
				<span class="tooltip">{svcYear} revision month 11</span>
				<input
					type="text"
					class="field-spacing"
					name="revisionMth11"
					id="revisionMth11"
					placeholder="{svcYear} revision month 11 here"
					bind:value={revisionMth11}
				/>
			</div>
		</div>

		<div class="form-field">
			<label class="field-label" for="revision2">Revisions {svcYearNext}:</label>
			<div class="tooltip-anchor">
				<span class="tooltip">{svcYearNext} submission1</span>
				<input
					type="text"
					class="field-spacing"
					name="submission1Next"
					id="submission1Next"
					placeholder="{svcYearNext} submission 1 here"
					bind:value={submission1Next}
				/>
			</div>
			<div class="tooltip-anchor">
				<span class="tooltip">{svcYearNext} revision1</span>
				<input
					type="text"
					class="field-spacing"
					name="revision1Next"
					id="revision1Next"
					placeholder="{svcYearNext} revision 1 here"
					bind:value={revision1Next}
				/>
			</div>
			<div class="tooltip-anchor">
				<span class="tooltip">{svcYearNext} revision2</span>
				<input
					type="text"
					class="field-spacing"
					name="revision2Next"
					id="revision2Next"
					placeholder="{svcYearNext} revision 2 here"
					bind:value={revision2Next}
				/>
			</div>
			<div class="tooltip-anchor">
				<span class="tooltip">{svcYearNext} revision month 11</span>
				<input
					type="text"
					class="field-spacing"
					name="revisionMth11Next"
					id="revisionMth11Next"
					placeholder="{svcYearNext} revision month 11 here"
					bind:value={revisionMth11Next}
				/>
			</div>
		</div>
	</fieldset>

	<div>
		<TaskAssignment {homePic} {svcProviders} {picId} {svcProviderId} {taskStatusCode} />
		<TaskInvoice
			{invoiceNo}
			{invoiceAmount}
			{invoiceDate}
			{paymentNote}
			{paymentDate}
			{invoiceStatusCode}
		/>
	</div>
</div>

<RemarksHistory title={'CP204'} allRemarks={[...remarks]} />
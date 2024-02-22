<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import Abbrev from '$lib/components/display/Abbrev.svelte';
	import ClientCo from '$lib/components/display/ClientCo.svelte';
	import TaskAccount from '$lib/components/forms/TaskAccount.svelte';
	import TaskAudit from '$lib/components/forms/TaskAudit.svelte';
	import TaskCP204 from '$lib/components/forms/TaskCP204.svelte';
	import TaskCosec from '$lib/components/forms/TaskCosec.svelte';
	import TaskFormC from '$lib/components/forms/TaskFormC.svelte';
	import TaskFormE from '$lib/components/forms/TaskFormE.svelte';
	import type { ClientCoDto, ProfileDto } from '$lib/shared/dto/ProfileDto';
	import type { TaskClientDto, TaskWithRemarksDto, cp204Years } from '$lib/shared/dto/TaskDto';
	import { MyEntityType, MySvcTypeId, type DefinitionDto2 } from '$lib/shared/dto/enums';
	import {
		dtStrFormatter,
		dtStrISO,
		findSvcStatusCode,
		findSvcTypeId,
		findTaskStatusCode,
		isFolderSuspended,
		isTaskKived,
		showCapitalise
	} from '$lib/shared/dtoHelpers';
	import type { PageData } from './$types';

	export let data: PageData;
	// console.log('tracing data', data);

	let tasksFiltered = data.tasks;
	let taskTargeted: TaskClientDto;
	let taskYear: string;
	let taskLabel: string;
	let picOptions: DefinitionDto2[];
	let spOptions: DefinitionDto2[];
	let relatedTasks: TaskClientDto[];

	// INTERACTIVITY: side menu
	const filterHandler = (event: Event) => {
		const el = event.target as HTMLInputElement;
		const v = el.value.toLowerCase();

		if (v.length > 0) {
			tasksFiltered = data.tasks.filter((t) => {
				const n = t.entityName.toLowerCase();
				return new RegExp(v).test(n);
			});
		} else {
			tasksFiltered = data.tasks;
		}
	};

	const resetTask = (targetId: number) => {
		taskTargeted = data.tasks.find((t) => {
			return t.taskId == targetId;
		}) as TaskClientDto;

		taskLabel = showCapitalise(findSvcTypeId(taskTargeted?.svcTypeId));
		taskYear = taskTargeted?.svcYear.toString();
		picOptions = data.svcProviders[0].staff.map((s) => ({ label: s.staffName, code: s.entityId }));
		spOptions = data.svcProviders.slice(1).map((s) => ({ label: s.entityName, code: s.entityId }));
		relatedTasks = data.relatedTasks.filter((r) => {
			return r.ownerId == taskTargeted.ownerId;
		});

		// console.log('tracing targeted', taskTargeted);
	};
	resetTask(data.taskId);

	// DISPLAY: options

	// INTERACTIVITY: page
	const getUrl = (data: PageData, taskId: number) => {
		const qs = new URLSearchParams();
		qs.append('taskId', taskId.toString());
		return `/tasks/${data.year}/${data.svcTypeLabel}?${qs.toString()}`;
	};

	const getClientUrl = (client: ClientCoDto) => {
		let url = '';
		if (client.entityType === MyEntityType.INDIVIDUAL) url = `/clients/indi/${client.entityId}`;
		else if (client.entityType === MyEntityType.COMPANY) url = `/clients/co/${client.entityId}`;
		return url;
	};

	const getTaskUrl = (item: TaskClientDto) => {
		const qs = new URLSearchParams();
		qs.append('taskId', item.taskId.toString());
		return `/tasks/${item.svcYear}/${findSvcTypeId(item.svcTypeId)}?${qs.toString()}`;
	};
	/*
	const getFolderUrl = (client: ClientCoDto) => {
		let url = '';
		if (client.entityType === MyEntityType.INDIVIDUAL)
			url = `/clients/indi/${client.entityId}/services`;
		else if (client.entityType === MyEntityType.COMPANY)
			url = `/clients/co/${client.entityId}/services`;
		return url;
	};
	*/
	afterNavigate(() => {
		resetTask(data.taskId);
		// resetKeys(data.services);
	});
</script>

<div>
	<h1><a href="/"> MasterList </a></h1>
	<nav>
		<input type="text" class="mb-small" placeholder="Filter Names" on:input={filterHandler} />
		<ul class="sidebar">
			{#each tasksFiltered as item}
				<li><a href={getUrl(data, item.taskId)}>{item.entityName}</a></li>
			{/each}
		</ul>
	</nav>
</div>

<main>
	<nav class="breadcrumb">
		<ul>
			<li>
				<details style="display: inline-block">
					<summary> Browse </summary>
					<div style="margin-top: var(--spacing-medium); padding-top">
						<div><a href="/tasks/browse/pics">Browse by PIC</a></div>
						<div><a href="/tasks/browse/folders">Browse by Folders</a></div>
					</div>
				</details>
			</li>
			<li>Edit Task [ID: {data.taskId}]</li>
		</ul>
	</nav>
	<h2>Edit {taskLabel} Task, {taskYear}</h2>

	<h3><u>Client Details</u></h3>
	<div class="button-group">
		<a class="button small" href={getClientUrl(taskTargeted)}>Edit Client Details</a>
	</div>

	<ClientCo targetEntity={taskTargeted} />

	<h3><u>Client Tasks, {taskYear}</u></h3>
	{#if relatedTasks.length > 0}
		<table class="border-all">
			<thead>
				<tr>
					<th class="narrow">Year</th>
					<th>Task Type</th>
					<th>PIC Assigned</th>
					<th>External SP</th>
					<th>Task Status</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{#each relatedTasks as item, key}
					{@const nextUrl = getTaskUrl(item)}
					<tr class={isTaskKived(item.taskStatusCode) ? 'gray-text' : ''}>
						<td class="narrow"> {item.svcYear} </td>
						<td> {findSvcTypeId(item.svcTypeId)} </td>
						<td> {item.picName} </td>
						<td> {item.svcProviderName} </td>
						<td> {findTaskStatusCode(item.taskStatusCode)} </td>
						<td> <a href={nextUrl}>Edit</a> </td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<div class="mt-med">
					<Abbrev></Abbrev>
				</div>
			</tfoot>
		</table>
	{:else}
		-- No related tasks --
	{/if}

	<h3><u>Folder Details</u></h3>
	<div class="button-group">
		<input
			type="button"
			class="small"
			value="Create Folders"
			on:click={() => {
				goto(`/clients/co/${taskTargeted.entityId}/services`);
			}}
		/>
		<input
			type="button"
			class="small"
			value="Create Tasks"
			on:click={() => {
				goto(`/clients/co/${taskTargeted.entityId}/tasks`);
			}}
		/>
	</div>
	<table class="border-all">
		<thead>
			<tr>
				<th class="narrow">ID</th>
				<th>Folder Type</th>
				<th>Default PIC Assigned</th>
				<th>Default External SP</th>
				<th>Folder Status</th>
			</tr>
		</thead>
		<tbody>
			<tr class={isFolderSuspended(taskTargeted.svcStatusCode) ? 'gray-text' : ''}>
				<td class="narrow"> {taskTargeted.svcId} </td>
				<td> {findSvcTypeId(taskTargeted.svcTypeId)} </td>
				<td> {taskTargeted.defaultPicName} </td>
				<td> {taskTargeted.defaultSvcProviderName} </td>
				<td> {findSvcStatusCode(taskTargeted.svcStatusCode)} </td>
			</tr>
		</tbody>
	</table>

	<h3><u>{taskLabel} Details, {taskYear}</u></h3>

	<form method="POST" action="?/save">
		<input type="hidden" readonly name="taskId" value={taskTargeted.taskId} />
		<input type="hidden" readonly name="svcYear" value={taskTargeted.svcYear} />
		<input type="hidden" readonly name="svcId" value={taskTargeted.svcId} />
		<input type="hidden" readonly name="svcTypeId" value={taskTargeted.svcTypeId} />
		<input type="hidden" readonly name="ownerId" value={taskTargeted.ownerId} />

		{#if taskTargeted.svcTypeId === MySvcTypeId.ACCOUNT}
			<TaskAccount
				fee={taskTargeted.fee}
				engagementType={taskTargeted.engagementType}
				homePic={picOptions}
				svcProviders={spOptions}
				picId={taskTargeted.picId}
				svcProviderId={taskTargeted.svcProviderId}
				taskStatusCode={taskTargeted.taskStatusCode}
				remarks={taskTargeted.remarks ?? []}
			/>
		{:else if taskTargeted.svcTypeId === MySvcTypeId.AUDIT}
			<TaskAudit
				closingStock={taskTargeted.closingStock}
				dateAuditDue={dtStrISO(taskTargeted.dateAuditDue)}
				dateReadyAudit={dtStrISO(taskTargeted.dateReadyAudit)}
				dateQueriesReceived={dtStrISO(taskTargeted.dateQueriesReceived)}
				dateQueriesReplied={dtStrISO(taskTargeted.dateQueriesReplied)}
				dateAuditPageSigned={dtStrISO(taskTargeted.dateAuditPageSigned)}
				dateTaxPageSigned={dtStrISO(taskTargeted.dateTaxPageSigned)}
				dateCosecAccPageSigned={dtStrISO(taskTargeted.dateCosecAccPageSigned)}
				dateSendbackClient={dtStrISO(taskTargeted.dateSendbackClient)}
				dateSendbackAuditor={dtStrISO(taskTargeted.dateSendbackAuditor)}
				dateReportScanned={dtStrISO(taskTargeted.dateReportScanned)}
				dateLateFiling={dtStrISO(taskTargeted.dateLateFiling)}
				isLateFiling={taskTargeted.isLateFiling}
				homePic={picOptions}
				svcProviders={spOptions}
				picId={taskTargeted.picId}
				svcProviderId={taskTargeted.svcProviderId}
				taskStatusCode={taskTargeted.taskStatusCode}
				invoiceNo={taskTargeted.invoiceNo}
				invoiceAmount={taskTargeted.invoiceAmount}
				invoiceDate={dtStrISO(taskTargeted.invoiceDate)}
				paymentNote={taskTargeted.paymentNote}
				paymentDate={dtStrISO(taskTargeted.paymentDate)}
				invoiceStatusCode={taskTargeted.invoiceStatusCode}
				remarks={taskTargeted.remarks ?? []}
			/>
		{:else if taskTargeted.svcTypeId === MySvcTypeId.COSEC}
			<TaskCosec
				homePic={picOptions}
				svcProviders={spOptions}
				picId={taskTargeted.picId}
				svcProviderId={taskTargeted.svcProviderId}
				taskStatusCode={taskTargeted.taskStatusCode}
				remarks={taskTargeted.remarks ?? []}
			/>
		{:else if taskTargeted.svcTypeId === MySvcTypeId.FORM_C}
			<TaskFormC
				fee={taskTargeted.fee}
				hasManagementAcc={taskTargeted.hasManagementAcc}
				dateManagementAcc={dtStrISO(taskTargeted.dateManagementAcc)}
				hasTaxDraft1={taskTargeted.hasTaxDraft1}
				dateTaxDraft1={dtStrISO(taskTargeted.dateTaxDraft1)}
				hasAuditDraft={taskTargeted.hasAuditDraft}
				dateAuditDraft={dtStrISO(taskTargeted.dateAuditDraft)}
				dateTaxDraftWip={dtStrISO(taskTargeted.dateTaxDraftWip)}
				dateTaxDraftToReview={dtStrISO(taskTargeted.dateTaxDraftToReview)}
				dateTaxDraftFromReview={dtStrISO(taskTargeted.dateTaxDraftFromReview)}
				dateTaxDraftToClient={dtStrISO(taskTargeted.dateTaxDraftToClient)}
				dateTaxDraftSignedBack={dtStrISO(taskTargeted.dateTaxDraftSignedBack)}
				dateSubmission={dtStrISO(taskTargeted.dateSubmission)}
				homePic={picOptions}
				svcProviders={spOptions}
				picId={taskTargeted.picId}
				svcProviderId={taskTargeted.svcProviderId}
				taskStatusCode={taskTargeted.taskStatusCode}
				invoiceNo={taskTargeted.invoiceNo}
				invoiceAmount={taskTargeted.invoiceAmount}
				invoiceDate={dtStrISO(taskTargeted.invoiceDate)}
				paymentNote={taskTargeted.paymentNote}
				paymentDate={dtStrISO(taskTargeted.paymentDate)}
				invoiceStatusCode={taskTargeted.invoiceStatusCode}
				remarks={taskTargeted.remarks ?? []}
			/>
		{:else if taskTargeted.svcTypeId === MySvcTypeId.FORM_E}
			<TaskFormE
				fee={taskTargeted.fee}
				accountByUs={taskTargeted.accountByUs}
				dateDocsIn={dtStrISO(taskTargeted.dateDocsIn)}
				dateDraftReview={dtStrISO(taskTargeted.dateDraftReview)}
				dateDraftReturn={dtStrISO(taskTargeted.dateDraftReturn)}
				dateClientSigned={dtStrISO(taskTargeted.dateClientSigned)}
				isFeePaid={taskTargeted.isFeePaid}
				dateSubmission={dtStrISO(taskTargeted.dateSubmission)}
				homePic={picOptions}
				svcProviders={spOptions}
				picId={taskTargeted.picId}
				svcProviderId={taskTargeted.svcProviderId}
				taskStatusCode={taskTargeted.taskStatusCode}
				invoiceNo={taskTargeted.invoiceNo}
				invoiceAmount={taskTargeted.invoiceAmount}
				invoiceDate={dtStrISO(taskTargeted.invoiceDate)}
				paymentNote={taskTargeted.paymentNote}
				paymentDate={dtStrISO(taskTargeted.paymentDate)}
				invoiceStatusCode={taskTargeted.invoiceStatusCode}
				remarks={taskTargeted.remarks ?? []}
			/>
		{:else if taskTargeted.svcTypeId === MySvcTypeId.CP204}
			<TaskCP204
				svcId={taskTargeted.svcId}
				svcTypeId={taskTargeted.svcTypeId}
				svcYear={taskTargeted.svcYear}
				submission1={taskTargeted.submission1}
				revision1={taskTargeted.revision1}
				revision2={taskTargeted.revision2}
				revisionMth11={taskTargeted.revisionMth11}
				svcYearPrev={taskTargeted.svcYearPrev}
				submission1Prev={taskTargeted.submission1Prev}
				revision1Prev={taskTargeted.revision1Prev}
				revision2Prev={taskTargeted.revision2Prev}
				revisionMth11Prev={taskTargeted.revisionMth11Prev}
				svcYearNext={taskTargeted.svcYearNext}
				submission1Next={taskTargeted.submission1Next}
				revision1Next={taskTargeted.revision1Next}
				revision2Next={taskTargeted.revision2Next}
				revisionMth11Next={taskTargeted.revisionMth11Next}
				homePic={picOptions}
				svcProviders={spOptions}
				picId={taskTargeted.picId}
				svcProviderId={taskTargeted.svcProviderId}
				taskStatusCode={taskTargeted.taskStatusCode}
				invoiceNo={taskTargeted.invoiceNo}
				invoiceAmount={taskTargeted.invoiceAmount}
				invoiceDate={dtStrISO(taskTargeted.invoiceDate)}
				paymentNote={taskTargeted.paymentNote}
				paymentDate={dtStrISO(taskTargeted.paymentDate)}
				invoiceStatusCode={taskTargeted.invoiceStatusCode}
				remarks={taskTargeted.remarks ?? []}
			/>
		{/if}

		<div class="form-actions">
			<input type="submit" value="Save" />
		</div>
	</form>
</main>

<!-- year indication -->

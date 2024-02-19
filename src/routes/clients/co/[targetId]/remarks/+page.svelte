<script lang="ts">
	import type { ClientCoDto } from '$lib/shared/dto/ProfileDto.js';
	import { MySvcTypeId, type SvcTypeId, type SvcTypeLabel } from '$lib/shared/dto/enums.js';
	import type { TaskAssignmentDto } from '$lib/shared/dto/TaskDto.js';
	import { dtFormatter, findSvcTypeId, showCapitalise, storeGet } from '$lib/shared/dtoHelpers';
	import type { PageData } from './$types.js';
	import { afterNavigate } from '$app/navigation';

	export let data: PageData;

	let clientsFiltered = data.clients;
	let groupedRemarks: any = {};
	let targetEntity: ClientCoDto;

	// INTERACTIVITY: side menu
	const filterHandler = (event: Event) => {
		const el = event.target as HTMLInputElement;
		const v = el.value.toLowerCase();

		if (v.length > 0) {
			clientsFiltered = data.clients.filter((p) => {
				const n = p.entityName.toLowerCase();
				return new RegExp(v).test(n);
			});
		} else {
			clientsFiltered = data.clients;
		}
	};

	const resetEntity = (targetId: number) => {
		targetEntity = data.clients.find((s) => {
			return s.entityId == targetId;
		}) as ClientCoDto;
	};

	resetEntity(data.targetId);

	const groupRemarks = () => {
		Object.entries(data.remarks.taskRemarks).forEach((e, i) => {
			const [key, value] = e;
			const isExists = value.svcTypeId in groupedRemarks;
			if (!isExists) groupedRemarks[value.svcTypeId] = [];
			groupedRemarks[value.svcTypeId].push(value);
		});
	};

	groupRemarks();
	console.log('tracing data: ', data, groupedRemarks);

	afterNavigate(() => {
		resetEntity(data.targetId);
	});
</script>

<div>
	<h1><a href="/"> MasterList </a></h1>
	<nav>
		<input type="text" class="mb-small" placeholder="Filter Names" on:input={filterHandler} />
		<ul class="sidebar">
			{#each clientsFiltered as item}
				{@const url = `/clients/co/${item.entityId}/remarks`}
				<li><a href={url}>{item.entityName}</a></li>
			{/each}
		</ul>
	</nav>
</div>

<main>
	<nav class="breadcrumb">
		<ul>
			<li><a href="/clients">List of Clients</a></li>
			<li><a href="/clients/co/{targetEntity?.entityId}">{targetEntity?.entityName}</a></li>
			<li>Folders Remarks</li>
		</ul>
	</nav>
	<h2>{targetEntity.entityName} Folders Remarks</h2>

	{#each data.remarks.serviceRemarks as sRemarks, sIndex}
		{@const taskRemarks = groupedRemarks[sRemarks.svcTypeId]}
		<h3><u> {findSvcTypeId(sRemarks.svcTypeId)} </u></h3>
		<table class="border-all">
			<colgroup>
				<col class="narrow"/>
				<col/>
				<col/>
			</colgroup>
			<tbody>
				<tr>
					<td colspan="4">
						<b>Task Remarks</b>
					</td>
				</tr>
				{#if taskRemarks !== undefined}
					<tr>
						<th><b><i>Task Year</i></b></th>
						<th><b><i>Remarks Date</i></b></th>
						<th><b><i>Remarks</i></b></th>
						<th><b><i>Actions</i></b></th>
					</tr>
					{#each taskRemarks as tt}
						{#if tt.remarks != null}
							{#each tt.remarks as rr}
								<tr>
									<td>{tt.svcYear}</td>
									<td style="white-space: nowrap">{dtFormatter(new Date(rr.date))}</td>
									<td style="width:100%">{rr.remarks}</td>
									<td><a href="/tasks/{tt.svcYear}/{findSvcTypeId(tt.svcTypeId)}?taskId={tt.taskId}">Link to Task</a></td>
								</tr>
							{/each}
						{/if}
					{/each}
				{/if}

				<tr>
					<td colspan="4">
						<br />
						<b>Folder Remarks</b>
					</td>
				</tr>
				{#each sRemarks.remarks as ss}
					{@const ssDate = dtFormatter(new Date(ss.date))}
					<tr>
						<td></td>
						<td>{ssDate}</td>
						<td>{ss.remarks}</td>
						<td></td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/each}
</main>

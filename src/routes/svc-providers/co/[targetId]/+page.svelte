<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import type { SvcProviderCoDto } from '$lib/shared/dto/ProfileDto.js';
  import SvcProviderForm from '$lib/components/SvcProviderForm.svelte';

	export let data;
	let svcProviderFiltered = data.svcProviders;
  let targetEntity: SvcProviderCoDto;

	const resetEntity = (targetId: number) => {
    targetEntity = data.svcProviders.find((s)=>{
      return s.entityId == targetId;
    }) as SvcProviderCoDto
	};

	resetEntity(data.targetId);

	const filterHandler = (event: Event) => {
		const el = event.target as HTMLInputElement;
		const v = el.value.toLowerCase();

		if (v.length > 0) {
			svcProviderFiltered = data.svcProviders.filter((p) => {
				const n = p.entityName.toLowerCase();
				return n.match(v);
			});
		} else {
			svcProviderFiltered = data.svcProviders;
		}
	};

	afterNavigate(() => {
		resetEntity(data.targetId);
	});
</script>

<div>
	<h1>MasterList</h1>
	<a class="button mb-small" href="/svc-providers/co/new">New Company Service Provider</a>
	<nav>
    <input type="text" class="mb-small" placeholder="Filter Names" on:input={filterHandler} />
		<ul class="sidebar">
			{#each data.svcProviders as item, key}
				<li><a href="/svc-providers/co/{item.entityId}">{item.entityName}</a></li>
			{/each}
		</ul>
	</nav>
</div>

<main>
	<nav class="breadcrumb">
		<ul>
			<li><a href="/svc-providers">List of Service Provider</a></li>
      <li>{targetEntity.entityName} [ID: {targetEntity.entityId}]</li>
		</ul>
	</nav>

	<h2> Update Service Provider </h2>

	<form method="POST" action="?/save">
    <SvcProviderForm 
      definitions={data.definitions}
      entityId={targetEntity.entityId}
      entityName={targetEntity.entityName}
      entityStatus={targetEntity.entityStatus}
      contactDetails={targetEntity.contactDetails}
      staff={targetEntity.staff}
    />
    <div class="form-actions">
      <input type="submit" value="Save" />
      <input class="reset" type="button" value="Cancel" />
    </div>
	</form>
</main>

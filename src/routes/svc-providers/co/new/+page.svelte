<script>
	import NavMain from '$lib/components/NavMain.svelte';
	import SvcProviderForm from '$lib/components/SvcProviderForm.svelte';
	import { EntityStatus } from '$lib/shared/dto/enums';

	export let data;
</script>

<div>
	<NavMain />
</div>

<main>
	<nav class="breadcrumb">
		<ul>
			<li><a href="/svc-providers">List of Service Provider</a></li>
			<li>New Service Provider [ID: to be generated]</li>
		</ul>
	</nav>

	<h2>New Service Provider</h2>

	<form method="POST" action="/svc-providers/co/0?/save">
		<SvcProviderForm
			definitions={data.definitions}
			entityId={0}
			entityName={''}
			entityStatus={EntityStatus.ACTIVE}
			contactDetails={[]}
			staff={[]}
		/>
		<div class="form-actions">
			<input type="submit" value="Save" />
			<input class="reset" type="button" value="Cancel" />
		</div>
	</form>
</main>

<script>
	import NavMain from '$lib/components/NavMain.svelte';
	import ClientCoForm from '$lib/components/ClientCoForm.svelte';
	export let data;
</script>

<div>
	<NavMain />
</div>

<main>
	<nav class="breadcrumb">
		<ul>
			<li><a href="/clients">List of Company Clients</a></li>
			<li>New Company Client [ID: to be generated]</li>
		</ul>
	</nav>

	<h2>New Company Client</h2>

	<form method="POST" action="/clients/co/0?/save">
		<ClientCoForm
			definitions={data.definitions}
		/>
		<div class="form-actions">
			<input type="submit" value="Save" />
		</div>
	</form>
</main>
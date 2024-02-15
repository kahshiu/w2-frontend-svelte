<script lang="ts">
	import RemarksHistory from "./RemarksHistory.svelte";
	import TaskAssignment from "./TaskAssignment.svelte";
	import type { DefinitionDto2 } from '$lib/shared/dto/enums';

	export let homePic: DefinitionDto2[] = [];
	export let svcProviders: DefinitionDto2[] = [];

	export let picId: number = 0;
	export let svcProviderId: number = 0;
	export let taskStatusCode: number = 100;
</script>

<div class="form-col-2">
	<fieldset>
		<legend>Co. Sec.</legend>
    -- No data fields for now --
	</fieldset>
	<TaskAssignment {homePic} {svcProviders} {picId} {svcProviderId} {taskStatusCode} />
</div>

<RemarksHistory title={'COSEC'} allRemarks={[]} />
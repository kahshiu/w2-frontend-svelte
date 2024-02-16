<script lang="ts">
	import RemarksHistory from './RemarksHistory.svelte';
	import TaskAssignment from './TaskAssignment.svelte';
	import { MyFeeType, type DefinitionDto2, MyTaskStatusCode } from '$lib/shared/dto/enums';

	export let fee = '';
	export let engagementType = '';

	export let homePic: DefinitionDto2[] = [];
	export let svcProviders: DefinitionDto2[] = [];

	export let picId: number = 0;
	export let svcProviderId: number = 0;
	export let taskStatusCode: number = MyTaskStatusCode.ACTIVE;

</script>

<div class="form-col-2">
	<fieldset>
		<legend>Account</legend>

		<div class="form-field">
			<label class="field-label" for="fee">Monthly fee:</label>
			<input type="hidden" name="feeType" value={MyFeeType.ACC_MONTHLY} />
			<input
				type="text"
				class="field-spacing"
				name="fee"
				id="fee"
				placeholder="Monthly fee here"
				bind:value={fee}
			/>
		</div>

		<div class="form-field">
			<label class="field-label" for="engagementType">Engagement type:</label>
			<textarea
				class="field-spacing"
				name="engagementType"
				rows="4"
				placeholder="Engagement type here"
				bind:value={engagementType}
			></textarea>
		</div>
	</fieldset>
	<TaskAssignment {homePic} {svcProviders} {picId} {svcProviderId} {taskStatusCode} />
</div>

<RemarksHistory title={'Account'} allRemarks={[]} />

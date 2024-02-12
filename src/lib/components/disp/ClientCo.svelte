<script lang="ts">
	import type { MyDefinition } from '$lib/shared/MyDefinition';
	import type { ClientCoDto } from '$lib/shared/dto/ProfileDto';
	import { defaultFormatOptions, dtStrFormatter } from '$lib/shared/utils';

	export let myDefinition: MyDefinition;
	export let targetEntity: ClientCoDto;
</script>

<div class="disp-4-col">
	<div>Co. Name:</div>
	<div>
		{targetEntity.entityName}
		[ID: {targetEntity.entityId}]
	</div>
	<div>Co. Type</div>
	<div>
		{myDefinition.findEntry('entitySubtype', targetEntity.entitySubtype)}
	</div>
	<div>Co. Reg. No. (New)</div>
	<div>
		{targetEntity.coRegNoNew}
	</div>
	<div>Co. Reg No (Old)</div>
	<div>
		{targetEntity.coRegNoOld}
	</div>

	<div>Date Incorp</div>
	<div>
		{dtStrFormatter(targetEntity.dateIncorp, { ...defaultFormatOptions, timeStyle: undefined })}
	</div>

	<div>Date Commence</div>
	<div>
		{dtStrFormatter(targetEntity.dateCommence, { ...defaultFormatOptions, timeStyle: undefined })}
	</div>

	<div>Income Tax No</div>
	<div>
		{targetEntity.incomeTaxNo}
	</div>
	<div>Income Tax Branch</div>
	<div>
		{targetEntity.incomeTaxBranch}
	</div>

	<div>Employer No</div>
	<div>
		{targetEntity.employerNo}
	</div>

	<div>Co. Status</div>
	<div>
		{myDefinition.findEntry('entityStatus', targetEntity.entityStatus)}
	</div>
	<div>Profile Status</div>
	<div>
		{myDefinition.findEntry('profileStatus', targetEntity.profileStatus)}
	</div>
</div>

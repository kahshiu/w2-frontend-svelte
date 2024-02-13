<script lang="ts">
	import type { ClientCoDto } from '$lib/shared/dto/ProfileDto';
	import { findEntityStatus, findEntitySubtype, findProfileStatus } from '$lib/shared/dtoHelpers';
	import { defaultFormatOptions, dtStrFormatter } from '$lib/shared/utils';

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
		{findEntitySubtype(targetEntity.entitySubtype)}
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
		{findEntityStatus(targetEntity.entityStatus)}
	</div>
	<div>Profile Status</div>
	<div>
		{findProfileStatus(targetEntity.profileStatus)}
	</div>
</div>

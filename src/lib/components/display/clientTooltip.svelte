<script lang="ts">
	import type { ClientCoDto } from '$lib/shared/dto/ProfileDto';
	import { defaultFormatOptions, dtStrFormatter, findMonth } from '$lib/shared/dtoHelpers';

	export let item: ClientCoDto;
</script>

<div class="tooltip-anchor">
	<div class="tooltip" style="width: 20rem; text-align: left">
		<div>*Click to Edit Profile*</div>
		<span class="tooltip-row-title">Income Tax: </span>
		{item.incomeTaxNo} [{item.incomeTaxBranch}] <br />
		<span class="tooltip-row-title"> Reg No New: </span>
		{item.coRegNoNew} <br />
		<span class="tooltip-row-title">Reg No Old: </span>{item.coRegNoOld} <br />
		<span class="tooltip-row-title">Date incorp: </span>{dtStrFormatter(item.dateIncorp, {
			...defaultFormatOptions,
			timeStyle: undefined
		})} <br />
		<span class="tooltip-row-title">Date commence: </span>{dtStrFormatter(item.dateCommence, {
			...defaultFormatOptions,
			timeStyle: undefined
		})} <br />
		<span class="tooltip-row-title">Year End Month: </span>{findMonth(item.yearEndMth)}
		<br />
		<span class="tooltip-row-title">AR Due Month: </span>{findMonth(item.arDueMth)}
		<br />
		<span class="tooltip-row-title">Employer No: </span>{item.employerNo} <br />
	</div>
	<slot />
</div>

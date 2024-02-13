<script lang="ts">
	import type { RemarksDto } from '$lib/shared/dto/JsonDto';
	import RemarksHistory from '$lib/components/forms/RemarksHistory.svelte';
	import type { SvcProviderCoDto } from '$lib/shared/dto/ProfileDto';
	import RadioGroup from './forms/RadioGroup.svelte';
	import { findSvcTypeId, showCapitalise, storeGet } from '$lib/shared/dtoHelpers';
	import { type SvcTypeId, MySvcTypeId } from '$lib/shared/dto/enums';

	export let ownerId = 0;
	export let svcTypeId: SvcTypeId = MySvcTypeId.ACCOUNT;
	export let defaultPicId = 0;
	export let defaultSvcProviderId = 0;
	export let remarks: RemarksDto[] = [];
	export let svcStatusCode = 2;

	// SECTION: prepare options
	export let svcProviders: SvcProviderCoDto[] = [];
	const homeCompany = svcProviders.find((e) => e.entityId == 1);
	const homeStaff = homeCompany?.staff ?? [];
	const otherCompany = svcProviders.filter((e) => e.entityId != 1);

	const svcPic = homeStaff.map((e) => ({ code: e.entityId, label: e.staffName }));
	const svcCompany = otherCompany.map((e) => ({ code: e.entityId, label: e.entityName }));

	// SECTION: field names
	const folderName = findSvcTypeId(svcTypeId);
	const folderNameCapitalised = showCapitalise(folderName);

	const getFieldName = (name: string, code?: any) => {
		return `services.${folderName}.${name}${code ?? ''}`;
	};
	const fnameOwnerId = getFieldName('ownerId');
	const fnameSvcTypeId = getFieldName('svcTypeId');
	const fnameDefaultPicId = getFieldName('defaultPicId');
	const fnameDefaultSvcProviderId = getFieldName('defaultSvcProviderId');
	const fnameSvcStatusCode = getFieldName('svcStatusCode');

	const getRemarksFieldName = (index: number, name: string) => {
		return `services.${folderName}.remarks.${index}.${name}`;
	};
	const getNewRemarksFieldName = () => {
		return `services.${folderName}.newRemarks`;
	};
</script>

<div class="b-bottom" style="margin-bottom: 0.2rem;">
	<h3>{folderNameCapitalised} Folder</h3>

	<div class="form-col-2">
		<input type="hidden" name={fnameOwnerId} value={ownerId} />
		<input type="hidden" name={fnameSvcTypeId} value={svcTypeId} />

		<div class="form-field">
			<label class="field-label" for={fnameDefaultPicId}>Internal PIC: </label>
			<div>
				<select id={fnameDefaultPicId} name={fnameDefaultPicId} bind:value={defaultPicId}>
					<option value="0">-- Unassigned --</option>
					{#each svcPic as item}
						<option value={item.code}>{item.label}</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="form-field">
			<label class="field-label" for={fnameDefaultSvcProviderId}>External Service Provider </label>
			<select
				id={fnameDefaultSvcProviderId}
				name={fnameDefaultSvcProviderId}
				bind:value={defaultSvcProviderId}
			>
				<option value="0">-- Unassigned --</option>
				{#each svcCompany as item}
					<option value={item.code}>{item.label}</option>
				{/each}
			</select>
		</div>

		<div class="form-field">
			<label class="field-label" for="svcStatusCode">Folder Status:</label>
			<RadioGroup
				fieldName={fnameSvcStatusCode}
				options={storeGet('svcStatusCode')}
				selectedItem={svcStatusCode}
				required={true}
			/>
		</div>
	</div>

	<RemarksHistory
		title={folderName}
		allRemarks={[...remarks]}
		getFieldName={getRemarksFieldName}
		getNewFieldName={getNewRemarksFieldName}
	/>
</div>

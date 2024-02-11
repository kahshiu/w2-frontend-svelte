<script lang="ts">
	import type { RemarksDto } from '$lib/shared/dto/JsonDto';
	import RemarksHistory from '$lib/components/forms/RemarksHistory.svelte';
	import { ServiceType } from '$lib/shared/dto/enums';
	import type { DefinitionDto, DefinitionStore } from '$lib/shared/dto/DefinitionDto';
	import type { SvcProviderCoDto } from '$lib/shared/dto/ProfileDto';
	import RadioGroup from './forms/RadioGroup.svelte';

	export let definitions: DefinitionStore;
	export let ownerId = 0;
	export let svcTypeId: ServiceType = ServiceType.ACCOUNT;
	export let defaultPicId = 0;
	export let defaultSvcProviderId = 0;
	export let remarks: RemarksDto[] = [];
	export let svcStatusCode = 2;

	const serviceTypeDef = definitions.serviceType.find((s) => {
		return s.code == svcTypeId;
	});
	const folderName = serviceTypeDef?.label ?? '';

	export let svcProviders: SvcProviderCoDto[] = [];
	const homeCompany = svcProviders.find((e) => {
		return e.entityId == 1;
	});
	const homeStaff = homeCompany?.staff ?? [];
	const svcPic = homeStaff.map((e) => {
		return { code: e.entityId, label: e.staffName };
	});
	const svcCompany = svcProviders
		.filter((e) => {
			const isHome = e.entityId == 1;
			return !isHome;
		})
		.map((e) => {
			return { code: e.entityId, label: e.entityName };
		});

	// svcStatus
	const getFieldName = (name: string, code?: any) => {
		return `services.${folderName}.${name}${code ?? ''}`;
	};

	const getRemarksFieldName = (index: number, name: string) => {
		return `services.${folderName}.remarks.${index}.${name}`;
	};
	const getNewRemarksFieldName = () => {
		return `services.${folderName}.newRemarks`;
	};
</script>

<div class="border" style="padding: 0.8rem; margin-bottom: 0.2rem">
	<h3 style="display: inline-block">{folderName} FOLDER</h3>

	<div class="form-col-2">
		<input type="hidden" name={getFieldName('ownerId')} value={ownerId} />
		<input type="hidden" name={getFieldName('svcTypeId')} value={svcTypeId} />

		<div class="form-field">
			<label class="field-label" for={getFieldName('defaultPicId')}>Internal PIC: </label>
			<div>
				<select
					id={getFieldName('defaultPicId')}
					name={getFieldName('defaultPicId')}
					bind:value={defaultPicId}
				>
					<option value="0">Leave blank</option>
					{#each svcPic as item}
						<option value={item.code}>{item.label}</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="form-field">
			<label class="field-label" for={getFieldName('defaultSvcProviderId')}
				>External Service Provider
			</label>
			<select
				id={getFieldName('defaultSvcProviderId')}
				name={getFieldName('defaultSvcProviderId')}
				bind:value={defaultSvcProviderId}
			>
				<option value="0">Leave blank</option>
				{#each svcCompany as item}
					<option value={item.code}>{item.label}</option>
				{/each}
			</select>
		</div>

		<div class="form-field">
			<label class="field-label" for="svcStatusCode">Folder Status:</label>
			<RadioGroup
				fieldName={getFieldName('svcStatusCode')}
				options={definitions.serviceStatusCode}
				selectedItem={svcStatusCode}
			/>
		</div>
	</div>

	<div>
		<RemarksHistory
			title={folderName}
			allRemarks={[...remarks]}
			getFieldName={getRemarksFieldName}
			getNewFieldName={getNewRemarksFieldName}
		/>
	</div>
</div>

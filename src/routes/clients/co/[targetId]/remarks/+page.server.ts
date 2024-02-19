import {
	GET_CO_CLIENT_REMARKS,
	fetchJson,
	fetchListCoClient,
} from '$lib/shared/ajax';
import { error } from '@sveltejs/kit';
import type { PageServerLoadEvent } from '../$types';
import type { RemarksDto } from '$lib/shared/dto/JsonDto';
import type { SvcTypeId } from '$lib/shared/dto/enums';

type ProfileRemarks = {
	serviceRemarks: {
		ownerId: number,
		remarks: RemarksDto[],
		svcTypeId: SvcTypeId,
	}[],
	taskRemarks: {
		ownerId: number,
		remarks: RemarksDto[],
		svcTypeId: SvcTypeId,
		svcYear: number,
	}[],
}

export const load = async (event: PageServerLoadEvent) => {
	const targetId = Number(event.params.targetId ?? '0');
	const clientResult = await fetchListCoClient();


	const respServices = await fetchJson<ProfileRemarks>(
		GET_CO_CLIENT_REMARKS + `?ownerId=${targetId}`
	);

	if (respServices.result === null) {
		error(404, { message: respServices.message });
	}

	return {
		clients: clientResult,
		remarks: respServices.result,
		targetId
	};
};

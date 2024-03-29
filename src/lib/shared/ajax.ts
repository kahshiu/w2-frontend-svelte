import { error } from '@sveltejs/kit';
import type { ClientCoServices, SvcProviderCoDto } from './dto/ProfileDto';
import { config } from './globals';
import type { TaskAssignmentDto } from './dto/TaskDto';

export const WAY_FRONTEND = process.env.ORIGIN ?? 'http://localhost:5173';
// export const WAY_FRONTEND = `http://localhost:3000`;
export const WAY_BACKEND = `http://${config.backend.host}:${config.backend.port}/api`;

export const GET_DIAGNOSTICS_VERSION = `${WAY_BACKEND}/diagnostics/version`;
export const GET_DEFINITIONS = `${WAY_BACKEND}/def`;

export const LIST_SERVICE_PROVIDERS = `${WAY_BACKEND}/profiles/service-providers/list`;
export const GET_SERVICE_PROVIDER = `${WAY_BACKEND}/profiles/service-providers/co`;
export const SAVE_SERVICE_PROVIDER = `${WAY_BACKEND}/profiles/service-providers/co`;
// export const SAVE_SERVICE_PROVIDER_INDIVIDUAL = `${WAY_BACKEND}/profiles/service-providers/indi`;

export const LIST_CO_CLIENT = `${WAY_BACKEND}/profiles/clients/co/list`;
export const GET_CO_CLIENT = `${WAY_BACKEND}/profiles/clients/co`;
export const SAVE_CO_CLIENT = `${WAY_BACKEND}/profiles/clients/co`;
export const GET_CO_CLIENT_REMARKS = `${WAY_BACKEND}/profiles/clients/co/services/remarks`;
export const GET_CO_CLIENT_SERVICES = `${WAY_BACKEND}/profiles/clients/co/services`;
export const SAVE_CO_CLIENT_SERVICES = `${WAY_BACKEND}/profiles/clients/co/services`;

export const LIST_INDI_CLIENT = `${WAY_BACKEND}/profiles/clients/indi/list`;
export const SAVE_INDI_CLIENT = `${WAY_BACKEND}/profiles/clients/indi`;

export const LIST_TASK_BY_YEAR_SVCTYPE = `${WAY_BACKEND}/tasks/year/svc-type-id/list`;
export const LIST_CLIENT_TASK = `${WAY_BACKEND}/tasks/client/list`;
export const LIST_TASK_ASSIGNMENT = `${WAY_BACKEND}/tasks/assignment/list`;
export const GET_CLIENT_TASK = `${WAY_BACKEND}/tasks/client`;
export const UPSERT_CLIENT_TASK = `${WAY_BACKEND}/tasks/client`;
export const UPDATE_TASK = `${WAY_BACKEND}/tasks`;
export const YEARLY_TASK_CREATION = `${WAY_BACKEND}/tasks/year/create`;

interface IResponseJson<TResult> {
	result: TResult | null;
	message: string;
}

export const fetchJson = async <TResult,>(
	url: RequestInfo,
	options?: RequestInit
): Promise<IResponseJson<TResult>> => {
	try {
		const resp = await fetch(url, options);
		return await resp.json();
	} catch (e) {
		return {
			result: null,
			message: 'Error fetching data from server'
		};
	}
};

export const fetchListSvcProvider = async () => {
	const respSvcProviders = await fetchJson<SvcProviderCoDto[]>(LIST_SERVICE_PROVIDERS);
	if (respSvcProviders.result === null) {
		error(404, { message: respSvcProviders.message });
	}
	return respSvcProviders.result;
};

export const fetchListCoClient = async () => {
	const respClients = await fetchJson<ClientCoServices[]>(LIST_CO_CLIENT);
	if (respClients.result === null) {
		error(404, { message: respClients.message });
	}
	return respClients.result;
};

export const fetchTaskAssignment = async (searchParams: URLSearchParams) => {
	const respAssignments = await fetchJson<TaskAssignmentDto[]>(
		LIST_TASK_ASSIGNMENT + `?${searchParams.toString()}`
	);
	if (respAssignments.result === null) {
		error(404, { message: respAssignments.message });
	}
	return respAssignments.result;
};

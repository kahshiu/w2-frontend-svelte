import {
  GET_CO_CLIENT_SERVICES,
  LIST_CO_CLIENT,
  LIST_SERVICE_PROVIDERS,
  SAVE_CO_CLIENT_SERVICES,
  fetchDefinition,
  fetchJson
} from "$lib/shared/ajax";
import type { SvcProviderCoDto, ClientCoDto } from "$lib/shared/dto/ProfileDto";
import type { ServiceDataset } from "$lib/shared/dto/ServiceDto";
import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoadEvent } from "../$types";

// TODO: error handling
export const load = async (event: PageServerLoadEvent) => {
  const targetId = Number(event.params.targetId ?? "0");

  const defResult = await fetchDefinition();

  const respClients = await fetchJson<ClientCoDto[]>(LIST_CO_CLIENT);
  if (respClients.result === null) {
    error(404, { message: respClients.message })
  }

  const respSvcProviders = await fetchJson<SvcProviderCoDto[]>(LIST_SERVICE_PROVIDERS);
  if (respSvcProviders.result === null) {
    error(404, { message: respSvcProviders.message })
  }

  const respServices = await fetchJson<ServiceDataset>(GET_CO_CLIENT_SERVICES + `?ownerId=${targetId}`);
  if (respServices.result === null) {
    error(404, { message: respServices.message })
  }

  return {
    definitions: defResult,
    svcProviders: respSvcProviders.result,
    clients: respClients.result,
    services: respServices.result,
    targetId,
  }
}

// TODO: error handling
export const actions: Actions = {
  save: async (event) => {
    const { request } = event;
    const formData = await request.formData();
    await fetchJson<ClientCoDto>(SAVE_CO_CLIENT_SERVICES, {
      method: "POST",
      body: formData,
    })
  }
}
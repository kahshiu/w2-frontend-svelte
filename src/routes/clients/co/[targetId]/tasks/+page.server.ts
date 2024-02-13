
import {
  GET_CO_CLIENT_SERVICES,
  fetchJson,
  fetchListCoClient,
  fetchListSvcProvider
} from "$lib/shared/ajax";
import { error } from "@sveltejs/kit";
import type { PageServerLoadEvent } from "../$types";
import type { ServiceDto } from "$lib/shared/dto/ServiceDto";

export const load = async (event: PageServerLoadEvent) => {
  const targetId = Number(event.params.targetId ?? "0");

  const spResult = await fetchListSvcProvider();
  const clientResult = await fetchListCoClient();

  const respServices = await fetchJson<ServiceDto[]>(GET_CO_CLIENT_SERVICES + `?ownerId=${targetId}`);
  if (respServices.result === null) {
    error(404, { message: respServices.message })
  }

  return {
    svcProviders: spResult,
    clients: clientResult,
    services: respServices.result,
    targetId,
  }
}

// TODO: error handling
/*
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
*/
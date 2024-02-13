import {
  GET_CO_CLIENT_SERVICES,
  SAVE_CO_CLIENT_SERVICES,
  fetchJson,
  fetchListCoClient,
  fetchListSvcProvider
} from "$lib/shared/ajax";
import type { ClientCoDto } from "$lib/shared/dto/ProfileDto";
import type { ServiceDto } from "$lib/shared/dto/ServiceDto";
import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoadEvent } from "../$types";

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
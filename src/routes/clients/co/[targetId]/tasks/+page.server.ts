
import {
  GET_CO_CLIENT_SERVICES,
  SAVE_CLIENT_TASK,
  fetchJson,
  fetchListCoClient,
  fetchListSvcProvider
} from "$lib/shared/ajax";
import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoadEvent } from "../$types";
import type { ServiceDto } from "$lib/shared/dto/ServiceDto";
import type { TaskDto } from "$lib/shared/dto/TaskDto";

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

    await fetchJson<TaskDto>(SAVE_CLIENT_TASK, {
      method: "POST",
      body: formData,
    })
  }
}
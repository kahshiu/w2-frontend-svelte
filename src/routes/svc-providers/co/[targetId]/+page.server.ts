import {
  LIST_SERVICE_PROVIDERS,
  SAVE_SERVICE_PROVIDER, 
  WAY_FRONTEND, 
  fetchDefinition, 
  fetchJson
} from "$lib/shared/ajax";
import type { ProfileDto, SvcProviderCoDto } from "$lib/shared/dto/ProfileDto";
import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoadEvent } from "./$types";

export const load = async (event: PageServerLoadEvent) => {
  const defResult = await fetchDefinition()

  const respSvcProviders = await fetchJson<SvcProviderCoDto[]>(LIST_SERVICE_PROVIDERS);
  if (respSvcProviders.result === null) {
    error(404, { message: respSvcProviders.message })
  }

  const targetId = Number(event.params.targetId ?? "0");

  return {
    definitions: defResult,
    svcProviders: respSvcProviders.result,
    targetId
  }
}

export const actions: Actions = {
  save: async (event) => {
    const { request } = event;
    const formData = await request.formData();
    const entityId = formData.get("entityId") as number | null;
    const method = entityId !== null && entityId > 0 ? "PATCH" : "POST";

    const resp = await fetchJson<ProfileDto[]>(SAVE_SERVICE_PROVIDER, {
      method,
      body: formData,
    })
    redirect(303, `${WAY_FRONTEND}/svc-providers/co/${resp.result}`)
  }
}
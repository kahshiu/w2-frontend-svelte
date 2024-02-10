import { GET_DEFINITIONS, LIST_SERVICE_PROVIDERS, SAVE_SERVICE_PROVIDER, fetchJson } from "$lib/shared/ajax";
import type { DefinitionStore } from "$lib/shared/dto/DefinitionDto";
import type { ProfileDto, SvcProviderCoDto } from "$lib/shared/dto/ProfileDto";
import { error, type Actions } from "@sveltejs/kit";
import type { PageServerLoadEvent } from "./$types";

export const load = async (event: PageServerLoadEvent) => {
  const respDef = await fetchJson<DefinitionStore>(GET_DEFINITIONS);
  if (respDef.result === null) {
    error(404, { message: respDef.message })
  }

  const respSvcProviders = await fetchJson<SvcProviderCoDto[]>(LIST_SERVICE_PROVIDERS);
  if (respSvcProviders.result === null) {
    error(404, { message: respSvcProviders.message })
  }

  const targetId = Number(event.params.targetId ?? "0");

  return {
    definitions: respDef.result,
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

    await fetchJson<ProfileDto[]>(SAVE_SERVICE_PROVIDER, {
      method,
      body: formData,
    })
  }
}
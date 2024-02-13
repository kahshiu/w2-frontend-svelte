import {
  SAVE_SERVICE_PROVIDER, 
  WAY_FRONTEND, 
  fetchJson,
  fetchListSvcProvider
} from "$lib/shared/ajax";
import type { ProfileDto } from "$lib/shared/dto/ProfileDto";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoadEvent } from "./$types";

export const load = async (event: PageServerLoadEvent) => {
  const spResult = await fetchListSvcProvider()
  const targetId = Number(event.params.targetId ?? "0");

  return {
    svcProviders: spResult,
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
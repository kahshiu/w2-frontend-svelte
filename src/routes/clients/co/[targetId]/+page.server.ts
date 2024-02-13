import { fetchJson, fetchListCoClient, SAVE_CO_CLIENT, WAY_FRONTEND } from "$lib/shared/ajax";
import type { ProfileDto } from "$lib/shared/dto/ProfileDto";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const load = async () => {
  const clientResult = await fetchListCoClient()

  return {
    clients: clientResult,
  }
}

// TODO: error handling
export const actions: Actions = {
  save: async (event) => {
    const { request } = event;
    const formData = await request.formData();
    const entityId = formData.get("entityId") as number | null;
    const method = entityId !== null && entityId > 0 ? "PATCH" : "POST";

    const resp = await fetchJson<ProfileDto[]>(SAVE_CO_CLIENT, {
      method,
      body: formData,
    })
    redirect(303, `${WAY_FRONTEND}/clients/co/${resp.result}`)
  }
}
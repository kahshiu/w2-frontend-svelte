import { LIST_CO_CLIENT, fetchDefinition, fetchJson } from "$lib/shared/ajax";
import type { ClientCoDto } from "$lib/shared/dto/ProfileDto";
import { error } from "@sveltejs/kit";

export const load = async () => {
  const defResult = await fetchDefinition()

  const respClients = await fetchJson<ClientCoDto[]>(LIST_CO_CLIENT);
  if (respClients.result === null) {
    error(404, { message: respClients.message })
  }

  return {
    definitions: defResult,
    clients: respClients.result,
  }
}


/*
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
*/
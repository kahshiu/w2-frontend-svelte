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

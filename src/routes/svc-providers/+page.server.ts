import { GET_DEFINITIONS, LIST_SERVICE_PROVIDERS, fetchJson } from "$lib/shared/ajax";
import type { DefinitionStore } from "$lib/shared/dto/DefinitionDto";
import type { SvcProviderCoDto } from "$lib/shared/dto/ProfileDto";
import { error } from "@sveltejs/kit";

export const load = async () => {
  const respDef = await fetchJson<DefinitionStore>(GET_DEFINITIONS);
  if (respDef.result === null) {
    error(404, { message: respDef.message })
  }

  const respSvcProviders = await fetchJson<SvcProviderCoDto[]>(LIST_SERVICE_PROVIDERS);
  if (respSvcProviders.result === null) {
    error(404, { message: respSvcProviders.message })
  }

  console.log("testing")
  return {
    definitions: respDef.result,
    svcProviders: respSvcProviders.result,
  }
}

import { error } from "@sveltejs/kit";
import type { DefinitionStore } from "./dto/DefinitionDto";
import { config } from "./globals";

export const WAY_FRONTEND = `http://localhost:5173`;
export const WAY_BACKEND = `http://${config.backend.host}:${config.backend.port}/api`;

export const GET_DIAGNOSTICS_VERSION = `${WAY_BACKEND}/diagnostics/version`;
export const GET_DEFINITIONS = `${WAY_BACKEND}/def`;

export const LIST_SERVICE_PROVIDERS = `${WAY_BACKEND}/profiles/service-providers/list`;
export const GET_SERVICE_PROVIDER = `${WAY_BACKEND}/profiles/service-providers/co`;
export const SAVE_SERVICE_PROVIDER = `${WAY_BACKEND}/profiles/service-providers/co`;
// export const SAVE_SERVICE_PROVIDER_INDIVIDUAL = `${WAY_BACKEND}/profiles/service-providers/indi`;

export const LIST_CO_CLIENT = `${WAY_BACKEND}/profiles/clients/co/list`;
export const GET_CO_CLIENT = `${WAY_BACKEND}/profiles/clients/co`;
export const SAVE_CO_CLIENT = `${WAY_BACKEND}/profiles/clients/co`;
export const GET_CO_CLIENT_SERVICES = `${WAY_BACKEND}/profiles/clients/co/services`;
export const SAVE_CO_CLIENT_SERVICES = `${WAY_BACKEND}/profiles/clients/co/services`;

export const LIST_INDI_CLIENT = `${WAY_BACKEND}/profiles/clients/indi/list`;
export const SAVE_INDI_CLIENT = `${WAY_BACKEND}/profiles/clients/indi`;

interface IResponseJson<TResult> {
  result: TResult | null;
  message: string;
}

export const fetchJson = async <TResult>(url: RequestInfo, options?: RequestInit): Promise<IResponseJson<TResult>> => {
  try {
    const resp = await fetch(url, options);
    return await resp.json();
  } catch (e) {
    return {
      result: null,
      message: "Error fetching data from server"
    };
  }
}

export const fetchDefinition = async () => {
  const respDef = await fetchJson<DefinitionStore>(GET_DEFINITIONS);
  if (respDef.result === null) {
    error(404, { message: respDef.message })
  }
  return respDef.result
}
import {
  fetchDefinition, 
} from "$lib/shared/ajax";

export const load = async () => {
  const defResult = await fetchDefinition()
  return {
    definitions: defResult,
  }
}
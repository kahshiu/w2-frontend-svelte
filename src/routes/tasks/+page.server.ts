import { YEARLY_TASK_CREATION, fetchJson, fetchListCoClient } from "$lib/shared/ajax";
import type { Actions } from "./$types";

export const load = async () => {
  const clientResult = await fetchListCoClient()

  return {
    clients: clientResult,
  }
}

export const actions: Actions = {
  create: async (event) => {
    const { request } = event;
    const formData = await request.formData();

    await fetchJson(YEARLY_TASK_CREATION, {
      method: "POST",
      body: formData,
    })
  }
}
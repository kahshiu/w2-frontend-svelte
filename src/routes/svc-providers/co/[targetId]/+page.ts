import type { PageLoadEvent } from "./$types";

export const load = async (event: PageLoadEvent) => {
  const targetId = Number(event.params.targetId ?? "0");

  return {
    ...event.data,
    targetId,
  }
}
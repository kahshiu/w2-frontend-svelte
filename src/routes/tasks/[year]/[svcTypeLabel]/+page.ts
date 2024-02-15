import type { PageLoadEvent } from "./$types"

export const load = async (event: PageLoadEvent) => {
  const taskId = Number(event.url.searchParams.get("taskId") ?? "0")

  return {
    ...event.data,
    taskId,
  }
}
import { fetchListCoClient } from "$lib/shared/ajax";

export const load = async () => {
  const clientResult = await fetchListCoClient()

  return {
    clients: clientResult,
  }
}

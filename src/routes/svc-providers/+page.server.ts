import { fetchListSvcProvider } from "$lib/shared/ajax";

export const load = async () => {
  const spResult = await fetchListSvcProvider()

  return {
    svcProviders: spResult,
  }
}

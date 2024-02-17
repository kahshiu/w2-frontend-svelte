import { fetchTaskAssignment } from "$lib/shared/ajax";
import type { PageServerLoadEvent } from "./$types";

export const load = async (event: PageServerLoadEvent) => {
  const {searchParams} = event.url;
  const assignments = await fetchTaskAssignment(searchParams)

  return {
    assignments,
  }
}

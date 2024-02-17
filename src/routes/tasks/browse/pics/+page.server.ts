import { fetchTaskAssignment } from "$lib/shared/ajax";
import type { PageServerLoadEvent } from "./$types";

export const load = async (event: PageServerLoadEvent) => {
  const {searchParams} = event.url;
  const assignments = await fetchTaskAssignment(searchParams)

  const picNames = assignments.map((a) => a.picName);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onlyUnique = (value: any, index: any, array: any) => {
    return array.indexOf(value) === index;
  }
  const uniqPicNames = picNames.filter(onlyUnique);

  return {
    assignments,
    uniqPicNames,
  }
}

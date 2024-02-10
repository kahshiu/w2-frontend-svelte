import type { PageLoadEvent } from "./$types";

export const load = async (event: PageLoadEvent) => {
  const { svcProviders } = event.data;
  const targetId = Number(event.params.targetId ?? "0");
  const targetEntity = svcProviders.find((s)=>{
    return s.entityId == targetId;
  })

  return {
    ...event.data,
    targetEntity,
  }
}
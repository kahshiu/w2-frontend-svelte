import type { TaskClientDto } from "$lib/shared/dto/TaskDto";
import { fetchJson, LIST_TASK_BY_YEAR_SVCTYPE } from "$lib/shared/ajax";
import { MySvcTypeId, type SvcTypeLabel } from "$lib/shared/dto/enums";
import { error } from "@sveltejs/kit";
import type { PageServerLoadEvent } from "./$types";

export const load = async (event: PageServerLoadEvent) => {
  const yyyy = Number(event.params.year);
  const svcTypeLabel = event.params.svcTypeLabel as SvcTypeLabel;
  const svcTypeId = MySvcTypeId[svcTypeLabel];

  const arrYears = [yyyy];
  const arrSvcTypeId = [svcTypeId];

  const q1 = new URLSearchParams();
  q1.append("listOfSvcTypeIds", arrSvcTypeId.join(","));
  q1.append("listOfYears", arrYears.join(","));

  const respListTask = await fetchJson<TaskClientDto[]>(LIST_TASK_BY_YEAR_SVCTYPE + `?${q1.toString()}`);
  if (respListTask.result === null) {
    error(404, { message: respListTask.message })
  }

  const q2 = new URLSearchParams();
  q2.append("listOfYears", event.params.year);

  const respRelatedTask = await fetchJson<TaskClientDto[]>(LIST_TASK_BY_YEAR_SVCTYPE + `?${q2.toString()}`);
  if (respRelatedTask.result === null) {
    error(404, { message: respRelatedTask.message })
  }

  return {
    tasks: respListTask.result,
    relatedTasks: respRelatedTask.result,
    year: yyyy,
    svcTypeLabel,
    svcTypeId,
  }
}

// TODO: error handling
/*
export const actions: Actions = {
  save: async (event) => {
    const { request } = event;
    const formData = await request.formData();
    const entityId = formData.get("entityId") as number | null;
    const method = entityId !== null && entityId > 0 ? "PATCH" : "POST";

    const resp = await fetchJson<ProfileDto[]>(SAVE_CO_CLIENT, {
      method,
      body: formData,
    })
    redirect(303, `${WAY_FRONTEND}/clients/co/${resp.result}`)
  }
}
*/
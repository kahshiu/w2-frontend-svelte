import type { TaskClientDto } from "$lib/shared/dto/TaskDto";
import { fetchJson, fetchListSvcProvider, LIST_TASK_BY_YEAR_SVCTYPE, UPDATE_TASK, WAY_FRONTEND } from "$lib/shared/ajax";
import { MySvcTypeId, type SvcTypeLabel } from "$lib/shared/dto/enums";
import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoadEvent } from "./$types";

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

  // const ownerId = respListTask.result[0].ownerId;
  const q2 = new URLSearchParams();
  q2.append("listOfYears", event.params.year);
  // q2.append("ownerId", ownerId.toString());

  console.log("tracing run")
  const respRelatedTask = await fetchJson<TaskClientDto[]>(LIST_TASK_BY_YEAR_SVCTYPE + `?${q2.toString()}`);
  if (respRelatedTask.result === null) {
    error(404, { message: respRelatedTask.message })
  }

  const spResult = await fetchListSvcProvider();

  return {
    tasks: respListTask.result,
    relatedTasks: respRelatedTask.result,
    svcProviders: spResult,
    year: yyyy,
    svcTypeLabel,
    svcTypeId,
  }
}

// TODO: error handling
export const actions: Actions = {
  save: async (event) => {
    const svcYear = event.params.year
    const svcTypeLabel = event.params.svcTypeLabel

    const formData = await event.request.formData();
    const taskId = formData.get("taskId") ?? "0";
    await fetchJson(UPDATE_TASK, {
      method: "PATCH",
      body: formData,
    });

    const nextUrl = `${WAY_FRONTEND}/tasks/${svcYear}/${svcTypeLabel}?taskId=${taskId}`;
    redirect(303, nextUrl);
  }
}
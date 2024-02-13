import type { ContactDto } from "./dto/JsonDto";
import { store, type EnumStore } from "./dto/enums";

// *************
// Store helpers
// *************
export const storeFind = (storeKey: keyof EnumStore, value: number) => {
  const dtoArr = store[storeKey] ?? [];
  const obj = dtoArr.find((item) => item.code === value);
  if (obj === undefined) return "-- Unknown -- ";
  return obj.label;
}

export const storeGet = (storeKey: keyof EnumStore) => {
  const dtoArr = store[storeKey] ?? [];
  return dtoArr;
}

export const findEntityType = (value: number) => storeFind("entityType", value);
export const findEntityClass = (value: number) => storeFind("entityClass", value);
export const findEntitySubtype = (value: number) => storeFind("entitySubtype", value);
export const findContactType = (value: number) => storeFind("contactType", value);
export const findEntityStatus = (value: number) => storeFind("entityStatus", value);
export const findProfileStatus = (value: number) => storeFind("profileStatus", value);
export const findRelationType = (value: number) => storeFind("relationType", value);
export const findSvcTypeId = (value: number) => storeFind("svcTypeId", value);
export const findSvcStatusCode = (value: number) => storeFind("svcStatusCode", value);
export const findFeeType = (value: number) => storeFind("feeType", value);
export const findTaskStatusCode = (value: number) => storeFind("taskStatusCode", value);
export const findWorkflowStatusCode = (value: number) => storeFind("workflowStatusCode", value);
export const findInvoiceStatusCode = (value: number) => storeFind("invoiceStatusCode", value);
export const findPaymentStatusCode = (value: number) => storeFind("paymentStatusCode", value);

// ***************
// display helpers
// ***************
type BaseContactDetails = { contactDetails: ContactDto[] }
const MyCheckedRadio = [true, "on"];

export const showPrimaryContact = <C extends BaseContactDetails>(item: C) => {
  const pContact = item.contactDetails.find((i) => MyCheckedRadio.includes(i.isPrimary));
  if (pContact === undefined) return '';

  const textContactType = findContactType(Number(pContact.type));
  return `${pContact.name}: ${pContact.contact} [${textContactType}]`;
};
import type { ContactDto } from "./dto/JsonDto";
import { store, type EnumStore, type DefinitionDto2 } from "./dto/enums";

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

export const showCapitalise = (str: string) => {
  const a = str.slice(0, 1).toUpperCase();
  const b = str.slice(1).toLowerCase();
  return `${a}${b}`;
}

export const showPrimaryContact = <C extends BaseContactDetails>(item: C) => {
  const pContact = item.contactDetails.find((i) => MyCheckedRadio.includes(i.isPrimary));
  if (pContact === undefined) return '';

  const textContactType = findContactType(Number(pContact.type));
  return `${pContact.name}: ${pContact.contact} [${textContactType}]`;
};

// ***********
// util string
// ***********
export const strPadded2 = (num: number) => num.toString().padStart(2, '0');

// ***********
// util array 
// ***********
export const isArrayOfEmptyObj = <T,>(arr: T[]) => {
  // NOTE: cant find even 1 filled, means all empty
  const isFilled = arr.find((value) => filledObj(value));
  return isFilled === undefined;
};

export const sortByCode = <T extends DefinitionDto2>(storeItem: T[]) => {
  return storeItem.sort((a, b) => {
    return a.code - b.code;
  })
}

// ***********
// util object 
// ***********
export const isEmptyObj = (obj: any) => Object.keys(obj).length === 0;
export const filledObj = (obj: any) => !isEmptyObj(obj);

// **********
// util dates 
// **********
interface DateFormatterOptions extends Intl.DateTimeFormatOptions {
  locale: string;
}

export const defaultFormatOptions: DateFormatterOptions = {
  locale: "en-GB",
  dateStyle: "medium",
  timeStyle: "short",
  hour12: true,
};

export const dtrStrFormatOption: DateFormatterOptions = {
  locale: "en-US",
  dateStyle: "short"
}

export const dtFormatter = (date: Date, options = defaultFormatOptions) => {
  if (date) {
    const fmt = new Intl.DateTimeFormat(options.locale, options);
    const result = fmt.format(date);
    return result;
  }
};

export const dtStrFormatter = (str: undefined | null | string, options = dtrStrFormatOption) => {
  if (str === undefined || str === null || str === "") return "";
  return dtFormatter(new Date(str), options);
};

export const dtStrISO = (isoStr: string) => {
  if (isoStr === "") return "";
  const date = new Date(isoStr);
  return date.getFullYear() + '-' + strPadded2(date.getMonth() + 1) + '-' + strPadded2(date.getDate());
}
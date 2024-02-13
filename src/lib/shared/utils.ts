// SECTION: 
export const strPadded2 = (num: number) => num.toString().padStart(2, '0');

export const isEmptyObj = (obj: any) => Object.keys(obj).length === 0;

export const filledObj = (obj: any) => !isEmptyObj(obj);

// SECTION: date helpers 
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
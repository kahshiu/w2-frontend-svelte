import type { MyDefinition } from "./MyDefinition";
import type { ContactDto } from "./dto/JsonDto";

export const displayPrimaryContact = <ContactsObj extends { contactDetails: ContactDto[] }>(
  definition: MyDefinition, item: ContactsObj 
) => {
  const pContact = item.contactDetails.find((i) => {
    return [true, 'on'].includes(i.isPrimary);
  });
  if (pContact === undefined) return '';
  return `${pContact.name}: ${pContact.contact} [${definition.findEntry('contactType', Number(pContact.type))}]`;
};
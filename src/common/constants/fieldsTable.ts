import {DocumentItemType} from "../../api/types";

export const fields: (keyof DocumentItemType)[] = [
  'companySigDate',
  'companySignatureName',
  'documentName',
  'documentStatus',
  'documentType',
  'employeeNumber',
  'employeeSigDate',
  'employeeSignatureName',
];
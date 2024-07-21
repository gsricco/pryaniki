import * as yup from "yup";

export const validationEditableRowSchema = yup.object({
  companySigDate: yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([+-]\d{2}:\d{2}))$/, 'Incorrect date and time format'),
  companySignatureName: yup.string(),
  documentName: yup.string().required('Required field'),
  documentStatus: yup.string().required('Required field'),
  documentType: yup.string(),
  employeeNumber: yup.string(),
  employeeSigDate: yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([+-]\d{2}:\d{2}))$/, 'Incorrect date and time format'),
  employeeSignatureName: yup.string(),
});
export type LoginType = {
  password: string
  username: string
}

export type Data = {
  token: string;
}

export type  ResponseType = {
  error_code: number;
  error_message: string;
  error_text?: string;
  profiling: string;
  timings?: unknown;
}

export type  LoginResponseType = ResponseType & {
  data: Data;
}


export type DocumentItemType = {
  id: string;
  documentStatus: string;
  employeeNumber: string;
  documentType: string;
  documentName: string;
  companySignatureName: string;
  employeeSignatureName: string;
  employeeSigDate: string;
  companySigDate: string;
  [key: string]: string;
}

export type DocumentCreateUpdateItemType = Omit<DocumentItemType, 'id'>;
export type DocumentsResponseType = ResponseType & {
  data: DocumentItemType[];
}


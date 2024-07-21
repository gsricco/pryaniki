import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  DocumentCreateUpdateItemType, DocumentsResponseType, LoginResponseType,
  LoginType
} from "./types";
import {getItem} from "../common/hooks/useLocalStorage";

export const pryanikApi = createApi({
  reducerPath: 'pryanikApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_DOMAIN_URL}${process.env.REACT_APP_API_URL}`,
    prepareHeaders: (headers) => {
      const token = getItem('token');
      if (token) {
        headers.set('x-auth', token);
      }
      return headers;
    },
  }),
  tagTypes: ['Documents'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseType, LoginType>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    getDocuments: builder.query<DocumentsResponseType, void>({
      query: () => ({
        url: 'userdocs/get',
        method: 'GET',
      }),
    }),
    createDocument: builder.mutation<ResponseType, DocumentCreateUpdateItemType>({
      query: (body) => ({
        url: 'userdocs/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Documents'],
    }),
    updateDocument: builder.mutation<ResponseType, { id: string; data: DocumentCreateUpdateItemType }>({
      query: ({id, data}) => ({
        url: `userdocs/set/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Documents'],
    }),
    deleteDocument: builder.mutation<ResponseType, string>({
      query: (id) => ({
        url: `userdocs/delete/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Documents'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetDocumentsQuery,
  useCreateDocumentMutation,
  useDeleteDocumentMutation,
  useUpdateDocumentMutation,
} = pryanikApi;

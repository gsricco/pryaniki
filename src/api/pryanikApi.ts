import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_DOMAIN_URL}${process.env.REACT_APP_API_URL}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('x-auth', token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, { username: string; password: string }>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    fetchData: builder.query<any[], void>({
      query: () => ({
        url: 'userdocs/get',
        method: 'GET',
      }),
    }),
    createRecord: builder.mutation<any, any>({
      query: (body) => ({
        url: 'userdocs/create',
        method: 'POST',
        body,
      }),
    }),
    updateRecord: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `userdocs/set/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteRecord: builder.mutation<any, string>({
      query: (id) => ({
        url: `userdocs/delete/${id}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useFetchDataQuery,
  useCreateRecordMutation,
  useUpdateRecordMutation,
  useDeleteRecordMutation,
} = authApi;

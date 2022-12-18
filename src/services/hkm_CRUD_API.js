import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hkm_CRUD_API = createApi({
  reducerPath: "hkm_CRUD_API",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/" }),
  endpoints: (builder) => ({
    saveBookInfo: builder.mutation({
      query: (book_info) => {
        return {
          url: "book/",
          method: "POST",
          body: book_info,
        };
      },
    }),
    getAllBooks: builder.query({
      query: () => ({
        url: "book/",
      }),
    }),

    /* ########################################## */

    addUserInfo: builder.mutation({
      query: (new_user_info) => {
        return {
          url: "user/",
          method: "POST",
          body: new_user_info,
          //   headers: { "Content-type": "application/json; charset=UTF-8" },
        };
      },
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "user/",
      }),
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSaveBookInfoMutation,
  useGetAllBooksQuery,
  useGetAllUsersQuery,
  useAddUserInfoMutation,
} = hkm_CRUD_API;

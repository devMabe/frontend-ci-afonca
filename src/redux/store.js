import { configureStore } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3006",
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("access_token")
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`)
    }
    return headers
  },
})

export const api = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users",
    }),
    resetPasswordUser: builder.mutation({
      query: (userEmail) => ({
        url: '/users/reset-password',
        method: "POST",
        body: userEmail,
      })
    }),
    confirmPasswordUser: builder.mutation({
      query: (newData) => ({
        url: '/users/confirm-password',
        method: "POST",
        body: newData,
      })
    }),
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "auth/register",
        method: "POST",
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "users/create",
        method: "POST",
        body: newUser
      })
    })
  }),
})

export const {
  useGetUsersQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useResetPasswordUserMutation,
  useConfirmPasswordUserMutation,
  useCreateUserMutation
} = api

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

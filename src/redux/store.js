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
    getUser: builder.query({
      query: (userId) => `users/${userId}`
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
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `users/update-user/${data.id}`,
        method: "PUT",
        body: data.userData,
      })
    }),
    enableUser: builder.mutation({
      query: (data) => ({
        url: `users/enable/${data.id}`,
        method: "PUT",
        body: {
          enable: data.enable
        }
      })
    }),
    setRole: builder.mutation({
      query: (data) => ({
        url: `users/set-role/${data.id}`,
        method: "PUT",
        body: {
          roles: data.roles
        }
      })
    })
  }),
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useResetPasswordUserMutation,
  useConfirmPasswordUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useEnableUserMutation,
  useSetRoleMutation
} = api

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

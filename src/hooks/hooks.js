import { useGetUsersQuery, useGetUserQuery } from "../redux/store"

export function useUsers() {
  const { data, error, isLoading } = useGetUsersQuery()

  return {
    users: data,
    isLoading,
    error,
  }
}

export function useUser(userId) {
  const { data, error, isLoading } = useGetUserQuery(userId)

  return {
    user: data,
    isLoading,
    error,
  }
}

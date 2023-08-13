import { useGetUsersQuery } from "../redux/store"

export function useUsers() {
  const { data, error, isLoading } = useGetUsersQuery()

  return {
    users: data,
    isLoading,
    error,
  }
}

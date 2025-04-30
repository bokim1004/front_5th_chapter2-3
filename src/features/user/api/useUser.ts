import { fetchUser } from "@/entities/user/api/UserAPI"
import { User } from "@/entities/user/model/UserType"
import { useQuery } from "@tanstack/react-query"

export const useUser = (userId: number) => {
  return useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  })
}

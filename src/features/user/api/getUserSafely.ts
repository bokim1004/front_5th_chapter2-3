import { fetchUser } from "@/entities/user/api/UserAPI"
import { User } from "@/entities/user/model/UserType"
import { queryClient } from "@/shared/lib/queryClient"

export const getUserSafely = async (userId: number): Promise<User> => {
  return await queryClient.ensureQueryData({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  })
}

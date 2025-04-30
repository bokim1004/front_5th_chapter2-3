import { User } from "@/entities/user/model/UserType"
import { axiosInstance } from "@/shared/api/axiosInstance"

export const getUsers = async () => {
  const response = await axiosInstance.get<{ users: User[] }>("/api/users", {
    params: { limit: 0, select: "username,image" },
  })
  return response.data.users
}

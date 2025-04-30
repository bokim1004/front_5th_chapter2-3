import { User } from "@/entities/user/model/UserType"
import axios from "axios"

export const getUsers = async () => {
  const response = await axios.get<{ users: User[] }>("/api/users", {
    params: { limit: 0, select: "username,image" },
  })
  return response.data.users
}

export const fetchUser = async (userId: number): Promise<User> => {
  const response = await axios.get(`/api/users/${userId}`)
  return response.data
}

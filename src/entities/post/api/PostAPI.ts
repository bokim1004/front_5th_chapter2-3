import { axiosInstance } from "@/shared/api/axiosInstance"
import axios from "axios"

export const fetchTags = async () => {
  try {
    const response = await axios.get("/api/posts/tags")
    return response.data
  } catch (error) {
    console.error("태그 가져오기 오류:", error)
  }
}

export const createPost = async (post: { title: string; body: string; userId: number }) => {
  const response = await axiosInstance.post("/api/posts/add", post)
  return response.data
}

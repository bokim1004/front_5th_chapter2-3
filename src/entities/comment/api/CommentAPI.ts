import { DeleteCommentParams, NewComment, UpdateCommentParams } from "@/entities/comment/model/CommentType"
import { axiosInstance } from "@/shared/api/axiosInstance"

export const addComment = async (newComment: NewComment) => {
  const response = await axiosInstance.post("/api/comments/add", newComment)
  return response.data
}

export const updateComment = async ({ id, body }: UpdateCommentParams) => {
  const response = await axiosInstance.put(`/api/comments/${id}`, { body })
  return response.data
}

export const deleteComment = async ({ id }: DeleteCommentParams) => {
  const response = await axiosInstance.delete(`/api/comments/${id}`)
  return response.data
}

import {
  CommentsResponse,
  DeleteCommentParams,
  NewComment,
  UpdateCommentParams,
} from "@/entities/comment/model/CommentType"
import { axiosInstance } from "@/shared/api/axiosInstance"
import axios from "axios"

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

export const likeComment = async ({ id, likes }: { id: number; likes: number }) => {
  const response = await axiosInstance.patch(`/api/comments/${id}`, {
    likes: likes + 1,
  })
  return response.data
}

export const fetchComments = async (postId: number): Promise<CommentsResponse> => {
  const response = await axios.get(`/api/comments/post/${postId}`)
  return response.data
}

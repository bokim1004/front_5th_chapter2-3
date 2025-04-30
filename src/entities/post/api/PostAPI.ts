import { Post } from "@/entities/post/model/PostType"
import { getUsers } from "@/entities/user/api/UserAPI"
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

export const updatePost = async (post: Post) => {
  const response = await axiosInstance.put(`/api/posts/${post.id}`, post)
  return response.data
}

export const searchPosts = async (query: string) => {
  const response = await axios.get(`/api/posts/search?q=${query}`)
  return response.data
}

export const getPosts = async ({ limit, skip }: { limit: number; skip: number }) => {
  const response = await axios.get<{
    total: number
    posts: Post[]
  }>("/api/posts", { params: { limit, skip } })
  return response.data
}

export const getPostsByTag = async (tag: string) => {
  const response = await axios.get<{
    total: number
    posts: Post[]
  }>(`/api/posts/tag/${tag}`)
  return response.data
}
// 게시물 가져오기
const fetchPosts = async ({ limit, skip }: { limit: number; skip: number }) => {
  const [postsRes, user] = await Promise.all([getPosts({ limit, skip }), getUsers()])

  const postsWithUsers = postsRes.posts.map((post) => ({
    ...post,
    author: user.find((user) => user.id === post.userId),
  }))

  return {
    posts: postsWithUsers,
    total: postsRes.total,
  }
}
// 태그별 게시물 가져오기
export const fetchPostsByTag = async ({ tag, limit, skip }: { tag: string; limit: number; skip: number }) => {
  if (!tag || tag === "all") {
    return fetchPosts({ limit, skip })
  }

  const [postsRes, users] = await Promise.all([getPostsByTag(tag), getUsers()])

  const postsWithUsers = postsRes.posts.map((post) => ({
    ...post,
    author: users.find((user) => user.id === post.userId),
  }))

  return {
    posts: postsWithUsers,
    total: postsRes.total,
  }
}

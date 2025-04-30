import { User } from "@/entities/user/model/UserType"

export interface Post {
  id?: number
  title: string
  body: string
  userId: number
  reactions?: {
    likes: number
    dislikes: number
  }
  tags?: string[] //TODO 타입 수정 필요
}

export type PostWithAuthor = Post & { author?: User }
export interface Tag {
  url: string
  slug: string
}

export interface PostResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

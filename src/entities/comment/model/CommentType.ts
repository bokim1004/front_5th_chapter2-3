export interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  likes: number
  user: {
    id: number
    username: string
    fullName: string
  }
}

export type NewComment = {
  body: string
  postId: number | null
  likes: number
  userId: number
}

export type UpdateCommentParams = {
  id: number
  body: string
}

export type DeleteCommentParams = {
  id: number
  postId: number
}

export interface CommentsResponse {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}

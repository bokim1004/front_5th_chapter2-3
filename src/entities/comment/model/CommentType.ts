export interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  likes: number
  user: {
    username: string
  }
}

export type NewComment = {
  body: string
  postId: number | null
  userId: number
}

export type UpdateCommentParams = {
  id: number
  body: string
}

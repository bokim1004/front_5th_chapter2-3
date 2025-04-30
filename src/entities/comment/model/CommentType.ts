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

export interface NewComment {
  body: string
  postId: number | null
  userId: number
}

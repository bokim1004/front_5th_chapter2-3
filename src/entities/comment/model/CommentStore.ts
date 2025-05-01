import { create } from "zustand"
import { Comment } from "./CommentType"

interface CommentStore {
  newComment: {
    body: string
    postId: number | null
    likes: number
    userId: number
  }
  selectedComment: Comment | null
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean

  setNewComment: (comment: Partial<CommentStore["newComment"]>) => void
  setSelectedComment: (comment: Comment | null) => void
  setShowAddCommentDialog: (open: boolean) => void
  setShowEditCommentDialog: (open: boolean) => void
}

export const useCommentStore = create<CommentStore>((set) => ({
  newComment: {
    body: "",
    likes: 0,
    postId: null,
    userId: 1,
  },
  selectedComment: null,
  showAddCommentDialog: false,
  showEditCommentDialog: false,

  setNewComment: (comment) =>
    set((state) => ({
      newComment: { ...state.newComment, ...comment },
    })),
  setSelectedComment: (comment) => set({ selectedComment: comment }),
  setShowAddCommentDialog: (open) => set({ showAddCommentDialog: open }),
  setShowEditCommentDialog: (open) => set({ showEditCommentDialog: open }),
}))

import { create } from "zustand"
import { Post, PostWithAuthor } from "./PostType"

interface PostStore {
  newPost: PostWithAuthor
  selectedPost: Post | null
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean

  setNewPost: (post: PostWithAuthor) => void
  setSelectedPost: (post: Post | null) => void
  setShowAddDialog: (visible: boolean) => void
  setShowEditDialog: (visible: boolean) => void
  setShowPostDetailDialog: (visible: boolean) => void
}

export const usePostStore = create<PostStore>((set) => ({
  newPost: { title: "", body: "", userId: 1 },
  selectedPost: null,
  showAddDialog: false,
  showEditDialog: false,
  showPostDetailDialog: false,

  setNewPost: (post) => set({ newPost: post }),
  setSelectedPost: (post) => set({ selectedPost: post }),
  setShowAddDialog: (visible) => set({ showAddDialog: visible }),
  setShowEditDialog: (visible) => set({ showEditDialog: visible }),
  setShowPostDetailDialog: (visible) => set({ showPostDetailDialog: visible }),
}))

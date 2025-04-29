import { create } from "zustand"

interface Post {
  id?: number
  title: string
  body: string
  userId: number
}

interface PostStore {
  newPost: Post
  selectedPost: Post | null
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean

  setNewPost: (post: Post) => void
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

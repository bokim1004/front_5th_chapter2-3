import { create } from "zustand"

interface PostPaginationStore {
  skip: number
  limit: number
  searchQuery: string
  sortBy: string
  sortOrder: "asc" | "desc"
  selectedTag: string

  setSkip: (value: number) => void
  setLimit: (value: number) => void
  setSearchQuery: (value: string) => void
  setSortBy: (value: string) => void
  setSortOrder: (value: "asc" | "desc") => void
  setSelectedTag: (tag: string) => void
}

export const usePostPaginationStore = create<PostPaginationStore>((set) => ({
  skip: 0,
  limit: 10,
  searchQuery: "",
  sortBy: "",
  sortOrder: "asc",
  selectedTag: "",

  setSkip: (value) => set({ skip: value }),
  setLimit: (value) => set({ limit: value }),
  setSearchQuery: (value) => set({ searchQuery: value }),
  setSortBy: (value) => set({ sortBy: value }),
  setSortOrder: (value) => set({ sortOrder: value }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
}))

import { create } from "zustand"

interface PostPaginationStore {
  skip: number
  limit: number
  total: number
  searchQuery: string
  sortBy: string
  sortOrder: "asc" | "desc"
  selectedTag: string

  setSkip: (value: number) => void
  setLimit: (value: number) => void
  setTotal: (value: number) => void
  setSearchQuery: (value: string) => void
  setSortBy: (value: string) => void
  setSortOrder: (value: "asc" | "desc") => void
  setSelectedTag: (tag: string) => void
  setStateFromParams: (params: URLSearchParams) => void
}

export const usePostPaginationStore = create<PostPaginationStore>((set) => ({
  skip: 0,
  limit: 10,
  total: 0,
  searchQuery: "",
  sortBy: "",
  sortOrder: "asc",
  selectedTag: "",

  setSkip: (value) => set({ skip: value }),
  setLimit: (value) => set({ limit: value }),
  setTotal: (value) => set({ total: value }),
  setSearchQuery: (value) => set({ searchQuery: value }),
  setSortBy: (value) => set({ sortBy: value }),
  setSortOrder: (value) => set({ sortOrder: value }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  setStateFromParams: (params: URLSearchParams) => {
    set({
      skip: parseInt(params.get("skip") || "0"),
      limit: parseInt(params.get("limit") || "10"),
      searchQuery: params.get("search") || "",
      sortBy: params.get("sortBy") || "",
      sortOrder: (params.get("sortOrder") as "asc" | "desc") || "asc",
      selectedTag: params.get("tag") || "",
    })
  },
}))

import { usePostPaginationStore } from "@/entities/post/model/PostPaginationStore"
import { useNavigate } from "react-router-dom"

export const usePostUpdateURL = () => {
  const navigate = useNavigate()
  const { skip, limit, searchQuery, sortBy, sortOrder, selectedTag } = usePostPaginationStore()

  return () => {
    const params = new URLSearchParams()

    if (skip !== undefined) params.set("skip", skip.toString())
    if (limit !== undefined) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)

    navigate(`?${params.toString()}`)
  }
}

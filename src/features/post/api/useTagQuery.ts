import { fetchTags } from "@/entities/post/api/PostAPI"
import { useQuery } from "@tanstack/react-query"

interface Tag {
  url: string
  slug: string
}

export const useTagsQuery = () => {
  return useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 10, //10분 캐싱
    refetchOnWindowFocus: false,
  })
}

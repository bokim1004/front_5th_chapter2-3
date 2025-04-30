import { searchPosts } from "@/entities/post/api/PostAPI"
import { useQuery } from "@tanstack/react-query"

export const usePostSearchQuery = (searchQuery: string) => {
  return useQuery({
    queryKey: ["searchPosts", searchQuery],
    queryFn: () => searchPosts(searchQuery),
    enabled: !!searchQuery, // 빈 쿼리일 땐 실행 안되게
    staleTime: 1000 * 60, // 1분동안 캐시
  })
}

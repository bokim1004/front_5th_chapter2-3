import { fetchPostsByTag } from "@/entities/post/api/PostAPI"
import { useQuery } from "@tanstack/react-query"

export const usePostsByTagQuery = ({ tag, limit, skip }: { tag: string; limit: number; skip: number }) => {
  return useQuery({
    queryKey: ["posts", tag, limit, skip],
    queryFn: () => fetchPostsByTag({ tag, limit, skip }),
    staleTime: 1000 * 30,
  })
}

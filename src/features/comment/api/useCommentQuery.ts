import { fetchComments } from "@/entities/comment/api/CommentAPI"
import { useQuery } from "@tanstack/react-query"

export const useComments = (postId: number) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    staleTime: 1000 * 30, // optional: 30초간 fresh 상태 유지
  })
}

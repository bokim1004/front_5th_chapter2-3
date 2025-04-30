import { fetchComments } from "@/entities/comment/api/CommentAPI"
import { useQuery } from "@tanstack/react-query"

export const useComments = (postId: number) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await fetchComments(postId)
      return res.comments
    },
    staleTime: 1000 * 30,
  })
}

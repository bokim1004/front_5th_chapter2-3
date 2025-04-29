import { createPost } from "@/entities/post/api/PostAPI"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useAddPostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // 성공했으면 posts 쿼리 무효화 → 자동 refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
    onError: (error) => {
      console.error("게시물 추가 오류:", error)
    },
  })
}

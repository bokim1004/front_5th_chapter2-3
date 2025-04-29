import { updatePost } from "@/entities/post/api/PostAPI"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const usePostUpdateMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
    onError: (error) => {
      console.error("게시물 업데이트 오류:", error)
    },
  })
}

import { addComment } from "@/entities/comment/api/CommentAPI"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addComment,
    onSuccess: (newComment) => {
      queryClient.setQueryData(["comments", newComment.postId], (old: Comment[]) => {
        return [...(old || []), newComment]
      })
    },
  })
}

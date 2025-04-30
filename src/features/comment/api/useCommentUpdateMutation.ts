import { updateComment } from "@/entities/comment/api/CommentAPI"
import { UpdateCommentParams } from "@/entities/comment/model/CommentType"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateComment,
    onSuccess: (updatedComment) => {
      queryClient.setQueryData(["comments", updatedComment.postId], (old: UpdateCommentParams[]) => {
        if (!old) return []
        return old.map((comment: UpdateCommentParams) => (comment.id === updatedComment.id ? updatedComment : comment))
      })
    },
  })
}

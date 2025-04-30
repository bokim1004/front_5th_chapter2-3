import { addComment } from "@/entities/comment/api/CommentAPI"
import { Comment } from "@/entities/comment/model/CommentType"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addComment,
    onSuccess: (newComment) => {
      queryClient.setQueryData<Comment[] | undefined>(["comments", newComment.postId], (old) => {
        return [...(old || []), newComment]
      })
    },
  })
}

import { deleteComment } from "@/entities/comment/api/CommentAPI"
import { Comment, DeleteCommentParams } from "@/entities/comment/model/CommentType"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: DeleteCommentParams) => deleteComment(params),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<Comment[] | undefined>(["comments", variables.postId], (oldComments) =>
        oldComments?.filter((comment) => comment.id !== variables.id),
      )
    },
    onError: (error) => {
      console.error("댓글 삭제 오류:", error)
    },
  })
}

import { likeComment } from "@/entities/comment/api/CommentAPI"
import { Comment } from "@/entities/comment/model/CommentType"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useLikeComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: likeComment,
    onSuccess: (updatedComment, variables) => {
      const { postId, id } = variables

      // const postId = updatedComment.postId

      queryClient.setQueryData<Comment[] | undefined>(["comments", postId], (oldComments) =>
        oldComments?.map((comment) => (comment.id === id ? { ...comment, likes: updatedComment.likes } : comment)),
      )
    },
    onError: (error) => {
      console.error("댓글 좋아요 오류:", error)
    },
  })
}

import { useCommentStore } from "@/entities/comment/model/CommentStore"
import { usePostPaginationStore } from "@/entities/post/model/PostPaginationStore"
import { useDeleteComment } from "@/features/comment/api/useCommentDeleteMutation"
import { useLikeComment } from "@/features/comment/api/useCommentLikeMutation"
import { useComments } from "@/features/comment/api/useCommentQuery"
import { HighlightText } from "@/shared/lib/HighlightText"
import { Button } from "@/shared/ui/Button"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"

export function CommentList({ postId }: { postId: number }) {
  const { searchQuery } = usePostPaginationStore()
  const { newComment, setNewComment, setShowAddCommentDialog, setSelectedComment, setShowEditCommentDialog } =
    useCommentStore()

  // 댓글 삭제

  const { mutate: deleteCommentMutate } = useDeleteComment()
  const handleDelete = (id: number, postId: number) => {
    deleteCommentMutate({ id, postId })
  }

  const { mutate: likeCommentMutate } = useLikeComment()

  const { data: comments = [] } = useComments(postId)

  const handleLike = (id: number) => {
    const currentLikes = comments.find((c) => c.id === id)?.likes ?? 0

    likeCommentMutate({ id, likes: currentLikes })
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment({
              ...newComment,
              postId,
            })
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{HighlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => handleLike(comment.id)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment)
                  setShowEditCommentDialog(true)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

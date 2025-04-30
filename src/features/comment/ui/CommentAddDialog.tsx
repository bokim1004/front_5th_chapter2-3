import { useCommentStore } from "@/entities/comment/model/CommentStore"
import { useAddCommentMutation } from "@/features/comment/api/useCommentAddMutation"
import { Button } from "@/shared/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { Textarea } from "@/shared/ui/TextArea"

export function CommentAddDialog() {
  const { showAddCommentDialog, setShowAddCommentDialog, newComment, setNewComment } = useCommentStore()

  // 댓글 추가
  const { mutate: addCommentMutate } = useAddCommentMutation()

  const handleAddComment = () => {
    addCommentMutate(newComment, {
      onSuccess: () => {
        setShowAddCommentDialog(false)
        setNewComment({ body: "", postId: null, userId: 1 })
      },
      onError: (error) => {
        console.error("댓글 추가 오류:", error)
      },
    })
  }

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

import { useCommentStore } from "@/entities/comment/model/CommentStore"
import { useUpdateCommentMutation } from "@/features/comment/api/useCommentUpdateMutation"
import { Button } from "@/shared/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { Textarea } from "@/shared/ui/TextArea"

{
  /* 댓글 수정 대화상자 */
}
export function CommentEditDialog() {
  const { showEditCommentDialog, setShowEditCommentDialog, selectedComment, setSelectedComment } = useCommentStore()

  // 댓글 업데이트

  const { mutate: updateCommentMutate } = useUpdateCommentMutation()

  const handleUpdateComment = () => {
    if (!selectedComment?.id) return

    updateCommentMutate(
      {
        id: selectedComment.id,
        body: selectedComment.body ?? "",
      },
      {
        onSuccess: () => {
          setShowEditCommentDialog(false)
        },
        onError: (error) => {
          console.error("댓글 업데이트 오류:", error)
        },
      },
    )
  }

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => setSelectedComment({ ...selectedComment!, body: e.target.value })}
          />
          <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

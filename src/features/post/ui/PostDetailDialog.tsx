import { usePostPaginationStore } from "@/entities/post/model/PostPaginationStore"
import { usePostStore } from "@/entities/post/model/PostStore"
import { CommentList } from "@/features/comment/ui"
import { HighlightText } from "@/shared/lib/HighlightText"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"

{
  /* 게시물 상세 보기 대화상자 */
}
export function PostDetailDialog() {
  const { selectedPost, showPostDetailDialog, setShowPostDetailDialog } = usePostStore()
  const { searchQuery } = usePostPaginationStore()

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{HighlightText(selectedPost?.title ?? "", searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{HighlightText(selectedPost?.body ?? "", searchQuery)}</p>
          <CommentList postId={selectedPost?.id ?? 0} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

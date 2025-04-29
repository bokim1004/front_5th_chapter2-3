import CommentList from "@/features/comment/ui/CommentList"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"

{
  /* 게시물 상세 보기 대화상자 */
}
function PostDetailDialog() {
  //highlightText,selectedPost,showPostDetailDialog,setShowPostDetailDialog,searchQuery값 필요
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          {CommentList(selectedPost?.id)}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetailDialog

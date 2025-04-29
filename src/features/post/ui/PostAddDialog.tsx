import { usePostStore } from "@/entities/post/model/PostStore"
import { usePostAddMutation } from "@/features/post/api/usePostAddMutation"
import { Button } from "@/shared/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/Input"
import { Textarea } from "@/shared/ui/TextArea"

export function PostAddDialog() {
  const { showAddDialog, setShowAddDialog, newPost, setNewPost } = usePostStore()

  const { mutate: addPost } = usePostAddMutation()

  const handleAddPost = () => {
    addPost(newPost, {
      onSuccess: () => {
        setShowAddDialog(false)
        setNewPost({ title: "", body: "", userId: 1 })
      },
    })
  }

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={handleAddPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

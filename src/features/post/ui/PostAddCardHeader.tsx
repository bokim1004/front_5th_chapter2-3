import { usePostStore } from "@/entities/post/model/PostStore"
import { Button } from "@/shared/ui/Button"
import { CardHeader, CardTitle } from "@/shared/ui/card"
import { Plus } from "lucide-react"

export function PostAddCardHeader() {
  const { setShowAddDialog } = usePostStore()

  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>게시물 관리자</span>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </CardTitle>
    </CardHeader>
  )
}

import { Button } from "@/shared/ui/Button"
import { CardHeader, CardTitle } from "@/shared/ui/card"
import { Plus } from "lucide-react"

const PostAddCardHeader = () => {
  //onClick함수는 커스텀 훅으로 가져올 수 있게 하기
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

export default PostAddCardHeader

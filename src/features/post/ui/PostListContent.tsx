import PostPaginationControls from "@/features/post/ui/PostPaginationControls"
import { PostSearchFilter } from "@/features/post/ui/PostSearchFilter"
import { PostTable } from "@/features/post/ui/PostTable"

export const PostListContent = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* 검색 및 필터 컨트롤 features-post-ui/features-post-model*/}
      <PostSearchFilter />
      {/* 게시물 테이블 */}
      <PostTable />
      {/* 페이지네이션 features/pagination/ui/ */}
      <PostPaginationControls />
    </div>
  )
}

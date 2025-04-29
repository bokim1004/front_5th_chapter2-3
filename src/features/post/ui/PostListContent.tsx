import PostPaginationControls from "@/features/post/ui/PostPaginationControls"
import { PostSearchFilter } from "@/features/post/ui/PostSearchFilter"
import { PostTable } from "@/features/post/ui/PostTable"
import { Loading } from "@/shared/ui/Loading"

export const PostListContent = () => {
  const loading = usePostLoading() // 예시.tanstack query에서 가져오기

  return (
    <div className="flex flex-col gap-4">
      {/* 검색 및 필터 컨트롤 features-post-ui/features-post-model*/}
      <PostSearchFilter />
      {/* 게시물 테이블 */}
      {loading ? <Loading /> : <PostTable />}
      {/* 페이지네이션 features/pagination/ui/ */}
      <PostPaginationControls />
    </div>
  )
}

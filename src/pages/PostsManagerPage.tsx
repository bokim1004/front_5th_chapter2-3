import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import UserInfoModal from "@/entities/user/ui/UserInfoModal"
import { CommentAddDialog, CommentEditDialog } from "@/features/comment/ui"
import { PostAddCardHeader, PostAddDialog, PostDetailDialog, PostEditDialog } from "@/features/post/ui"

import { usePostPaginationStore } from "@/entities/post/model/PostPaginationStore"
import { usePostUpdateURL } from "@/features/post/model/usePostUpdateURL"
import { PostListContent } from "@/features/post/ui/PostListContent"
import { Card, CardContent } from "../shared/ui/card"

const PostsManager = () => {
  const location = useLocation()

  const updateURL = usePostUpdateURL()
  const { selectedTag, limit, skip, sortBy, sortOrder } = usePostPaginationStore()
  // const { data, isLoading, isError } = usePostsByTagQuery({
  //   tag: selectedTag,
  //   limit,
  //   skip,
  // })

  useEffect(() => {
    // if (selectedTag) {
    //   fetchPostsByTag(selectedTag)
    // } else {
    //   fetchPosts()
    // }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostAddCardHeader />
      <CardContent>
        <PostListContent />
      </CardContent>
      {/* 게시물 추가 대화상자  features/post/ui*/}
      <PostAddDialog />
      {/* 게시물 수정 대화상자    features/post/ui/*/}
      <PostEditDialog />
      {/* 댓글 추가 대화상자   features/comment/ui/*/}
      <CommentAddDialog />
      {/* 댓글 수정 대화상자 entities/comment/ui/*/}
      <CommentEditDialog />
      {/* 게시물 상세 보기 대화상자  - entities/post/ui/*/}
      <PostDetailDialog />
      {/* 사용자 모달 - entities/user/ui  */}
      <UserInfoModal />
    </Card>
  )
}

export default PostsManager

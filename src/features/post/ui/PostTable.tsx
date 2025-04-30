import { usePostPaginationStore } from "@/entities/post/model/PostPaginationStore"
import { usePostStore } from "@/entities/post/model/PostStore"
import { Post, PostWithAuthor } from "@/entities/post/model/PostType"
import { useUserStore } from "@/entities/user/model/UserStore"
import { User } from "@/entities/user/model/UserType"
import { useDeletePost } from "@/features/post/api/usePostDeleteMutation"
import { usePostsByTagQuery } from "@/features/post/api/usePostsByTagQuery"
import { usePostUpdateURL } from "@/features/post/model/usePostUpdateURL"
import { HighlightText } from "@/shared/lib/HighlightText"
import { Button } from "@/shared/ui/Button"
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { useQueryClient } from "@tanstack/react-query"
import { Edit2, MessageSquare, Table, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"

export function PostTable() {
  //TODO isLoading되는 부분 추가 필요
  const { selectedTag, setSelectedTag, searchQuery, limit, skip } = usePostPaginationStore()
  const { setSelectedPost, setShowEditDialog, setShowPostDetailDialog } = usePostStore()
  const { setShowUserModal, setSelectedUser } = useUserStore()
  const updateURL = usePostUpdateURL()
  const queryClient = useQueryClient()
  // 댓글 가져오기 => 여기서 호출 필요없음
  // const fetchComments = async (postId) => {
  //   if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
  //   try {
  //     const response = await fetch(`/api/comments/post/${postId}`)
  //     const data = await response.json()
  //     setComments((prev) => ({ ...prev, [postId]: data.comments }))
  //   } catch (error) {
  //     console.error("댓글 가져오기 오류:", error)
  //   }
  // }

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    // fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    const userData = queryClient.getQueryData<User>(["user", user.id])
    setSelectedUser(userData!)
    setShowUserModal(true)
  }

  const { mutate: deletePostMutate } = useDeletePost()

  const { data } = usePostsByTagQuery({ tag: selectedTag, limit, skip })
  const posts: PostWithAuthor[] = data?.posts ?? []

  const handleDeletePost = (id: number) => {
    deletePostMutate(id)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts?.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{HighlightText(post.title, searchQuery)}</div>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        setSelectedTag(tag)
                        updateURL()
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author!)}>
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedPost(post)
                    setShowEditDialog(true)
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeletePost(Number(post.id))}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

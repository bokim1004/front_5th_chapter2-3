import { deletePost } from "@/entities/post/api/PostAPI"
import { usePostPaginationStore } from "@/entities/post/model/PostPaginationStore"
import { PostResponse } from "@/entities/post/model/PostType"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  const { selectedTag, limit, skip } = usePostPaginationStore()
  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_data, deletedId) => {
      console.log("DDD", _data)
      queryClient.setQueryData<PostResponse>(["posts", selectedTag, limit, skip], (old) =>
        old
          ? {
              ...old,
              posts: old.posts.filter((post) => post.id !== deletedId),
              total: old.total - 1,
            }
          : undefined,
      )
    },
    onError: (error) => {
      console.error("게시물 삭제 오류:", error)
    },
  })
}

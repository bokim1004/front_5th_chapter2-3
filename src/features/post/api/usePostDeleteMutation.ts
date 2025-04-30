import { deletePost } from "@/entities/post/api/PostAPI"
import { Post } from "@/entities/post/model/PostType"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_data, deletedId) => {
      queryClient.setQueryData<Post[] | undefined>(["posts"], (old) => old?.filter((post) => post.id !== deletedId))
    },
    onError: (error) => {
      console.error("게시물 삭제 오류:", error)
    },
  })
}

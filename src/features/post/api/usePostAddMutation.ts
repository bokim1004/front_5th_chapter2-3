import { createPost } from "@/entities/post/api/PostAPI"
import { usePostPaginationStore } from "@/entities/post/model/PostPaginationStore"
import { PostWithAuthor } from "@/entities/post/model/PostType"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const usePostAddMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      const { limit, skip, selectedTag } = usePostPaginationStore.getState()

      if (skip === 0) {
        // ✅ 캐시에 바로 반영 (첫 페이지일 경우)
        queryClient.setQueryData<{ posts: PostWithAuthor[]; total: number }>(
          ["posts", selectedTag, limit, skip],
          (old) => {
            if (!old) return { posts: [newPost], total: 1 }
            return {
              ...old,
              posts: [newPost, ...old.posts].slice(0, limit),
              total: old.total + 1,
            }
          },
        )
      } else {
        // ✅ 다른 페이지면 무효화 → 서버에서 다시 가져옴
        queryClient.invalidateQueries({ queryKey: ["posts"], exact: false })
      }
    },
    onError: (error) => {
      console.error("게시물 추가 오류:", error)
    },
  })
}

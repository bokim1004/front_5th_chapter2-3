import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import UserInfoModal from "@/entities/user/ui/UserInfoModal"
import { CommentAddDialog, CommentEditDialog } from "@/features/comment/ui"
import { PostAddCardHeader, PostAddDialog, PostDetailDialog, PostEditDialog } from "@/features/post/ui"

import { usePostUpdateURL } from "@/features/post/model/usePostUpdateURL"
import { PostListContent } from "@/features/post/ui/PostListContent"
import { Card, CardContent } from "../shared/ui/card"

const PostsManager = () => {
  const location = useLocation()

  // 상태 관리
  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState(0)

  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState([])
  const [comments, setComments] = useState({})

  const updateURL = usePostUpdateURL()

  // 게시물 가져오기
  const fetchPosts = () => {
    setLoading(true)
    let postsData
    let usersData

    fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      .then((response) => response.json())
      .then((data) => {
        postsData = data
        return fetch("/api/users?limit=0&select=username,image")
      })
      .then((response) => response.json())
      .then((users) => {
        usersData = users.users
        const postsWithUsers = postsData.posts.map((post) => ({
          ...post,
          author: usersData.find((user) => user.id === post.userId),
        }))
        setPosts(postsWithUsers)
        setTotal(postsData.total)
      })
      .catch((error) => {
        console.error("게시물 가져오기 오류:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const response = await fetch("/api/posts/tags")
      const data = await response.json()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag) => {
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])
      const postsData = await postsResponse.json()
      const usersData = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchTags()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
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

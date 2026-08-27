import { useCallback, useEffect, useState } from 'react';
import { createComment, deleteComment, updateLikesCount } from '../lib/sns-api';

const LIKE_STORAGE_KEY = 'matstagram-liked-posts';

/** 로컬에 저장된 좋아요 누른 게시물 id 목록 읽기 */
function readLikedIds() {
  try {
    const saved = window.localStorage.getItem(LIKE_STORAGE_KEY);
    return new Set(saved ? JSON.parse(saved) : []);
  } catch {
    return new Set();
  }
}

/**
 * 게시물 목록 상태와 좋아요 / 댓글 동작을 관리하는 훅
 * @param {function} loader - 게시물 목록을 반환하는 비동기 함수 [Required]
 * @returns {object} { posts, isLoading, errorMessage, likedIds, reload, toggleLike, addComment, removeComment }
 */
export function usePostList(loader) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [likedIds, setLikedIds] = useState(readLikedIds);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      setPosts(await loader());
    } catch {
      setErrorMessage('게시물을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    reload();
  }, [reload]);

  /** 좋아요 토글 (낙관적 업데이트) */
  const toggleLike = useCallback(
    async (postId) => {
      const isLiked = likedIds.has(postId);
      const delta = isLiked ? -1 : 1;

      const nextLiked = new Set(likedIds);
      if (isLiked) nextLiked.delete(postId);
      else nextLiked.add(postId);

      setLikedIds(nextLiked);
      window.localStorage.setItem(LIKE_STORAGE_KEY, JSON.stringify([...nextLiked]));

      let nextCount = 0;
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id !== postId) return post;
          nextCount = Math.max(0, post.likes_count + delta);
          return { ...post, likes_count: nextCount };
        }),
      );

      try {
        await updateLikesCount(postId, nextCount);
      } catch {
        setErrorMessage('좋아요 반영에 실패했습니다.');
      }
    },
    [likedIds],
  );

  /** 댓글 등록 */
  const addComment = useCallback(async (postId, userId, content) => {
    const created = await createComment({ postId, userId, content });
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, created] } : post,
      ),
    );
  }, []);

  /** 댓글 삭제 */
  const removeComment = useCallback(async (postId, commentId) => {
    await deleteComment(commentId);
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: post.comments.filter((item) => item.id !== commentId) }
          : post,
      ),
    );
  }, []);

  return {
    posts,
    isLoading,
    errorMessage,
    likedIds,
    reload,
    toggleLike,
    addComment,
    removeComment,
  };
}

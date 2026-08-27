import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AppFrame from '../components/common/app-frame';
import TopBar from '../components/common/top-bar';
import CommentModal from '../components/feed/comment-modal';
import PostCard from '../components/feed/post-card';
import EmptyState from '../components/ui/empty-state';
import { fetchFeedPosts } from '../lib/sns-api';
import { usePostList } from '../hooks/use-post-list';
import { useAuth } from '../hooks/use-auth';
import { NOTIFICATIONS } from '../data/mock-data';

/**
 * HomePage — 실시간 게시물 피드 (스크롤 방식)
 *
 * Example usage:
 * <Route path="/" element={ <HomePage /> } />
 */
function HomePage() {
  const { user } = useAuth();
  const { posts, isLoading, errorMessage, likedIds, toggleLike, addComment, removeComment } =
    usePostList(fetchFeedPosts);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const selectedPost = posts.find((post) => post.id === selectedPostId) ?? null;

  return (
    <AppFrame header={ <TopBar notificationCount={ NOTIFICATIONS.length } /> }>
      <Box sx={ { px: { xs: 1.5, md: 2 }, py: { xs: 2, md: 3 }, display: 'flex', flexDirection: 'column', gap: 2 } }>
        { errorMessage && <Alert severity="error" sx={ { borderRadius: 2 } }>{ errorMessage }</Alert> }

        { isLoading && (
          <Box sx={ { py: 8, display: 'flex', justifyContent: 'center' } }>
            <CircularProgress color="primary" />
          </Box>
        ) }

        { !isLoading && posts.length === 0 && (
          <EmptyState
            icon={ <RestaurantMenuIcon sx={ { fontSize: 48, color: 'secondary.dark' } } /> }
            title="아직 게시물이 없어요"
            description="가운데 + 버튼을 눌러 첫 맛집을 공유해보세요!"
          />
        ) }

        { posts.map((post) => (
          <PostCard
            key={ post.id }
            post={ post }
            isLiked={ likedIds.has(post.id) }
            onToggleLike={ toggleLike }
            onOpenComments={ (target) => setSelectedPostId(target.id) }
          />
        )) }
      </Box>

      <CommentModal
        isOpen={ Boolean(selectedPost) }
        post={ selectedPost }
        currentUserId={ user?.id ?? null }
        onClose={ () => setSelectedPostId(null) }
        onSubmit={ (content) => addComment(selectedPostId, user.id, content) }
        onDelete={ (commentId) => removeComment(selectedPostId, commentId) }
      />
    </AppFrame>
  );
}

export default HomePage;

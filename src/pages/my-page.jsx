import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import AppFrame from '../components/common/app-frame';
import TopBar from '../components/common/top-bar';
import CommentModal from '../components/feed/comment-modal';
import PostDetailView from '../components/feed/post-detail-view';
import EmptyState from '../components/ui/empty-state';
import SquareImage from '../components/ui/square-image';
import { fetchUserPosts } from '../lib/sns-api';
import { usePostList } from '../hooks/use-post-list';
import { useAuth } from '../hooks/use-auth';
import { NOTIFICATIONS } from '../data/mock-data';

/** 하단바 높이 (모달이 하단바를 덮지 않도록 계산에 사용) */
const BOTTOM_NAV_OFFSET = 'calc(62px + env(safe-area-inset-bottom))';

/** 팔로우/팔로워 수는 DB 스키마에 없으므로 사용자 id 기반 목업 값으로 표시 */
function getFollowCounts(userId) {
  const base = (userId ?? 1) * 37;
  return {
    followers: 120 + (base % 380),
    following: 80 + (base % 210),
  };
}

/**
 * MyPage — 프로필 정보와 내가 올린 게시물 3열 그리드
 *
 * Example usage:
 * <Route path="/profile" element={ <MyPage /> } />
 */
function MyPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const loadMyPosts = useCallback(() => fetchUserPosts(user.id), [user.id]);
  const { posts, isLoading, errorMessage, likedIds, toggleLike, addComment, removeComment } =
    usePostList(loadMyPosts);

  const [detailPostId, setDetailPostId] = useState(null);
  const [commentPostId, setCommentPostId] = useState(null);

  const detailPost = posts.find((post) => post.id === detailPostId) ?? null;
  const commentPost = posts.find((post) => post.id === commentPostId) ?? null;
  const followCounts = getFollowCounts(user?.id);

  /** 로그아웃 후 로그인 화면으로 이동 */
  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <AppFrame header={ <TopBar notificationCount={ NOTIFICATIONS.length } /> }>
      { /* 프로필 영역 */ }
      <Box sx={ { px: { xs: 2, md: 3 }, py: { xs: 3, md: 4 } } }>
        <Box sx={ { display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 } } }>
          <Avatar
            src={ user?.profile_image_url }
            alt={ user?.nickname }
            sx={ {
              width: { xs: 76, md: 88 },
              height: { xs: 76, md: 88 },
              bgcolor: 'secondary.light',
              border: '3px solid',
              borderColor: 'secondary.main',
            } }
          />

          <Box sx={ { flexGrow: 1 } }>
            <Typography sx={ { fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 800 } }>
              { user?.nickname }
            </Typography>
            <Typography sx={ { fontSize: '0.8rem', color: 'text.secondary', mb: 1.5 } }>
              @{ user?.username }
            </Typography>

            <Box sx={ { display: 'flex', gap: 2.5 } }>
              { [
                { label: '게시물', value: posts.length },
                { label: '팔로워', value: followCounts.followers },
                { label: '팔로우', value: followCounts.following },
              ].map((item) => (
                <Box key={ item.label } sx={ { textAlign: 'center' } }>
                  <Box sx={ { fontSize: '0.95rem', fontWeight: 800, color: 'text.primary' } }>
                    { item.value }
                  </Box>
                  <Box sx={ { fontSize: '0.72rem', color: 'text.secondary' } }>{ item.label }</Box>
                </Box>
              )) }
            </Box>
          </Box>
        </Box>

        <Button
          variant="outlined"
          color="primary"
          fullWidth
          startIcon={ <LogoutIcon /> }
          onClick={ handleLogout }
          sx={ {
            mt: { xs: 2.5, md: 3 },
            py: 1,
            borderRadius: 2,
            fontWeight: 700,
            textTransform: 'none',
            fontSize: { xs: '0.9rem', md: '0.95rem' },
          } }
        >
          로그아웃
        </Button>
      </Box>

      { /* 내 게시물 3열 그리드 */ }
      <Box sx={ { px: { xs: 0.5, md: 1 }, pb: 3 } }>
        { errorMessage && (
          <Alert severity="error" sx={ { mx: 1.5, mb: 2, borderRadius: 2 } }>{ errorMessage }</Alert>
        ) }

        { isLoading && (
          <Box sx={ { py: 8, display: 'flex', justifyContent: 'center' } }>
            <CircularProgress color="primary" />
          </Box>
        ) }

        { !isLoading && posts.length === 0 && (
          <EmptyState
            icon={ <PhotoLibraryOutlinedIcon sx={ { fontSize: 48, color: 'secondary.dark' } } /> }
            title="업로드한 게시물이 없어요"
            description="첫 맛집 사진을 공유해보세요!"
          />
        ) }

        <Grid container spacing={ 0.5 }>
          { posts.map((post) => (
            <Grid key={ post.id } size={ { xs: 4 } }>
              <Box
                onClick={ () => setDetailPostId(post.id) }
                sx={ { cursor: 'pointer', '&:hover': { opacity: 0.85 } } }
              >
                <SquareImage src={ post.image_url } alt={ post.caption } fallbackSeed={ post.id } />
              </Box>
            </Grid>
          )) }
        </Grid>
      </Box>

      { /* 게시물 상세 전체화면 모달 (하단바 제외 영역) */ }
      <Modal
        open={ Boolean(detailPost) }
        onClose={ () => setDetailPostId(null) }
        slotProps={ {
          backdrop: {
            sx: {
              top: 0,
              bottom: BOTTOM_NAV_OFFSET,
              height: 'auto',
              bgcolor: 'rgba(20, 12, 6, 0.55)',
              backdropFilter: 'blur(6px)',
            },
          },
        } }
      >
        <Box
          sx={ {
            position: 'fixed',
            top: 0,
            bottom: BOTTOM_NAV_OFFSET,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: 480,
            bgcolor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            outline: 'none',
          } }
        >
          { /* 모달 헤더 — 제목과 닫기(X) 버튼 */ }
          <Box
            sx={ {
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1.25,
              bgcolor: 'background.paper',
              borderBottom: '1px solid',
              borderColor: 'divider',
            } }
          >
            <Typography sx={ { fontWeight: 700, fontSize: '0.95rem' } }>게시물</Typography>
            <IconButton
              aria-label="닫기"
              onClick={ () => setDetailPostId(null) }
              sx={ {
                color: 'text.primary',
                '&:hover': { bgcolor: 'secondary.light', color: 'primary.main' },
              } }
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          { /* 본문 — 남은 공간을 꽉 채우는 게시물 카드 UI */ }
          { detailPost && (
            <PostDetailView
              post={ detailPost }
              isLiked={ likedIds.has(detailPost.id) }
              onToggleLike={ toggleLike }
              onOpenComments={ (target) => setCommentPostId(target.id) }
            />
          ) }
        </Box>
      </Modal>

      <CommentModal
        isOpen={ Boolean(commentPost) }
        post={ commentPost }
        currentUserId={ user?.id ?? null }
        onClose={ () => setCommentPostId(null) }
        onSubmit={ (content) => addComment(commentPostId, user.id, content) }
        onDelete={ (commentId) => removeComment(commentPostId, commentId) }
      />
    </AppFrame>
  );
}

export default MyPage;

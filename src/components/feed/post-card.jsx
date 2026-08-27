import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import SquareImage from '../ui/square-image';
import { formatRelativeTime } from '../../utils/format-date';

/**
 * PostCard 컴포넌트 — 게시물 카드 UI (상단 작성자 / 중단 이미지·내용 / 하단 반응·댓글)
 *
 * Props:
 * @param {object} post - 게시물 데이터 { id, caption, hashtags, location, image_url, likes_count, created_at, author, comments } [Required]
 * @param {boolean} isLiked - 내가 좋아요를 눌렀는지 여부 [Optional, 기본값: false]
 * @param {function} onToggleLike - 좋아요 버튼 클릭 시 실행 (postId 전달) [Optional]
 * @param {function} onOpenComments - 댓글 아이콘 클릭 시 실행 (post 전달) [Optional]
 * @param {function} onOpenDetail - 이미지 클릭 시 실행 (post 전달) [Optional]
 * @param {boolean} isElevated - 카드 테두리 적용 여부 [Optional, 기본값: true]
 *
 * Example usage:
 * <PostCard post={ post } isLiked onToggleLike={ handleLike } onOpenComments={ handleOpen } />
 */
function PostCard({
  post,
  isLiked = false,
  onToggleLike,
  onOpenComments,
  onOpenDetail,
  isElevated = true,
}) {
  const comments = post.comments ?? [];
  const latestComments = comments.slice(-2);
  const hashtagList = (post.hashtags ?? '')
    .split(/[\s,]+/)
    .filter((tag) => tag.startsWith('#') && tag.length > 1);

  return (
    <Card
      elevation={ 0 }
      sx={ {
        borderRadius: 0,
        border: isElevated ? '1px solid' : 'none',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        overflow: 'hidden',
      } }
    >
      { /* 상단: 프로필 이미지 · 닉네임 · 위치 정보 */ }
      <Box sx={ { display: 'flex', alignItems: 'center', gap: 1.25, px: 2, py: 1.5 } }>
        <Avatar
          src={ post.author?.profile_image_url }
          alt={ post.author?.nickname }
          sx={ { width: 40, height: 40, bgcolor: 'secondary.light' } }
        />

        <Box sx={ { minWidth: 0, flexGrow: 1 } }>
          <Typography
            sx={ { fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.3, color: 'text.primary' } }
          >
            { post.author?.nickname ?? '알 수 없음' }
          </Typography>

          { post.location && (
            <Box sx={ { display: 'flex', alignItems: 'center', gap: 0.25, color: 'text.secondary' } }>
              <PlaceOutlinedIcon sx={ { fontSize: 13 } } />
              <Box component="span" sx={ { fontSize: '0.75rem' } }>{ post.location }</Box>
            </Box>
          ) }
        </Box>
      </Box>

      { /* 중단: 정방형 이미지(클릭 시 상세 페이지) · 내용 · 작성 시간 */ }
      <Box
        onClick={ () => onOpenDetail?.(post) }
        sx={ {
          cursor: onOpenDetail ? 'pointer' : 'default',
          '&:hover': { opacity: onOpenDetail ? 0.92 : 1 },
        } }
      >
        <SquareImage src={ post.image_url } alt={ post.caption } fallbackSeed={ post.id } />
      </Box>

      <Box sx={ { px: 2, pt: 1.5, display: 'flex', flexDirection: 'column', gap: 1 } }>
        <Typography
          sx={ {
            fontSize: { xs: '0.9rem', md: '0.95rem' },
            lineHeight: 1.55,
            color: 'text.primary',
            whiteSpace: 'pre-wrap',
          } }
        >
          { post.caption }
        </Typography>

        { hashtagList.length > 0 && (
          <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.5 } }>
            { hashtagList.map((tag) => (
              <Chip
                key={ tag }
                label={ tag }
                size="small"
                sx={ {
                  bgcolor: 'secondary.light',
                  color: 'primary.dark',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  height: 24,
                  borderRadius: 0,
                } }
              />
            )) }
          </Box>
        ) }

        <Typography sx={ { fontSize: '0.72rem', color: 'text.secondary' } }>
          { formatRelativeTime(post.created_at) }
        </Typography>
      </Box>

      { /* 하단: 반응 박스 (좋아요 · 댓글 수) */ }
      <Box
        sx={ {
          mt: 1.5,
          mx: 2,
          px: 1.5,
          py: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: 'secondary.light',
          borderRadius: 0,
        } }
      >
        <IconButton
          aria-label="좋아요"
          onClick={ () => onToggleLike?.(post.id) }
          sx={ { color: isLiked ? 'primary.main' : 'text.secondary' } }
        >
          { isLiked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" /> }
        </IconButton>
        <Box component="span" sx={ { fontSize: '0.82rem', fontWeight: 700, color: 'text.primary' } }>
          { post.likes_count }
        </Box>

        <IconButton
          aria-label="댓글 보기"
          onClick={ () => onOpenComments?.(post) }
          sx={ { color: 'text.secondary', ml: 1 } }
        >
          <ChatBubbleOutlineIcon fontSize="small" />
        </IconButton>
        <Box component="span" sx={ { fontSize: '0.82rem', fontWeight: 700, color: 'text.primary' } }>
          { comments.length }
        </Box>
      </Box>

      { /* 하단: 최신 댓글 2개 미리보기 */ }
      <Box sx={ { px: 2, pt: 1.25, pb: 2, display: 'flex', flexDirection: 'column', gap: 0.5 } }>
        { latestComments.map((comment) => (
          <Box key={ comment.id } sx={ { fontSize: '0.82rem', color: 'text.primary', lineHeight: 1.5 } }>
            <Box component="span" sx={ { fontWeight: 700, mr: 0.75 } }>
              { comment.author?.nickname ?? '알 수 없음' }
            </Box>
            <Box component="span" sx={ { color: 'text.secondary' } }>{ comment.content }</Box>
          </Box>
        )) }

        { comments.length > 2 && (
          <Box
            component="button"
            type="button"
            onClick={ () => onOpenComments?.(post) }
            sx={ {
              alignSelf: 'flex-start',
              border: 'none',
              bgcolor: 'transparent',
              p: 0,
              mt: 0.25,
              cursor: 'pointer',
              fontSize: '0.8rem',
              color: 'text.secondary',
              fontFamily: 'inherit',
            } }
          >
            댓글 { comments.length }개 모두 보기
          </Box>
        ) }

        { comments.length === 0 && (
          <Box sx={ { fontSize: '0.8rem', color: 'text.secondary' } }>
            첫 댓글을 남겨보세요!
          </Box>
        ) }
      </Box>
    </Card>
  );
}

export default PostCard;

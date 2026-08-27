import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { formatRelativeTime } from '../../utils/format-date';

/**
 * CommentModal 컴포넌트 — 아래에서 올라오는 댓글 모달 (배경 흐림 처리)
 *
 * Props:
 * @param {boolean} isOpen - 모달 열림 여부 [Required]
 * @param {object} post - 댓글을 표시할 게시물 [Optional, 기본값: null]
 * @param {number} currentUserId - 현재 로그인한 사용자 id [Optional, 기본값: null]
 * @param {function} onClose - 닫기 시 실행할 함수 [Required]
 * @param {function} onSubmit - 댓글 등록 시 실행 (content 전달) [Required]
 * @param {function} onDelete - 댓글 삭제 시 실행 (commentId 전달) [Required]
 *
 * Example usage:
 * <CommentModal isOpen={ isOpen } post={ post } onClose={ handleClose } onSubmit={ handleSubmit } onDelete={ handleDelete } />
 */
function CommentModal({ isOpen, post, currentUserId = null, onClose, onSubmit, onDelete }) {
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);

  const comments = post?.comments ?? [];

  /** 댓글 등록 처리 */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = content.trim();
    if (!trimmed || isSending) return;

    setIsSending(true);
    try {
      await onSubmit(trimmed);
      setContent('');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Drawer
      anchor="bottom"
      open={ isOpen }
      onClose={ onClose }
      sx={ { zIndex: (theme) => theme.zIndex.modal + 10 } }
      slotProps={ {
        backdrop: {
          sx: { bgcolor: 'rgba(20, 12, 6, 0.55)', backdropFilter: 'blur(5px)' },
        },
        paper: {
          sx: {
            width: '100%',
            maxWidth: 480,
            mx: 'auto',
            height: '72vh',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.paper',
          },
        },
      } }
    >
      { /* 모달 헤더 */ }
      <Box
        sx={ {
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
        } }
      >
        <Box
          sx={ {
            position: 'absolute',
            top: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 40,
            height: 4,
            borderRadius: 2,
            bgcolor: 'divider',
          } }
        />
        <Typography variant="h6" sx={ { flexGrow: 1, fontSize: '1rem' } }>
          댓글 { comments.length }
        </Typography>
        <IconButton aria-label="닫기" onClick={ onClose } size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      { /* 댓글 목록 (스크롤 영역) */ }
      <Box sx={ { flexGrow: 1, overflowY: 'auto', px: 2, py: 1.5 } }>
        { comments.length === 0 && (
          <Box sx={ { py: 6, textAlign: 'center', color: 'text.secondary', fontSize: '0.875rem' } }>
            아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
          </Box>
        ) }

        { comments.map((comment) => (
          <Box key={ comment.id } sx={ { display: 'flex', gap: 1.25, py: 1.25 } }>
            <Avatar
              src={ comment.author?.profile_image_url }
              alt={ comment.author?.nickname }
              sx={ { width: 34, height: 34, bgcolor: 'secondary.light' } }
            />

            <Box sx={ { flexGrow: 1, minWidth: 0 } }>
              <Box sx={ { display: 'flex', alignItems: 'center', gap: 0.75 } }>
                <Box component="span" sx={ { fontWeight: 700, fontSize: '0.84rem' } }>
                  { comment.author?.nickname ?? '알 수 없음' }
                </Box>
                <Box component="span" sx={ { fontSize: '0.72rem', color: 'text.secondary' } }>
                  { formatRelativeTime(comment.created_at) }
                </Box>
              </Box>
              <Box sx={ { fontSize: '0.86rem', color: 'text.primary', lineHeight: 1.5, mt: 0.25 } }>
                { comment.content }
              </Box>
            </Box>

            { comment.author?.id === currentUserId && (
              <IconButton
                aria-label="댓글 삭제"
                size="small"
                onClick={ () => onDelete(comment.id) }
                sx={ { color: 'text.secondary', alignSelf: 'flex-start' } }
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            ) }
          </Box>
        )) }
      </Box>

      { /* 댓글 입력란 + 등록 버튼 */ }
      <Box
        component="form"
        onSubmit={ handleSubmit }
        sx={ {
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1.5,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.default',
        } }
      >
        <TextField
          value={ content }
          onChange={ (event) => setContent(event.target.value) }
          placeholder="댓글을 입력하세요"
          size="small"
          fullWidth
          autoComplete="off"
          sx={ { '& .MuiOutlinedInput-root': { borderRadius: 5, bgcolor: 'background.paper' } } }
        />
        <IconButton
          type="submit"
          aria-label="댓글 등록"
          disabled={ !content.trim() || isSending }
          sx={ {
            bgcolor: 'primary.main',
            color: '#fff',
            '&:hover': { bgcolor: 'primary.dark' },
            '&.Mui-disabled': { bgcolor: 'divider', color: 'text.secondary' },
          } }
        >
          <SendRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Drawer>
  );
}

export default CommentModal;

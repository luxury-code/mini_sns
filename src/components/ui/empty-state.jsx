import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * EmptyState 컴포넌트 — 데이터가 없을 때 표시하는 안내 영역
 *
 * Props:
 * @param {node} icon - 상단 아이콘 요소 [Optional, 기본값: null]
 * @param {string} title - 제목 [Required]
 * @param {string} description - 설명 문구 [Optional, 기본값: '']
 *
 * Example usage:
 * <EmptyState title="게시물이 없습니다" description="첫 게시물을 올려보세요" />
 */
function EmptyState({ icon = null, title, description = '' }) {
  return (
    <Box
      sx={ {
        py: { xs: 6, md: 8 },
        px: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        textAlign: 'center',
      } }
    >
      { icon }
      <Typography sx={ { fontWeight: 700, color: 'text.primary' } }>{ title }</Typography>
      { description && (
        <Typography sx={ { fontSize: '0.875rem', color: 'text.secondary' } }>
          { description }
        </Typography>
      ) }
    </Box>
  );
}

export default EmptyState;

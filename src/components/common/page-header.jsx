import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

/**
 * PageHeader 컴포넌트 — 뒤로가기 버튼 + 제목의 서브 페이지 상단바
 *
 * Props:
 * @param {string} title - 상단바 제목 [Required]
 * @param {function} onBack - 뒤로가기 클릭 시 실행할 함수 [Required]
 * @param {node} action - 오른쪽 영역에 표시할 요소 [Optional, 기본값: null]
 *
 * Example usage:
 * <PageHeader title="게시물 작성" onBack={ () => navigate(-1) } />
 */
function PageHeader({ title, onBack, action = null }) {
  return (
    <AppBar
      position="sticky"
      elevation={ 0 }
      sx={ {
        top: 0,
        bgcolor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      } }
    >
      <Toolbar sx={ { minHeight: 56, px: { xs: 1, md: 2 }, gap: 1 } }>
        <IconButton aria-label="뒤로 가기" onClick={ onBack } sx={ { color: 'text.primary' } }>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        <Typography variant="h6" sx={ { flexGrow: 1, fontSize: '1.05rem' } }>
          { title }
        </Typography>

        <Box sx={ { display: 'flex', alignItems: 'center' } }>{ action }</Box>
      </Toolbar>
    </AppBar>
  );
}

export default PageHeader;

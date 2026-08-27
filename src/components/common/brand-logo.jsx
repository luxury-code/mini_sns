import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RestaurantIcon from '@mui/icons-material/Restaurant';

/**
 * BrandLogo 컴포넌트 — 포크와 나이프 아이콘 + 맛스타그램 워드마크
 *
 * Props:
 * @param {number} size - 아이콘 배지 한 변의 크기(px) [Optional, 기본값: 36]
 * @param {boolean} isTextVisible - 서비스명 텍스트 표시 여부 [Optional, 기본값: true]
 * @param {object} sx - 추가 스타일 [Optional, 기본값: {}]
 *
 * Example usage:
 * <BrandLogo size={ 64 } />
 */
function BrandLogo({ size = 36, isTextVisible = true, sx = {} }) {
  return (
    <Box sx={ { display: 'flex', alignItems: 'center', gap: 1.25, ...sx } }>
      <Box
        sx={ {
          width: size,
          height: size,
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          background: 'linear-gradient(135deg, #FF8A3D 0%, #FF5722 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 16px rgba(255, 107, 53, 0.35)',
          flexShrink: 0,
        } }
      >
        <RestaurantIcon sx={ { color: '#fff', fontSize: size * 0.55 } } />
      </Box>

      { isTextVisible && (
        <Typography
          component="span"
          sx={ {
            fontSize: size * 0.55,
            fontWeight: 800,
            letterSpacing: '-0.5px',
            background: 'linear-gradient(135deg, #FF6B35 0%, #E24E1B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          } }
        >
          맛스타그램
        </Typography>
      ) }
    </Box>
  );
}

export default BrandLogo;

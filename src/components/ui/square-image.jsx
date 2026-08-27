import { useState } from 'react';
import Box from '@mui/material/Box';
import { getFallbackImageUrl } from '../../utils/random-image';

/**
 * SquareImage 컴포넌트 — 정방형(1:1) 이미지, 로드 실패 시 대체 이미지 자동 적용
 *
 * Props:
 * @param {string} src - 이미지 URL [Required]
 * @param {string} alt - 대체 텍스트 [Optional, 기본값: '음식 사진']
 * @param {string|number} fallbackSeed - 대체 이미지 시드 [Optional, 기본값: 'default']
 * @param {number} radius - 모서리 둥글기 [Optional, 기본값: 0]
 * @param {object} sx - 추가 스타일 [Optional, 기본값: {}]
 *
 * Example usage:
 * <SquareImage src={ post.image_url } fallbackSeed={ post.id } />
 */
function SquareImage({ src, alt = '음식 사진', fallbackSeed = 'default', radius = 0, sx = {} }) {
  const [hasError, setHasError] = useState(false);

  return (
    <Box
      sx={ {
        width: '100%',
        aspectRatio: '1 / 1',
        overflow: 'hidden',
        bgcolor: 'secondary.light',
        borderRadius: radius,
        ...sx,
      } }
    >
      <Box
        component="img"
        src={ hasError ? getFallbackImageUrl(fallbackSeed) : src }
        alt={ alt }
        loading="lazy"
        onError={ () => setHasError(true) }
        sx={ { width: '100%', height: '100%', objectFit: 'cover', display: 'block' } }
      />
    </Box>
  );
}

export default SquareImage;

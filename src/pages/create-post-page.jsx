import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AppFrame from '../components/common/app-frame';
import PageHeader from '../components/common/page-header';
import SquareImage from '../components/ui/square-image';
import { createPost } from '../lib/sns-api';
import { useAuth } from '../hooks/use-auth';
import { getRandomFoodImageUrl, getRandomFoodImageUrls } from '../utils/random-image';

/**
 * CreatePostPage — 게시물 작성 화면 (랜덤 음식 이미지 자동 선택 + 변경)
 *
 * Example usage:
 * <Route path="/create" element={ <CreatePostPage /> } />
 */
function CreatePostPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState(() => getRandomFoodImageUrl());
  const [candidates, setCandidates] = useState(() => getRandomFoodImageUrls(4));
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [location, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  /** 대표 이미지를 랜덤으로 다시 선택 */
  const handleShuffleImage = () => {
    setImageUrl((prev) => getRandomFoodImageUrl(prev));
    setCandidates(getRandomFoodImageUrls(4));
  };

  /** 해시태그 입력을 # 접두사 형태로 정리 */
  const normalizeHashtags = (value) =>
    value
      .split(/[\s,]+/)
      .filter(Boolean)
      .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`))
      .join(' ');

  /** 게시물 등록 */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!caption.trim()) {
      setErrorMessage('게시물 내용을 입력해주세요.');
      return;
    }

    setIsSaving(true);
    setErrorMessage('');
    try {
      await createPost({
        userId: user.id,
        caption: caption.trim(),
        hashtags: normalizeHashtags(hashtags),
        location: location.trim(),
        imageUrl,
      });
      navigate('/', { replace: true });
    } catch {
      setErrorMessage('게시물 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AppFrame
      isBottomNavVisible={ false }
      header={ <PageHeader title="새 게시물" onBack={ () => navigate(-1) } /> }
    >
      <Box
        component="form"
        onSubmit={ handleSubmit }
        sx={ { px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 }, display: 'flex', flexDirection: 'column', gap: 2 } }
      >
        { /* 이미지 업로드(랜덤 선택) 영역 */ }
        <Box>
          <SquareImage src={ imageUrl } alt="선택된 음식 사진" fallbackSeed="new-post" radius={ 3 } />

          <Button
            fullWidth
            variant="outlined"
            startIcon={ <AutorenewIcon /> }
            onClick={ handleShuffleImage }
            sx={ { mt: 1.5, py: 1.1, bgcolor: 'background.paper' } }
          >
            이미지 변경 (랜덤)
          </Button>

          <Typography sx={ { mt: 1.5, mb: 0.75, fontSize: '0.78rem', color: 'text.secondary' } }>
            다른 후보 이미지에서 고를 수도 있어요
          </Typography>

          <Box sx={ { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 } }>
            { candidates.map((candidate, index) => (
              <Box
                key={ candidate }
                onClick={ () => setImageUrl(candidate) }
                sx={ {
                  cursor: 'pointer',
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '2px solid',
                  borderColor: candidate === imageUrl ? 'primary.main' : 'transparent',
                } }
              >
                <SquareImage
                  src={ candidate }
                  alt={ `후보 이미지 ${index + 1}` }
                  fallbackSeed={ `candidate-${index}` }
                />
              </Box>
            )) }
          </Box>
        </Box>

        { /* 입력 영역 */ }
        <TextField
          label="게시물 내용"
          value={ caption }
          onChange={ (event) => setCaption(event.target.value) }
          fullWidth
          multiline
          minRows={ 3 }
          placeholder="어떤 맛집인가요? 솔직한 후기를 남겨주세요."
          sx={ { '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } } }
        />
        <TextField
          label="해시태그"
          value={ hashtags }
          onChange={ (event) => setHashtags(event.target.value) }
          fullWidth
          placeholder="연남동맛집 파스타 데이트"
          helperText="띄어쓰기로 구분하면 자동으로 # 이 붙습니다"
          sx={ { '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } } }
        />
        <TextField
          label="위치"
          value={ location }
          onChange={ (event) => setLocation(event.target.value) }
          fullWidth
          placeholder="서울 마포구 연남동"
          sx={ { '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } } }
        />

        { errorMessage && <Alert severity="error" sx={ { borderRadius: 2 } }>{ errorMessage }</Alert> }

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={ isSaving }
          sx={ { py: 1.35, fontSize: '1rem' } }
        >
          게시물 등록
        </Button>

        <Button variant="text" onClick={ () => navigate(-1) } sx={ { color: 'text.secondary' } }>
          뒤로 가기
        </Button>
      </Box>
    </AppFrame>
  );
}

export default CreatePostPage;

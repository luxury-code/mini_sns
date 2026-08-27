import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AppFrame from '../components/common/app-frame';
import PageHeader from '../components/common/page-header';
import { useAuth } from '../hooks/use-auth';

/**
 * SignupPage — 맛스타그램 회원가입 화면
 *
 * Example usage:
 * <Route path="/signup" element={ <SignupPage /> } />
 */
function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /** 회원가입 처리 후 자동 로그인 */
  const handleSignup = async (event) => {
    event.preventDefault();

    if (!username.trim() || !password) {
      setErrorMessage('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
    if (password.length < 4) {
      setErrorMessage('비밀번호는 4자 이상 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    const result = await signup(username, password, nickname);
    setIsLoading(false);

    if (result.error) setErrorMessage(result.error);
    else navigate('/', { replace: true });
  };

  return (
    <AppFrame
      isBottomNavVisible={ false }
      header={ <PageHeader title="회원가입" onBack={ () => navigate('/login') } /> }
    >
      <Box sx={ { px: { xs: 3, md: 4 }, py: { xs: 4, md: 5 } } }>
        <Typography sx={ { fontSize: { xs: '1.35rem', md: '1.5rem' }, fontWeight: 800, mb: 0.5 } }>
          맛스타그램 시작하기
        </Typography>
        <Typography sx={ { fontSize: '0.875rem', color: 'text.secondary', mb: 3 } }>
          가입하고 나만의 맛집 기록을 남겨보세요.
        </Typography>

        <Box
          component="form"
          onSubmit={ handleSignup }
          sx={ { display: 'flex', flexDirection: 'column', gap: 1.5 } }
        >
          <TextField
            label="아이디"
            value={ username }
            onChange={ (event) => setUsername(event.target.value) }
            fullWidth
            autoComplete="username"
            sx={ { '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } } }
          />
          <TextField
            label="비밀번호"
            type="password"
            value={ password }
            onChange={ (event) => setPassword(event.target.value) }
            fullWidth
            autoComplete="new-password"
            helperText="4자 이상 입력해주세요"
            sx={ { '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } } }
          />
          <TextField
            label="닉네임 (선택)"
            value={ nickname }
            onChange={ (event) => setNickname(event.target.value) }
            fullWidth
            placeholder="비워두면 아이디가 닉네임이 됩니다"
            sx={ { '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } } }
          />

          { errorMessage && <Alert severity="error" sx={ { borderRadius: 2 } }>{ errorMessage }</Alert> }

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={ isLoading }
            sx={ { mt: 1, py: 1.35, fontSize: '1rem' } }
          >
            회원가입
          </Button>

          <Button variant="text" onClick={ () => navigate('/login') } sx={ { color: 'text.secondary' } }>
            뒤로 가기
          </Button>
        </Box>
      </Box>
    </AppFrame>
  );
}

export default SignupPage;

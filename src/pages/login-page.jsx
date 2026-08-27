import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AppFrame from '../components/common/app-frame';
import BrandLogo from '../components/common/brand-logo';
import { useAuth } from '../hooks/use-auth';
import { GUEST_ACCOUNT } from '../lib/auth-context';

/**
 * LoginPage — 맛스타그램 로그인 화면
 *
 * Example usage:
 * <Route path="/login" element={ <LoginPage /> } />
 */
function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /** 아이디/비밀번호로 로그인 */
  const handleLogin = async (event) => {
    event.preventDefault();
    if (!username.trim() || !password) {
      setErrorMessage('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    const result = await login(username, password);
    setIsLoading(false);

    if (result.error) setErrorMessage(result.error);
    else navigate('/', { replace: true });
  };

  /** 회원가입 없이 테스트 계정으로 둘러보기 */
  const handleGuestLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    const result = await login(GUEST_ACCOUNT.username, GUEST_ACCOUNT.password);
    setIsLoading(false);

    if (result.error) setErrorMessage(result.error);
    else navigate('/', { replace: true });
  };

  return (
    <AppFrame isBottomNavVisible={ false }>
      <Box
        sx={ {
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, md: 4 },
          py: { xs: 4, md: 6 },
        } }
      >
        { /* 로고 영역 */ }
        <Box sx={ { display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 } }>
          <BrandLogo size={ 76 } isTextVisible={ false } />
          <Typography
            sx={ {
              mt: 2,
              fontSize: { xs: '2rem', md: '2.25rem' },
              fontWeight: 800,
              letterSpacing: '-1px',
              background: 'linear-gradient(135deg, #FF6B35 0%, #E24E1B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            } }
          >
            맛스타그램
          </Typography>
          <Typography sx={ { mt: 0.5, fontSize: '0.875rem', color: 'text.secondary' } }>
            오늘의 맛집, 친구와 함께 나눠요
          </Typography>
        </Box>

        { /* 로그인 폼 */ }
        <Box
          component="form"
          onSubmit={ handleLogin }
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
            autoComplete="current-password"
            sx={ { '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } } }
          />

          { errorMessage && <Alert severity="error" sx={ { borderRadius: 2 } }>{ errorMessage }</Alert> }

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={ isLoading }
            sx={ { mt: 0.5, py: 1.35, fontSize: '1rem' } }
          >
            로그인
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={ handleGuestLogin }
            disabled={ isLoading }
            sx={ { py: 1.35, bgcolor: 'background.paper' } }
          >
            테스트 계정으로 둘러보기
          </Button>
        </Box>

        <Divider sx={ { my: 3, fontSize: '0.75rem', color: 'text.secondary' } }>또는</Divider>

        <Box sx={ { textAlign: 'center' } }>
          <Typography sx={ { fontSize: '0.875rem', color: 'text.secondary', mb: 1 } }>
            아직 계정이 없으신가요?
          </Typography>
          <Button
            variant="text"
            onClick={ () => navigate('/signup') }
            sx={ { fontWeight: 700, fontSize: '0.95rem' } }
          >
            회원가입
          </Button>
        </Box>
      </Box>
    </AppFrame>
  );
}

export default LoginPage;

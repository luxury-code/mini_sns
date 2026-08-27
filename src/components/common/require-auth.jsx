import { Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../../hooks/use-auth';

/**
 * RequireAuth 컴포넌트 — 로그인한 사용자만 하위 화면에 접근하도록 보호
 *
 * Props:
 * @param {node} children - 보호할 페이지 요소 [Required]
 *
 * Example usage:
 * <RequireAuth><HomePage /></RequireAuth>
 */
function RequireAuth({ children }) {
  const { isReady, isLoggedIn } = useAuth();

  if (!isReady) {
    return (
      <Box
        sx={ {
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        } }
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return children;
}

export default RequireAuth;

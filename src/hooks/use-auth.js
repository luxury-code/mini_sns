import { useContext } from 'react';
import { AuthContext } from '../lib/auth-context';

/**
 * 로그인 상태와 인증 함수(login, signup, logout)에 접근하는 훅
 * @returns {object} { user, isReady, isLoggedIn, login, signup, logout }
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth 는 AuthProvider 안에서만 사용할 수 있습니다.');
  return context;
}

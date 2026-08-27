import { useCallback, useEffect, useMemo, useState } from 'react';
import { AUTH_STORAGE_KEY, AuthContext } from '../../lib/auth-context';
import { supabase, TABLE } from '../../lib/supabase';
import { getProfileImageUrl } from '../../utils/random-image';

/**
 * AuthProvider 컴포넌트 — 로그인 상태를 하위 화면에 제공
 *
 * Props:
 * @param {node} children - 하위 컴포넌트 [Required]
 *
 * Example usage:
 * <AuthProvider><App /></AuthProvider>
 */
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    setIsReady(true);
  }, []);

  /** 로그인 — 성공 시 { user }, 실패 시 { error } 반환 */
  const login = useCallback(async (username, password) => {
    const { data, error } = await supabase
      .from(TABLE.users)
      .select('id, username, nickname, profile_image_url')
      .eq('username', username.trim())
      .eq('password', password)
      .maybeSingle();

    if (error) return { error: '로그인 중 오류가 발생했습니다.' };
    if (!data) return { error: '아이디 또는 비밀번호가 올바르지 않습니다.' };

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
    setUser(data);
    return { user: data };
  }, []);

  /** 회원가입 — 아이디 중복 확인 후 생성하고 자동 로그인 */
  const signup = useCallback(async (username, password, nickname) => {
    const trimmedId = username.trim();

    const { data: exists } = await supabase
      .from(TABLE.users)
      .select('id')
      .eq('username', trimmedId)
      .maybeSingle();

    if (exists) return { error: '이미 사용 중인 아이디입니다.' };

    const { data, error } = await supabase
      .from(TABLE.users)
      .insert({
        username: trimmedId,
        password,
        nickname: nickname.trim() || trimmedId,
        profile_image_url: getProfileImageUrl(trimmedId),
      })
      .select('id, username, nickname, profile_image_url')
      .single();

    if (error) return { error: '회원가입 중 오류가 발생했습니다.' };

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
    setUser(data);
    return { user: data };
  }, []);

  /** 로그아웃 */
  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isReady, isLoggedIn: Boolean(user), login, signup, logout }),
    [user, isReady, login, signup, logout],
  );

  return <AuthContext.Provider value={ value }>{ children }</AuthContext.Provider>;
}

export default AuthProvider;

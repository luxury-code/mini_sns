import { createContext } from 'react';

/** 로그인 정보를 저장하는 localStorage 키 */
export const AUTH_STORAGE_KEY = 'matstagram-user';

/** 테스트(둘러보기) 계정 정보 */
export const GUEST_ACCOUNT = { username: 'guest', password: 'guest1234' };

/** 로그인 상태와 인증 함수를 공유하는 컨텍스트 */
export const AuthContext = createContext(null);

import { createClient } from '@supabase/supabase-js';

/** 맛스타그램 Supabase 클라이언트 (anon 키 사용, RLS 정책으로 보호) */
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

/** 테이블 이름 상수 (한 Supabase 프로젝트를 공유하므로 sns_ 접두사 사용) */
export const TABLE = {
  users: 'sns_users',
  posts: 'sns_posts',
  comments: 'sns_comments',
};

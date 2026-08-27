# 맛스타그램 (mini_sns)

맛집 리뷰와 친구 모임을 함께 나누는 모바일 퍼스트 SNS 웹앱입니다.

## 기술 스택

- React 19 + Vite 8
- MUI 9 (`sx` 기반 스타일링, 오렌지 컬러 테마)
- React Router 7 (HashRouter — GitHub Pages 대응)
- Supabase (PostgreSQL + PostgREST)

## 주요 기능

| 페이지 | 경로 | 설명 |
| --- | --- | --- |
| 로그인 | `/#/login` | 아이디·비밀번호 로그인, 테스트 계정 둘러보기 |
| 회원가입 | `/#/signup` | 아이디 중복 확인 후 가입 + 자동 로그인 |
| 홈 피드 | `/#/` | 실시간 게시물 피드 (DB 연동) |
| 게시물 작성 | `/#/create` | 랜덤 음식 이미지 선택 + 캡션·해시태그·위치 |
| 마이페이지 | `/#/profile` | 프로필, 팔로우 정보, 내 게시물 3열 그리드 |
| 친구 모임 | `/#/meetup` | 주변 모임 목록 (목업) |
| 채팅 | `/#/chat` | 채팅방 목록 / 채팅방 (목업) |
| 알림 | `/#/notifications` | 알림 목록 (목업) |

## 테스트 계정

- 아이디: `guest`
- 비밀번호: `guest1234`

로그인 화면의 **테스트 계정으로 둘러보기** 버튼으로 바로 접속할 수 있습니다.

## 로컬 실행

```bash
npm install
npm run dev
```

`.env` 파일에 Supabase 연결 정보가 필요합니다 (git 에는 포함되지 않습니다).

```
VITE_SUPABASE_URL=https://{프로젝트}.supabase.co
VITE_SUPABASE_ANON_KEY={anon-public-key}
```

## 데이터베이스 구조

| 테이블 | 주요 컬럼 |
| --- | --- |
| `sns_users` | id, username, password, nickname, profile_image_url |
| `sns_posts` | id, user_id, caption, hashtags, location, image_url, likes_count, created_at |
| `sns_comments` | id, post_id, user_id, content, created_at |

## 배포

`main` 브랜치에 푸시하면 GitHub Actions 워크플로우가 자동으로 빌드 후 GitHub Pages 에 배포합니다.
빌드에 필요한 Supabase 값은 저장소 Secrets (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) 로 주입됩니다.

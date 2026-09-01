/** 목업 데이터 — 친구 모임 / 채팅 / 알림 페이지 전용 (DB 미연동) */

/** 내 위치 기준 주변 친구 모임 목록 */
export const MEETUPS = [
  {
    id: 1,
    title: '연남동 파스타 원정대',
    place: '연남동 골목집',
    time: '오늘 19:00',
    distanceKm: 0.4,
    current: 3,
    capacity: 6,
    host: '김미식',
    tags: ['파스타', '와인'],
  },
  {
    id: 2,
    title: '광장시장 매운맛 클럽',
    place: '광장시장 2번 게이트',
    time: '오늘 20:30',
    distanceKm: 1.2,
    current: 5,
    capacity: 8,
    host: '이맵찔',
    tags: ['매운맛', '해장'],
  },
  {
    id: 3,
    title: '성수동 브런치 모임',
    place: '성수 카페거리',
    time: '내일 11:00',
    distanceKm: 2.1,
    current: 2,
    capacity: 4,
    host: '박빵순',
    tags: ['브런치', '디저트'],
  },
  {
    id: 4,
    title: '이태원 화덕피자 번개',
    place: '이태원역 3번 출구',
    time: '내일 18:30',
    distanceKm: 3.5,
    current: 6,
    capacity: 6,
    host: '맛잘알게스트',
    tags: ['피자', '수다'],
  },
  {
    id: 5,
    title: '역삼동 샐러드 런치',
    place: '역삼역 5번 출구',
    time: '모레 12:00',
    distanceKm: 4.6,
    current: 1,
    capacity: 5,
    host: '김미식',
    tags: ['샐러드', '다이어트'],
  },
];

/** 채팅방 목록 (direct: 1:1, group: 친구 모임 단체) */
export const CHAT_ROOMS = [
  {
    id: 1,
    type: 'group',
    name: '연남동 파스타 원정대',
    memberCount: 3,
    lastMessage: '7시에 가게 앞에서 만나요!',
    lastTime: '5분 전',
    avatarSeed: 'pasta',
  },
  {
    id: 2,
    type: 'direct',
    name: '김미식',
    memberCount: 2,
    lastMessage: '그 파스타집 위치 알려주세요 :)',
    lastTime: '32분 전',
    avatarSeed: 'foodiekim',
  },
  {
    id: 3,
    type: 'group',
    name: '광장시장 매운맛 클럽',
    memberCount: 5,
    lastMessage: '오늘 몇 명 오시나요?',
    lastTime: '1시간 전',
    avatarSeed: 'spicy',
  },
  {
    id: 4,
    type: 'direct',
    name: '박빵순',
    memberCount: 2,
    lastMessage: '브런치 모임 자리 남았어요?',
    lastTime: '어제',
    avatarSeed: 'breadpark',
  },
];

/** 채팅방별 메시지 목록 (isMine: 내가 보낸 메시지) */
export const CHAT_MESSAGES = {
  1: [
    { id: 1, sender: '김미식', text: '오늘 모임 다들 오시죠?', time: '18:02', isMine: false },
    { id: 2, sender: '나', text: '네 저는 참석합니다!', time: '18:04', isMine: true },
    { id: 3, sender: '박빵순', text: '저도요~ 조금 늦을 수 있어요', time: '18:07', isMine: false },
    { id: 4, sender: '나', text: '천천히 오세요 자리 잡아둘게요', time: '18:08', isMine: true },
    { id: 5, sender: '김미식', text: '7시에 가게 앞에서 만나요!', time: '18:10', isMine: false },
  ],
  2: [
    { id: 1, sender: '김미식', text: '안녕하세요! 피드 잘 봤어요', time: '14:20', isMine: false },
    { id: 2, sender: '나', text: '감사합니다 :)', time: '14:22', isMine: true },
    { id: 3, sender: '김미식', text: '그 파스타집 위치 알려주세요 :)', time: '14:25', isMine: false },
  ],
  3: [
    { id: 1, sender: '이맵찔', text: '오늘 몇 명 오시나요?', time: '17:10', isMine: false },
    { id: 2, sender: '나', text: '저 포함 3명이요!', time: '17:12', isMine: true },
  ],
  4: [
    { id: 1, sender: '박빵순', text: '브런치 모임 자리 남았어요?', time: '어제', isMine: false },
    { id: 2, sender: '나', text: '두 자리 남았어요!', time: '어제', isMine: true },
  ],
};

/** 알림 목록 (link: 알림 클릭 시 이동할 경로) */
export const NOTIFICATIONS = [
  { id: 1, type: 'like', actor: '김미식', text: '님이 회원님의 게시물을 좋아합니다.', time: '5분 전', seed: 'foodiekim', link: '/profile' },
  { id: 2, type: 'comment', actor: '이맵찔', text: '님이 댓글을 남겼습니다: "여기 저도 가봤어요!"', time: '20분 전', seed: 'spicylee', link: '/profile' },
  { id: 3, type: 'meetup', actor: '연남동 파스타 원정대', text: ' 모임이 1시간 뒤에 시작됩니다.', time: '1시간 전', seed: 'pasta', link: '/chat/1' },
  { id: 4, type: 'follow', actor: '박빵순', text: '님이 회원님을 팔로우하기 시작했습니다.', time: '3시간 전', seed: 'breadpark', link: '/profile' },
  { id: 5, type: 'like', actor: '맛잘알게스트', text: '님이 회원님의 게시물을 좋아합니다.', time: '어제', seed: 'guest', link: '/profile' },
  { id: 6, type: 'comment', actor: '김미식', text: '님이 댓글을 남겼습니다: "위치 좀 알려주세요"', time: '어제', seed: 'foodiekim', link: '/chat/2' },
];

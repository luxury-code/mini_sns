/**
 * 랜덤 이미지 유틸
 * - 음식 사진: Unsplash 공개 CDN 이미지 URL 목록에서 랜덤 선택
 * - Unsplash 로드 실패 시 picsum.photos 로 대체 (getFallbackImageUrl)
 * - 프로필 이미지: DiceBear 랜덤 일러스트 API 사용
 */

/** Unsplash 음식 사진 ID 목록 */
const FOOD_PHOTO_IDS = [
  'photo-1473093295043-cdd812d0e601',
  'photo-1569718212165-3a8278d5f624',
  'photo-1568901346375-23c9450c58cd',
  'photo-1513104890138-7c749659a591',
  'photo-1512621776951-a57141f2eefd',
  'photo-1504674900247-0877df9cc836',
  'photo-1565299624946-b28f40a0ae38',
  'photo-1567620905732-2d1ec7ab7445',
  'photo-1546069901-ba9599a7e63c',
  'photo-1555939594-58d7cb561ad1',
  'photo-1484723091739-30a097e8f929',
  'photo-1551782450-a2132b4ba21d',
  'photo-1544025162-d76694265947',
  'photo-1498837167922-ddd27525d352',
  'photo-1490645935967-10de6ba17061',
  'photo-1540189549336-e6e99c3679fe',
  'photo-1414235077428-338989a2e8c0',
  'photo-1466637574441-749b8f19452f',
];

/** Unsplash 이미지 URL 로 변환 */
function toUnsplashUrl(photoId) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=800&q=80`;
}

/**
 * 랜덤 음식 이미지 URL 1개 반환
 * @param {string} excludeUrl - 제외할 URL (같은 이미지 연속 방지) [Optional]
 * @returns {string} 이미지 URL
 */
export function getRandomFoodImageUrl(excludeUrl = '') {
  const candidates = FOOD_PHOTO_IDS.map(toUnsplashUrl).filter(
    (url) => url !== excludeUrl,
  );
  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index];
}

/**
 * 랜덤 음식 이미지 URL 을 여러 개 반환 (중복 없음)
 * @param {number} count - 개수 [Optional, 기본값: 6]
 * @returns {string[]} 이미지 URL 배열
 */
export function getRandomFoodImageUrls(count = 6) {
  const shuffled = [...FOOD_PHOTO_IDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(toUnsplashUrl);
}

/**
 * 이미지 로드 실패 시 사용할 대체 URL
 * @param {string|number} seed - 대체 이미지 시드 [Required]
 * @returns {string} picsum.photos 이미지 URL
 */
export function getFallbackImageUrl(seed) {
  return `https://picsum.photos/seed/matstagram-${seed}/800/800`;
}

/**
 * 랜덤 프로필(일러스트) 이미지 URL
 * @param {string} seed - 시드 문자열 [Required]
 * @returns {string} DiceBear 아바타 URL
 */
export function getProfileImageUrl(seed) {
  const palette = ['ffd8a8', 'ffe8cc', 'ffec99', 'd0ebff', 'ffd6e0'];
  const color = palette[Math.floor(Math.random() * palette.length)];
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(
    seed,
  )}&backgroundColor=${color}`;
}

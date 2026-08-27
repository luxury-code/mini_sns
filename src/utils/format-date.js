/**
 * 작성 시간을 "방금 전 / n분 전 / n시간 전 / n일 전 / YYYY.MM.DD" 형태로 변환
 * @param {string} isoString - ISO 형식 날짜 문자열 [Required]
 * @returns {string} 상대 시간 텍스트
 */
export function formatRelativeTime(isoString) {
  if (!isoString) return '';

  const target = new Date(isoString);
  const diffSeconds = Math.floor((Date.now() - target.getTime()) / 1000);

  if (diffSeconds < 60) return '방금 전';
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}분 전`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}시간 전`;
  if (diffSeconds < 604800) return `${Math.floor(diffSeconds / 86400)}일 전`;

  const yyyy = target.getFullYear();
  const mm = String(target.getMonth() + 1).padStart(2, '0');
  const dd = String(target.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
}

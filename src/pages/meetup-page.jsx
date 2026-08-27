import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AppFrame from '../components/common/app-frame';
import TopBar from '../components/common/top-bar';
import MeetupCard from '../components/meetup/meetup-card';
import { MEETUPS, NOTIFICATIONS } from '../data/mock-data';

/** 목업 기준 위치 및 검색 반경 */
const MY_LOCATION = '서울 마포구 연남동';
const SEARCH_RADIUS_KM = 5;

/**
 * MeetupPage — 내 위치 주변 친구 모임 목록 (목업 페이지)
 *
 * Example usage:
 * <Route path="/meetup" element={ <MeetupPage /> } />
 */
function MeetupPage() {
  const navigate = useNavigate();

  /** 참가 버튼 → 해당 모임의 단체 채팅방으로 이동 */
  const handleJoin = (meetup) => {
    const room = meetup.id === 2 ? 3 : 1;
    navigate(`/chat/${room}`);
  };

  return (
    <AppFrame header={ <TopBar notificationCount={ NOTIFICATIONS.length } /> }>
      <Box sx={ { px: { xs: 2, md: 3 }, pt: { xs: 2.5, md: 3 }, pb: 1 } }>
        <Typography sx={ { fontSize: { xs: '1.25rem', md: '1.4rem' }, fontWeight: 800 } }>
          주변 친구 모임
        </Typography>

        <Box
          sx={ {
            mt: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            color: 'text.secondary',
            fontSize: '0.82rem',
          } }
        >
          <MyLocationIcon sx={ { fontSize: 16, color: 'primary.main' } } />
          { MY_LOCATION } 기준
          <Chip
            label={ `반경 ${SEARCH_RADIUS_KM}km` }
            size="small"
            sx={ {
              bgcolor: 'secondary.light',
              color: 'primary.dark',
              fontWeight: 700,
              fontSize: '0.7rem',
              height: 22,
            } }
          />
        </Box>
      </Box>

      <Box
        sx={ {
          px: { xs: 2, md: 3 },
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.75,
        } }
      >
        { MEETUPS.map((meetup) => (
          <MeetupCard key={ meetup.id } meetup={ meetup } onJoin={ handleJoin } />
        )) }
      </Box>
    </AppFrame>
  );
}

export default MeetupPage;

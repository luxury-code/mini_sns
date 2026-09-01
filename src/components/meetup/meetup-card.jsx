import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

/**
 * MeetupCard 컴포넌트 — 주변 친구 모임 카드 UI (목업)
 *
 * Props:
 * @param {object} meetup - 모임 데이터 { id, title, place, time, distanceKm, current, capacity, host, tags } [Required]
 * @param {function} onJoin - 참가 버튼 클릭 시 실행 (meetup 전달) [Required]
 *
 * Example usage:
 * <MeetupCard meetup={ meetup } onJoin={ handleJoin } />
 */
function MeetupCard({ meetup, onJoin }) {
  const isFull = meetup.current >= meetup.capacity;
  const progress = Math.round((meetup.current / meetup.capacity) * 100);

  return (
    <Card
      elevation={ 0 }
      sx={ {
        p: { xs: 2, md: 2.5 },
        borderRadius: 0,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.25,
      } }
    >
      <Box sx={ { display: 'flex', alignItems: 'flex-start', gap: 1 } }>
        <Box sx={ { flexGrow: 1, minWidth: 0 } }>
          <Typography sx={ { fontWeight: 800, fontSize: { xs: '1rem', md: '1.05rem' } } }>
            { meetup.title }
          </Typography>
          <Typography sx={ { fontSize: '0.78rem', color: 'text.secondary', mt: 0.25 } }>
            방장 { meetup.host }
          </Typography>
        </Box>

        <Chip
          label={ `${meetup.distanceKm}km` }
          size="small"
          sx={ { bgcolor: 'primary.main', color: '#fff', fontWeight: 700, height: 24 } }
        />
      </Box>

      <Box sx={ { display: 'flex', flexDirection: 'column', gap: 0.5, color: 'text.secondary' } }>
        <Box sx={ { display: 'flex', alignItems: 'center', gap: 0.75, fontSize: '0.82rem' } }>
          <AccessTimeIcon sx={ { fontSize: 16 } } />
          { meetup.time }
        </Box>
        <Box sx={ { display: 'flex', alignItems: 'center', gap: 0.75, fontSize: '0.82rem' } }>
          <PlaceOutlinedIcon sx={ { fontSize: 16 } } />
          { meetup.place }
        </Box>
      </Box>

      <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.5 } }>
        { meetup.tags.map((tag) => (
          <Chip
            key={ tag }
            label={ `#${tag}` }
            size="small"
            sx={ {
              bgcolor: 'secondary.light',
              color: 'primary.dark',
              fontSize: '0.72rem',
              fontWeight: 600,
              height: 22,
            } }
          />
        )) }
      </Box>

      <Box>
        <Box
          sx={ {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 0.5,
            fontSize: '0.78rem',
            color: 'text.secondary',
          } }
        >
          <Box sx={ { display: 'flex', alignItems: 'center', gap: 0.5 } }>
            <GroupsOutlinedIcon sx={ { fontSize: 16 } } />
            모집 인원
          </Box>
          <Box sx={ { fontWeight: 700, color: isFull ? 'text.secondary' : 'primary.main' } }>
            { meetup.current } / { meetup.capacity } 명
          </Box>
        </Box>

        <LinearProgress
          variant="determinate"
          value={ progress }
          sx={ {
            height: 6,
            borderRadius: 3,
            bgcolor: 'secondary.light',
            '& .MuiLinearProgress-bar': { borderRadius: 3 },
          } }
        />
      </Box>

      <Button
        variant={ isFull ? 'outlined' : 'contained' }
        disabled={ isFull }
        onClick={ () => onJoin(meetup) }
        sx={ { mt: 0.5, py: 1.1 } }
      >
        { isFull ? '모집 마감' : '참가하기' }
      </Button>
    </Card>
  );
}

export default MeetupCard;

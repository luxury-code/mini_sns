import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import AppFrame from '../components/common/app-frame';
import TopBar from '../components/common/top-bar';
import { CHAT_ROOMS, NOTIFICATIONS } from '../data/mock-data';

/**
 * ChatListPage — 채팅방 목록 (목업 페이지)
 *
 * Example usage:
 * <Route path="/chat" element={ <ChatListPage /> } />
 */
function ChatListPage() {
  const navigate = useNavigate();

  return (
    <AppFrame header={ <TopBar notificationCount={ NOTIFICATIONS.length } /> }>
      <Box sx={ { px: { xs: 2, md: 3 }, pt: { xs: 2.5, md: 3 }, pb: 1 } }>
        <Typography sx={ { fontSize: { xs: '1.25rem', md: '1.4rem' }, fontWeight: 800 } }>
          채팅
        </Typography>
        <Typography sx={ { fontSize: '0.82rem', color: 'text.secondary', mt: 0.5 } }>
          1:1 채팅과 친구 모임 단체 채팅방 목록입니다.
        </Typography>
      </Box>

      <Box sx={ { pb: 2 } }>
        { CHAT_ROOMS.map((room, index) => (
          <Box key={ room.id }>
            <Box
              onClick={ () => navigate(`/chat/${room.id}`) }
              sx={ {
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: { xs: 2, md: 3 },
                py: 1.75,
                cursor: 'pointer',
                '&:hover': { bgcolor: 'secondary.light' },
              } }
            >
              <Avatar
                src={ `https://api.dicebear.com/9.x/adventurer/svg?seed=${room.avatarSeed}&backgroundColor=ffe8cc` }
                alt={ room.name }
                sx={ { width: 48, height: 48, bgcolor: 'secondary.light' } }
              />

              <Box sx={ { flexGrow: 1, minWidth: 0 } }>
                <Box sx={ { display: 'flex', alignItems: 'center', gap: 0.75 } }>
                  <Box
                    component="span"
                    sx={ {
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    } }
                  >
                    { room.name }
                  </Box>
                  <Chip
                    icon={
                      room.type === 'group' ? (
                        <GroupsOutlinedIcon sx={ { fontSize: 14 } } />
                      ) : (
                        <PersonOutlineIcon sx={ { fontSize: 14 } } />
                      )
                    }
                    label={ room.type === 'group' ? `단체 ${room.memberCount}` : '1:1' }
                    size="small"
                    sx={ {
                      height: 20,
                      fontSize: '0.66rem',
                      fontWeight: 700,
                      bgcolor: 'secondary.light',
                      color: 'primary.dark',
                      '& .MuiChip-icon': { color: 'primary.dark', ml: 0.5 },
                    } }
                  />
                </Box>

                <Box
                  sx={ {
                    fontSize: '0.8rem',
                    color: 'text.secondary',
                    mt: 0.25,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  } }
                >
                  { room.lastMessage }
                </Box>
              </Box>

              <Box sx={ { fontSize: '0.7rem', color: 'text.secondary', flexShrink: 0 } }>
                { room.lastTime }
              </Box>
            </Box>

            { index < CHAT_ROOMS.length - 1 && <Divider sx={ { mx: { xs: 2, md: 3 } } } /> }
          </Box>
        )) }
      </Box>
    </AppFrame>
  );
}

export default ChatListPage;

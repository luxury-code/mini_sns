import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import AppFrame from '../components/common/app-frame';
import PageHeader from '../components/common/page-header';
import { NOTIFICATIONS } from '../data/mock-data';

/** 알림 종류별 아이콘 매핑 */
const TYPE_ICONS = {
  like: FavoriteIcon,
  comment: ChatBubbleOutlineIcon,
  meetup: GroupsOutlinedIcon,
  follow: PersonAddAlt1OutlinedIcon,
};

/**
 * NotificationPage — 알림 목록 (목업 페이지)
 *
 * Example usage:
 * <Route path="/notifications" element={ <NotificationPage /> } />
 */
function NotificationPage() {
  const navigate = useNavigate();

  return (
    <AppFrame header={ <PageHeader title="알림" onBack={ () => navigate(-1) } /> }>
      <Box sx={ { py: 1 } }>
        { NOTIFICATIONS.map((item, index) => {
          const Icon = TYPE_ICONS[item.type] ?? FavoriteIcon;

          return (
            <Box key={ item.id }>
              <ButtonBase
                onClick={ () => navigate(item.link) }
                sx={ {
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  gap: 1.5,
                  px: { xs: 2, md: 3 },
                  py: 1.75,
                  '&:hover': { bgcolor: 'secondary.light' },
                } }
              >
                <Box sx={ { position: 'relative', flexShrink: 0 } }>
                  <Avatar
                    src={ `https://api.dicebear.com/9.x/adventurer/svg?seed=${item.seed}&backgroundColor=ffe8cc` }
                    alt={ item.actor }
                    sx={ { width: 44, height: 44, bgcolor: 'secondary.light' } }
                  />
                  <Box
                    sx={ {
                      position: 'absolute',
                      right: -2,
                      bottom: -2,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid',
                      borderColor: 'background.default',
                    } }
                  >
                    <Icon sx={ { fontSize: 11, color: '#fff' } } />
                  </Box>
                </Box>

                <Box sx={ { flexGrow: 1, minWidth: 0 } }>
                  <Box sx={ { fontSize: '0.86rem', lineHeight: 1.5, color: 'text.primary' } }>
                    <Box component="span" sx={ { fontWeight: 700 } }>{ item.actor }</Box>
                    { item.text }
                  </Box>
                  <Box sx={ { fontSize: '0.72rem', color: 'text.secondary', mt: 0.25 } }>
                    { item.time }
                  </Box>
                </Box>

                <ChevronRightIcon sx={ { fontSize: 20, color: 'text.secondary', flexShrink: 0 } } />
              </ButtonBase>

              { index < NOTIFICATIONS.length - 1 && <Divider sx={ { mx: { xs: 2, md: 3 } } } /> }
            </Box>
          );
        }) }
      </Box>
    </AppFrame>
  );
}

export default NotificationPage;

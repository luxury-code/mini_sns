import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import BrandLogo from './brand-logo';

/**
 * TopBar 컴포넌트 — 왼쪽 로고, 오른쪽 알림 아이콘
 *
 * Props:
 * @param {number} notificationCount - 알림 배지 숫자 [Optional, 기본값: 0]
 *
 * Example usage:
 * <TopBar notificationCount={ 3 } />
 */
function TopBar({ notificationCount = 0 }) {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      elevation={ 0 }
      sx={ {
        top: 0,
        bgcolor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      } }
    >
      <Toolbar sx={ { minHeight: 56, px: { xs: 2, md: 3 }, justifyContent: 'space-between' } }>
        <BrandLogo size={ 32 } />

        <IconButton
          aria-label="알림"
          onClick={ () => navigate('/notifications') }
          sx={ { color: 'text.primary' } }
        >
          <Badge badgeContent={ notificationCount } color="primary">
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

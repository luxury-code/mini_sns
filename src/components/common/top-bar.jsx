import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import BrandLogo from './brand-logo';
import { useAuth } from '../../hooks/use-auth';

/**
 * TopBar 컴포넌트 — 왼쪽 로고, 오른쪽 알림 · 로그아웃 아이콘
 *
 * Props:
 * @param {number} notificationCount - 알림 배지 숫자 [Optional, 기본값: 0]
 *
 * Example usage:
 * <TopBar notificationCount={ 3 } />
 */
function TopBar({ notificationCount = 0 }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  /** 로그아웃 후 로그인 화면으로 이동 */
  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

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

        <Box sx={ { display: 'flex', alignItems: 'center', gap: 0.25 } }>
          <Tooltip title="알림">
            <IconButton
              aria-label="알림"
              onClick={ () => navigate('/notifications') }
              sx={ { color: 'text.primary' } }
            >
              <Badge badgeContent={ notificationCount } color="primary">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="로그아웃">
            <IconButton
              aria-label="로그아웃"
              onClick={ handleLogout }
              sx={ { color: 'text.secondary' } }
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

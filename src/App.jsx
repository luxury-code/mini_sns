import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthProvider from './components/common/auth-provider';
import RequireAuth from './components/common/require-auth';
import ChatListPage from './pages/chat-list-page';
import ChatRoomPage from './pages/chat-room-page';
import CreatePostPage from './pages/create-post-page';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import MeetupPage from './pages/meetup-page';
import MyPage from './pages/my-page';
import NotificationPage from './pages/notification-page';
import SignupPage from './pages/signup-page';

/** 로그인이 필요한 페이지 목록 */
const PRIVATE_ROUTES = [
  { path: '/', element: <HomePage /> },
  { path: '/create', element: <CreatePostPage /> },
  { path: '/profile', element: <MyPage /> },
  { path: '/meetup', element: <MeetupPage /> },
  { path: '/chat', element: <ChatListPage /> },
  { path: '/chat/:roomId', element: <ChatRoomPage /> },
  { path: '/notifications', element: <NotificationPage /> },
];

/**
 * App — 맛스타그램 라우팅 진입점
 *
 * Example usage:
 * <App />
 */
function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/signup" element={ <SignupPage /> } />

          { PRIVATE_ROUTES.map(({ path, element }) => (
            <Route key={ path } path={ path } element={ <RequireAuth>{ element }</RequireAuth> } />
          )) }

          <Route path="*" element={ <Navigate to="/" replace /> } />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;

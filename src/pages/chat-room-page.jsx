import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AppFrame from '../components/common/app-frame';
import PageHeader from '../components/common/page-header';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { CHAT_MESSAGES, CHAT_ROOMS } from '../data/mock-data';

/**
 * ChatRoomPage — 채팅방 화면 (목업, 전송한 메시지는 화면에만 반영)
 *
 * Example usage:
 * <Route path="/chat/:roomId" element={ <ChatRoomPage /> } />
 */
function ChatRoomPage() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const numericRoomId = Number(roomId);

  const room = CHAT_ROOMS.find((item) => item.id === numericRoomId);
  const [messages, setMessages] = useState(() => CHAT_MESSAGES[numericRoomId] ?? []);
  const [text, setText] = useState('');

  /** 메시지 전송 (목업 — 로컬 상태에만 추가) */
  const handleSend = (event) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, sender: '나', text: trimmed, time, isMine: true },
    ]);
    setText('');
  };

  const headerTitle = room
    ? `${room.name}${room.type === 'group' ? ` (${room.memberCount})` : ''}`
    : '채팅방';

  return (
    <AppFrame
      isBottomNavVisible={ false }
      header={ <PageHeader title={ headerTitle } onBack={ () => navigate('/chat') } /> }
    >
      { /* 메시지 목록 */ }
      <Box
        sx={ {
          flexGrow: 1,
          px: { xs: 2, md: 3 },
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.25,
        } }
      >
        { messages.map((message) => (
          <Box
            key={ message.id }
            sx={ {
              display: 'flex',
              flexDirection: 'column',
              alignItems: message.isMine ? 'flex-end' : 'flex-start',
            } }
          >
            { !message.isMine && (
              <Box sx={ { fontSize: '0.7rem', color: 'text.secondary', mb: 0.25, px: 0.5 } }>
                { message.sender }
              </Box>
            ) }

            <Box
              sx={ {
                maxWidth: '78%',
                px: 1.75,
                py: 1.1,
                borderRadius: 2.5,
                borderTopRightRadius: message.isMine ? 4 : 20,
                borderTopLeftRadius: message.isMine ? 20 : 4,
                bgcolor: message.isMine ? 'primary.main' : 'background.paper',
                color: message.isMine ? '#fff' : 'text.primary',
                border: message.isMine ? 'none' : '1px solid',
                borderColor: 'divider',
                fontSize: '0.88rem',
                lineHeight: 1.5,
                wordBreak: 'break-word',
              } }
            >
              { message.text }
            </Box>

            <Box sx={ { fontSize: '0.66rem', color: 'text.secondary', mt: 0.25, px: 0.5 } }>
              { message.time }
            </Box>
          </Box>
        )) }
      </Box>

      { /* 채팅 입력란 + 전송 버튼 */ }
      <Box
        component="form"
        onSubmit={ handleSend }
        sx={ {
          position: 'sticky',
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: { xs: 2, md: 3 },
          py: 1.5,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.default',
        } }
      >
        <TextField
          value={ text }
          onChange={ (event) => setText(event.target.value) }
          placeholder="메시지를 입력하세요"
          size="small"
          fullWidth
          autoComplete="off"
          sx={ { '& .MuiOutlinedInput-root': { borderRadius: 5, bgcolor: 'background.paper' } } }
        />
        <IconButton
          type="submit"
          aria-label="전송"
          disabled={ !text.trim() }
          sx={ {
            bgcolor: 'primary.main',
            color: '#fff',
            '&:hover': { bgcolor: 'primary.dark' },
            '&.Mui-disabled': { bgcolor: 'divider', color: 'text.secondary' },
          } }
        >
          <SendRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
    </AppFrame>
  );
}

export default ChatRoomPage;

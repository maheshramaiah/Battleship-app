import React, { useState, useEffect } from 'react';
import history from '../../history';
import { useSocket } from '../../context/socket';
import { useNotification } from '../../context/notification';
import { Button } from '../../components';
import { Container, LoginContainer } from './style';

function Login() {
  const [roomId, setRoomId] = useState('');
  const [io, dispatch] = useSocket();
  const notificationManager = useNotification();
  const { socket } = io;

  useEffect(() => {
    socket.on('LOGIN_SUCCESS', id => {
      dispatch({ type: 'setRoomId', id });
      history.push('/game');
    });
    socket.on('LOGIN_FAILURE', err => notificationManager.push(err.message));
  }, []);

  function createRoom() {
    const id = (Math.random() * 10000).toFixed();

    socket.emit('CREATE_ROOM', id);
    dispatch({ type: 'setRoomId', id });
  }

  function joinRoom(e) {
    e.keyCode === 13 && socket.emit('JOIN_ROOM', roomId);
  }

  return (
    <Container>
      <LoginContainer>
        {
          io.roomId ?
            <span>Room {io.roomId} created, Share it with your friend to start game</span>
            :
            <React.Fragment>
              <Button onClick={createRoom}>Create room</Button>
              <span>OR</span>
              <input value={roomId} onChange={(e) => setRoomId(e.target.value)} onKeyDown={joinRoom} placeholder='Enter a room to join' />
            </React.Fragment>
        }
      </LoginContainer>
    </Container>
  );
}

export default Login;
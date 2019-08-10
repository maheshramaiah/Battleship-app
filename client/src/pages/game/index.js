import React, { useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import { Board, Button, Ships } from '../../components';
import { useSocket } from '../../context/socket';
import { useNotification } from '../../context/notification';
import { initialState, reducer } from './reducer';
import { validatePos } from './utils';
import { Boards, Actions, GameOver } from './style';

function Game() {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [{ socket, roomId }] = useSocket();
  const notificationManager = useNotification();

  useEffect(() => {
    function onunload(e) {
      socket.emit('PLAYER_DISCONNECT', roomId);
    }
    window.addEventListener('beforeunload', onunload);

    return () => {
      window.removeEventListener('beforeunload', onunload);
    };
  }, []);

  useEffect(() => {
    if (!roomId) {
      window.location.href = '/';
    }
  }, [roomId]);

  useEffect(() => {
    socket.on('YOUR_TURN', () => dispatch({ type: 'SET_TURN', isTurn: true }));
    socket.on('FIRE_RECIEVED', onFireReceived);
    socket.on('GAME_STATUS', onGameStatus);
    socket.on('LOGOUT', () => window.location.href = '/');
  }, []);

  useEffect(() => {
    state.status.isGame && gameOver(false);
    state.isReady && socket.emit('ON_SHOOT_ACK', { roomId, ...state.status });
  }, [state.status]);

  function onFireReceived({ row, col }) {
    dispatch({ type: 'ON_FIRE_RECEIVED', row, col });
  }

  function onGameStatus({ isHit, isGame, message, row, col }) {
    const msg = `You ${isHit ? 'Hit' : 'Missed'} ${message ? ' , ' + message : ''}`;

    notificationManager.push(msg);
    isGame && gameOver(true);
    isHit && dispatch({ type: 'ON_SHOOT', row, col, value: '', isHit: true });
  };

  function setReady() {
    dispatch({ type: 'SET_READY' });
    socket.emit('PLAYER_READY', roomId);
  };

  function onShoot(row, col) {
    dispatch({ type: 'SET_TURN', isTurn: false });
    dispatch({ type: 'ON_SHOOT', row, col, value: 'X', isHit: false });
    socket.emit('ON_SHOOT', { roomId, row, col });
  };

  function onPositionChange(position, ship) {
    dispatch({ type: 'SHIP_POSITION', position, ship });
  }

  function onBoardShip(position, ship) {
    if (position && state.previousPositions[ship] !== position) {
      const isValid = validatePos({ position, ship }, state.positions, state.health);

      if (isValid) {
        dispatch({ type: 'CLEAR_SHIP', ship });
        dispatch({ type: 'ON_BOARD_SHIP', position, ship });
      }
      else {
        dispatch({ type: 'SHIP_POSITION', position: state.previousPositions[ship] || '', ship })
        notificationManager.push('Invalid positioning');
      }
    }
  }

  function gameOver(won) {
    dispatch({ type: 'GAME_OVER', status: won ? 'Won' : 'Lost' })
  }

  return (
    <div>
      <Boards>
        <Board board={state.myBoard} title='My ships' />
        <Board board={state.enemyBoard} title='Enemy ships' disabled={!state.isTurn || state.isGameOver} onClick={onShoot} />
      </Boards>
      <Ships
        ships={state.ships}
        positions={state.positions}
        onChange={onPositionChange}
        onBlur={onBoardShip}
        disabled={state.isReady}
      />
      <Actions>
        {
          !state.isReady &&
          <React.Fragment>
            <Button onClick={setReady} disabled={state.onboardedShips.size !== Object.keys(state.ships).length}>
              Ready
            </Button>
          </React.Fragment>
        }
      </Actions>
      {state.isGameOver && <GameOver>Game over, You <i>{state.gameStatus}</i> !</GameOver>}
    </div>
  );
}

export default Game;
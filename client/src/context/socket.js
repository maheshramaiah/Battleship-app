import React, { useReducer, useContext } from 'react';
import io from 'socket.io-client';

const Context = React.createContext();
const socket = io(window.location.host, { transports: ['websocket'] });
const initialState = {
  socket,
  roomId: ''
};

socket.on('connect', () => {
  console.log('connected');
});

function reducer(state, action) {
  switch (action.type) {
    case 'setRoomId': {
      return { ...state, roomId: action.id };
    }
    default:
      return state;
  }
}

export default function SocketProvider({ children }) {
  const value = useReducer(reducer, initialState);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useSocket() {
  return useContext(Context);
}

import React, { useContext } from 'react';
import { Banner, NotificationManager } from '../components';

const Context = React.createContext();
const notificationManager = new NotificationManager();

export default function NotificationProvider({ children }) {
  return (
    <Context.Provider value={notificationManager}>
      <Banner manager={notificationManager} />
      {children}
    </Context.Provider>
  );
}

export function useNotification() {
  return useContext(Context);
}

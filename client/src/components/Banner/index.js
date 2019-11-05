import React, { useState, useEffect } from 'react';
import { BannerWrap, Status } from './style';

function Banner({ manager }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    manager.subscribe(configs => {
      setNotifications(configs);
    });
  }, []);

  return (
    <BannerWrap>
      {notifications.map((not, index) => (
        <Status key={index}>{not.msg}</Status>
      ))}
    </BannerWrap>
  );
}

export default Banner;

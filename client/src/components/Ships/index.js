import React from 'react';
import { Ships, ShipName } from './style';

export default ({ ships, positions, onChange, onBlur, disabled }) => {
  return (
    <Ships>
      {
        Object.keys(ships).map((key, index) => {
          const ship = ships[key];
          return (
            <li key={index}>
              <ShipName>{ship.name} ( Code: {key}, Size: {ship.length})</ShipName>
              <input
                placeholder='eg: a0,0 (ath row, 0th col horizontal)'
                value={positions[key]}
                onChange={e => onChange(e.target.value, key)}
                onBlur={e => onBlur(e.target.value, key)}
                disabled={disabled}
              />
            </li>
          );
        })
      }
    </Ships>
  );
};
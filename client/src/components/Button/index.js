import React from 'react';
import { ButtonWrap } from './styles';

function Button({ children, onClick, disabled }) {
  return (
    <ButtonWrap onClick={onClick} disabled={disabled}>
      {children}
    </ButtonWrap>
  );
}

export default Button;

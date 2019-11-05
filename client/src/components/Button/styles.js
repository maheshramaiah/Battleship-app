import styled, { css } from 'styled-components';

export const ButtonWrap = styled.button`
  background: #007bff;
  padding: 8px;
  border: 0;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;

  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;

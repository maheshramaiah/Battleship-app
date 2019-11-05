import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: inline-block;
`;

export const Title = styled.h4`
  color: #fff;
  text-align: center;
  letter-spacing: 2px;
`;

export const BoardWrap = styled.div`
  position: relative;
  margin: 50px 0 0 50px;

  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}

  @media (max-width: 768px) {
    margin: 30px 0 0 30px;
  }
`;

export const Row = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #333;

  &:last-child {
    border-bottom: 0;
  }
`;

export const Cell = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-right: 1px solid #333;
  min-width: 50px;
  min-height: 50px;
  box-sizing: border-box;
  cursor: pointer;

  ${props =>
    props.isHit &&
    css`
      &:before {
        content: 'X';
        color: red;
        position: absolute;
        opacity: 0.5;
        font-size: 35px;

        @media (max-width: 768px) {
          font-size: 20px;
        }
      }
      pointer-events: none;
    `}

  &:last-child {
    border-right: 0;
  }

  @media (max-width: 768px) {
    min-width: 30px;
    min-height: 30px;
    font-size: 12px;
  }
`;

export const Indicator = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: absolute;

  ${props =>
    props.row &&
    css`
      top: -50px;

      @media (max-width: 768px) {
        top: -30px;
      }
    `}

  ${props =>
    props.col &&
    css`
      top: 0px;
      flex-direction: column;
      left: -50px;

      @media (max-width: 768px) {
        left: -30px;
      }

      li {
        border-bottom: 1px solid transparent;
      }
    `}

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    min-width: 50px;
    min-height: 50px;

    @media (max-width: 768px) {
      min-width: 30px;
      min-height: 30px;
      font-size: 12px;
    }
  }
`;

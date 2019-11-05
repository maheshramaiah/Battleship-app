import styled from 'styled-components';

export const Boards = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;

  button {
    margin-right: 20px;
  }
`;

export const GameOver = styled.h2`
  text-align: center;
  color: #fff;
  font-size: 26px;
  i {
    text-transform: uppercase;
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

export const LoginContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 200px;
  bottom: 0;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  box-sizing: border-box;
  align-items: center;
  span {
    margin: 10px;
    color: #007bff;
  }

  input {
    border: 0;
    border-bottom: 1px solid #007bff;
    width: 30%;
    padding: 5px;
    font-size: 18px;
    text-align: center;

    &:focus {
      outline: none;
    }

    @media (max-width: 768px) {
      width: 80%;
    }
  }
`;
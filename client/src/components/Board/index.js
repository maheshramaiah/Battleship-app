import React from 'react';
import { Container, Title, BoardWrap, Row, Cell, Indicator } from './style';

const indicators = Array(10).fill('');

function Board({ board, title, disabled, onClick }) {
  return (
    <Container>
      <Title>{title}</Title>
      <BoardWrap disabled={disabled}>
        <Indicator row={true}>
          {indicators.map((_, index) => <li key={index}>{index}</li>)}
        </Indicator>
        {
          board.map((row, rowIndex) => (
            <Row key={rowIndex}>
              {
                row.map((col, colIndex) => {
                  const cell = board[rowIndex][colIndex];

                  return (
                    <Cell key={colIndex} onClick={() => !cell.isHit && onClick(rowIndex, colIndex)} isHit={cell.isHit}>
                      {cell.value}
                    </Cell>
                  )
                })
              }
            </Row>
          ))
        }
        <Indicator col={true}>
          {indicators.map((_, index) => <li key={index}>{String.fromCharCode(65 + index)}</li>)}
        </Indicator>
      </BoardWrap>
    </Container>
  );
}

Board.defaultProps = {
  onClick: () => { }
};

export default Board;
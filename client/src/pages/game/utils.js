const regex = /^([a-jA-J])([0-9]),(0|1)$/;

export function createBoard(row = 10, col = 10) {
  let board = [];

  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < col; j++) {
      board[i][j] = {
        value: '',
        isShip: false,
        isHit: false
      };
    }
  }

  return board;
}

export function getPosition(pos) {
  let [_, row, col, axis] = pos.match(regex);

  row = row.toUpperCase().charCodeAt() - 65;
  return [+row, +col, +axis];
}

export function getInitialShipPositions(ships) {
  return Object.keys(ships).reduce((ac, value) => ((ac[value] = ''), ac), {});
}

export function getShipHealth(ships) {
  return Object.keys(ships).reduce(
    (ac, key) => ((ac[key] = ships[key].length), ac),
    {}
  );
}

export function validatePos(ship, ships, health) {
  if (!regex.test(ship.position)) {
    return false;
  }

  const length = health[ship.ship];
  const [row, col, axis] = getPosition(ship.position);

  if (isOutOfBoundary(row, col, axis, length)) {
    return false;
  }

  const cellNos = getCellNos(row, col, axis, length);

  for (const key in ships) {
    if (key !== ship.ship && ships[key]) {
      const [row, col, axis] = getPosition(ships[key]);
      const nos = getCellNos(row, col, axis, health[key]);

      if (cellNos.some(n => nos.includes(n))) {
        return false;
      }
    }
  }

  return true;
}

function isOutOfBoundary(row, col, axis, length) {
  return axis === 0 ? 10 - col < length : 10 - row < length;
}

function getCellNos(row, col, axis, length) {
  let cells = [];

  if (axis === 0) {
    for (let i = 0; i < length; i++) {
      cells.push(`${row}${i + col}`);
    }
  } else {
    for (let i = 0; i < length; i++) {
      cells.push(`${i + row}${col}`);
    }
  }

  return cells;
}

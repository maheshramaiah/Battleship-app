import { ships } from '../../config';
import { createBoard, getPosition, getInitialShipPositions, getShipHealth } from './utils';

const AXIS = {
  horizontal: 0,
  vertical: 1
};

export const initialState = {
  isReady: false,
  onboardedShips: new Set(),
  isTurn: false,
  ships,
  myBoard: createBoard(),
  enemyBoard: createBoard(),
  previousPositions: {},
  positions: getInitialShipPositions(ships),
  positionsValid: false,
  health: getShipHealth(ships),
  status: {
    isHit: false,
    isGame: false,
    message: '',
    row: '',
    col: ''
  },
  isGameOver: false,
  gameStatus: ''
};

export function reducer(draft, action) {
  switch (action.type) {
    case 'SHIP_POSITION': {
      const { ship, position } = action;

      draft.positions[ship] = position;
      break;
    }

    case 'ON_BOARD_SHIP': {
      const { ship, position } = action;

      if (position) {
        shipPositionIterator(position, draft.health[ship], (r, c) => {
          draft.myBoard[r][c].value = ship;
          draft.myBoard[r][c].isShip = true;
        });

        draft.previousPositions = draft.positions;
        draft.onboardedShips.add(ship);
      }
      break;
    }

    case 'CLEAR_SHIP': {
      const { ship } = action;
      const previousPosition = draft.previousPositions[ship];

      if (previousPosition) {
        shipPositionIterator(previousPosition, draft.health[ship], (r, c) => {
          draft.myBoard[r][c].value = '';
          draft.myBoard[r][c].isShip = false;
        });
      }
      break;
    }

    case 'SET_READY': {
      draft.isReady = true;
      break;
    }

    case 'SET_TURN': {
      draft.isTurn = action.isTurn;
      break;
    }

    case 'ON_SHOOT': {
      const { row, col, value, isHit } = action;

      draft.enemyBoard[row][col].value = value;
      draft.enemyBoard[row][col].isHit = isHit;
      break;
    }

    case 'ON_FIRE_RECEIVED': {
      const { row, col } = action;
      const cell = draft.myBoard[row][col];

      if (!cell.isHit) {
        if (cell.isShip) {
          draft.health[cell.value] -= 1;
          draft.myBoard[row][col].isHit = true;
        }
        else {
          draft.myBoard[row][col].value = 'X';
        }
      }
      draft.status = {
        isHit: draft.myBoard[row][col].isHit,
        isGame: Object.values(draft.health).every(length => length === 0),
        message: draft.health[cell.value] === 0 ? `Ship ${draft.ships[cell.value].name} destroyed` : '',
        row,
        col
      };

      break;
    }

    case 'GAME_OVER': {
      draft.isGameOver = true;
      draft.gameStatus = action.status;
      break;
    }
  }
}

function shipPositionIterator(position, length, updater) {
  const [row, col, axis] = getPosition(position);
  const isVertical = axis === AXIS.vertical;
  const iterator = isVertical ? row : col;

  for (let i = iterator; i < (iterator + length); i++) {
    const r = isVertical ? i : row;
    const c = isVertical ? col : i;

    updater(r, c);
  }
}
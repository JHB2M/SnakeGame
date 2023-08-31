import {Coordinate} from '../constants/types';
export const checkGameOver = (snakeHead: Coordinate, boundaries: any) => {
  return (
    snakeHead.x < boundaries.xMin ||
    snakeHead.x > boundaries.xMax ||
    snakeHead.y < boundaries.yMin ||
    snakeHead.y > boundaries.yMax
  );
};

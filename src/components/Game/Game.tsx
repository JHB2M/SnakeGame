import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {Coordinate, Direction} from '../../constants/types';
import {Snake,Food,Header} from '../';
import {checkGameOver} from '../../utils/checkGameOvert';
import {CheckEatsFood} from '../../utils/checkEatsFood';
import {randomFoodCoordinate} from '../../utils/randomFoodCoordinate';

const SNAKE_INITIAL_POSITION = [{x: 5, y: 5},{x: 5, y: 5}];
const FOOD_INITIAL_POSITION = {x: 5, y: 20};
const GAME_BOUNDS = {xMin: 0, xMax: 34, yMin: 0, yMax: 66};
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

const Game = () => {
  const [direction, setDirection] = useState(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGamePaused, setIsGamePaused] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        !isGamePaused && moveSnake();
      }, MOVE_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isGamePaused]);


  // reload the game
  const handleReload =() =>{
    setSnake(SNAKE_INITIAL_POSITION)
    setFood(FOOD_INITIAL_POSITION)
    setIsGameOver(false)
    setScore(0)
    setDirection(Direction.Right)
    setIsGamePaused(false)
  }
  // snake movement
  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = {...snakeHead};

    //Game Over
    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver(prev => !prev);
      return;
    }

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }

    if (CheckEatsFood(newHead, food, 2)) {
      setSnake([newHead, ...snake]);
      setFood(randomFoodCoordinate(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setScore(prev => prev + SCORE_INCREMENT);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };
  // take user touches
  const handleGesture = (event: PanGestureHandlerGestureEvent) => {
    const {translationX, translationY} = event.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      // Horizontal movement
      if (translationX > 0) {
        // Right Movement
        setDirection(Direction.Right);
      } else {
        //Left Movement
        setDirection(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        // Down Movement
        setDirection(Direction.Down);
      } else {
        // Up Movement
        setDirection(Direction.Up);
      }
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <View style={styles.container}>
        <Header   setIsPaused={setIsGamePaused} score={score} onPressReload={handleReload}/>

        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
      </View>
    </PanGestureHandler>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
  },
  boundaries: {
    backgroundColor: Colors.background,
    height: '86%',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    marginTop:20,
  },
});

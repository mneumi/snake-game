import Snake from './snake';
import Food from './food';
import ScorePanel from './score_panel';
import { maxLevel, initSpeed, blockHeight, blockWidth } from './config';

enum DirectionEnum {
  UP = 'up',
  RIGHT = 'right',
  DOWN = 'down',
  LEFT = 'left',
  NULL = 'null'
}

class GameController {
  private snake: Snake;
  private food: Food;
  private scorePanel: ScorePanel;

  private direction: DirectionEnum;
  private isLive: boolean;
  private speed: number;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();

    this.direction = DirectionEnum.NULL;
    this.isLive = true;
    this.speed = initSpeed / maxLevel;

    this.initGame();
  }

  play() {
    this.initGame();
    this.run();
  }

  private initGame() {
    document.addEventListener('keydown', this.keyDownHandler.bind(this));

    this.food.random(); 
    this.snake.random();
  }

  private keyDownHandler(event: KeyboardEvent) {
    const eventKey = event.key.replace('Arrow', '').toLowerCase();

    switch (eventKey) {
      case 'up': 
        this.direction = DirectionEnum.UP; 
        break;
      case 'right': 
        this.direction = DirectionEnum.RIGHT; 
        break;
      case 'down': 
        this.direction = DirectionEnum.DOWN; 
        break;
      case 'left': 
        this.direction = DirectionEnum.LEFT; 
        break;
      default: 
        return;
    }
  }

  private run() {
    let X = this.snake.X;
    let Y = this.snake.Y;

    switch (this.direction) {
      case DirectionEnum.UP:
        Y -= blockHeight;
        break;
      case DirectionEnum.RIGHT:
        X += blockWidth;
        break;
      case DirectionEnum.DOWN:
        Y += blockHeight;
        break;
      case DirectionEnum.LEFT:
        X -= blockWidth;
        break;
      case DirectionEnum.NULL:
        break;
    }

    this.checkEat(X, Y);

    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e: unknown) {
      this.isLive = false;
      if (this.scorePanel.getBest() < this.scorePanel.getScore()) {
        this.scorePanel.setBest(this.scorePanel.getScore());
      }
      alert((e as Error).message + ' Game Over');
    }

    if (this.isLive) {
      setTimeout(this.run.bind(this), 
        initSpeed - (this.speed * this.scorePanel.getLevel()));
    }
  }

  private checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      this.food.random();
      this.scorePanel.increScore();
      this.snake.grow();
    }
  }
}

export default GameController;
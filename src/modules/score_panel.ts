import { maxLevel, scoreLevel } from './config';

class ScorePanel {
  private score = 0;
  private best = 0;
  private level = 1;

  scoreElement: HTMLElement;
  levelElement: HTMLElement;
  bestElement: HTMLElement;

  private maxLevel = maxLevel;
  private scoreLevel = scoreLevel;

  constructor() {
    this.scoreElement = document.getElementById('score')!;
    this.bestElement = document.getElementById('best')!;
    this.levelElement = document.getElementById('level')!;

    const bestHistory = window.localStorage.getItem('best') ?? '0';
    this.setBest(parseInt(bestHistory));
  }

  increScore(): void {
    this.score++;
    this.scoreElement.innerHTML = `Score: ${this.score}`;

    if (this.score % this.scoreLevel === 0) {
      this.levelUp();
    }
  }

  getScore(): number {
    return this.score;
  }

  levelUp(): void {
    if (this.level > this.maxLevel) {
      return;
    }
    this.level++;
    this.levelElement.innerHTML = 'Level: ' + `${this.level}`.padStart(2, '0');
  }

  getLevel(): number {
    return this.level;
  }

  setBest(bestScore: number): void {
    this.best = bestScore;
    this.bestElement.innerHTML = `Best : ${this.best}`;
    window.localStorage.setItem('best', `${bestScore}`);
  }

  getBest(): number {
    return this.best;
  }
}

export default ScorePanel;
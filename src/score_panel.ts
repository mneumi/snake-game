class ScorePanel {
  private score = 0;
  private level = 0;
  private best = 0;

  scoreElement: HTMLElement;
  levelElement: HTMLElement;
  bestElement: HTMLElement;

  constructor(private maxLevel = 99, private upScore = 10) {
    this.scoreElement = document.getElementById('score')!;
    this.levelElement = document.getElementById('level')!;
    this.bestElement = document.getElementById('level')!;
  }

  addScore(): void {
    this.score++;
    this.scoreElement.innerHTML = `Score: ${this.score}`;

    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }

  getScore(): number {
    return this.score;
  }

  levelUp(): void {
    if (this.level >= this.maxLevel) {
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
  }

  getBest(): number {
    return this.best;
  }
}

export default ScorePanel;
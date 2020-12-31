import { stageWidth, stageHeight } from './config';

class Food {
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById('food')!;
  }

  get X(): number {
    return this.element.offsetLeft;
  }

  get Y(): number {
    return this.element.offsetTop;
  }

  random(): void {
    const left = Math.round(Math.random() * (stageWidth / 10 - 1)) * 10;
    const top = Math.round(Math.random() * (stageHeight / 10 - 1)) * 10;

    this.element.style.left = `${left}px`;
    this.element.style.top = `$${top}px`;
  }
}

export default Food;
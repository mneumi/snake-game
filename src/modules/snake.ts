import { 
  blockHeight, 
  blockWidth, 
  stageHeight, 
  stageWidth 
} from './config';

class Snake {
  element: HTMLElement;
  head: HTMLElement;
  bodies: HTMLCollection;

  constructor() {
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake > div') as HTMLElement;
    this.bodies = this.element.getElementsByTagName('div');
  }

  get X(): number {
    return this.head.offsetLeft;
  }

  get Y(): number {
    return this.head.offsetTop;
  }

  set X(value: number) {
    if (this.X === value) {
      return;
    }

    if (value < 0 || value > (stageWidth - blockWidth)) {
      throw new Error('撞墙了');
    }

    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      if (value > this.X) {
        value = this.X - blockWidth;
      } else {
        value = this.X + blockWidth;
      }
    }

    this.moveBody();
    this.head.style.left = `${value}px`;
    this.checkCrash();
  }

  set Y(value: number) {
    if (this.Y === value) {
      return;
    }

    if (value < 0 || value > (stageHeight - blockHeight)) {
      throw new RangeError('撞墙了');
    }

    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - blockHeight;
      } else {
        value = this.Y + blockHeight;
      }
    }

    this.moveBody();
    this.head.style.top = `${value}px`;
    this.checkCrash();
  }

  random(): void {
    const left = Math.round(Math.random() * (stageWidth / 10 - 1)) * 10;
    const top = Math.round(Math.random() * (stageHeight / 10 - 1)) * 10;

    this.head.style.left = `${left}px`;
    this.head.style.top = `$${top}px`;
  }

  grow() {
    this.element.insertAdjacentHTML('beforeend', '<div></div>' );
  }

  private moveBody() {
    for (let i=this.bodies.length-1; i > 0; i--) {
      let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

      (this.bodies[i] as HTMLElement).style.left = `${X}px`;
      (this.bodies[i] as HTMLElement).style.top = `${Y}px`;
    }
  }

  private checkCrash() {
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new RangeError('撞到自己了');
      }
    }
  }
}

export default Snake;
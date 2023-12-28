type AnimationEndCallback = () => void;

class FlipDom {
  private firstPosition: DOMRect | null = null;
  private lastPosition: DOMRect | null = null;
  private playing = false;
  constructor(private dom: Element, private duration = 1000) {
    this.getFirst();
  }

  private getPositions() {
    return this.dom.getBoundingClientRect();
  }

  private getFirst = () => {
    this.firstPosition = this.getPositions();
  };

  private getLast = () => {
    this.lastPosition = this.getPositions();
  };

  private invert(callBack?: AnimationEndCallback) {
    const diffX = this.firstPosition!.left - this.lastPosition!.left;
    const diffY = this.firstPosition!.top - this.lastPosition!.top;
    // console.log(this.dom.textContent, `diffX==>${diffX}`, `diffY==>${diffY}`);
    if (Math.abs(diffX) === 0 && Math.abs(diffY) === 0) {
      this.playing = false;
      if (callBack) {
        callBack();
      }
      return;
    }
    if (this.dom instanceof HTMLElement) {
      const elementAnimation = this.dom.animate(
        [
          {
            transform: `translate(${diffX}px, ${diffY}px)`,
          },
          {
            transform: 'none',
          },
        ],
        {
          duration: this.duration,
          fill: 'forwards',
        }
      );
      elementAnimation.addEventListener('finish', () => {
        this.playing = false;
        if (callBack) {
          callBack();
        }
        this.getFirst();
      });
    }
  }

  play(callBack?: AnimationEndCallback) {
    if (!this.playing) {
      this.playing = true;
      this.getLast();
      this.invert(callBack);
    }
  }
}

export default class Flip {
  private flips: FlipDom[] = [];
  constructor(doms: Element[], duration = 1000) {
    this.flips = doms.map(element => new FlipDom(element, duration));
  }
  play(callBack?: AnimationEndCallback) {
    const playPromises = this.flips.map(flipDom => new Promise<void>(resolve => flipDom.play(resolve)));

    Promise.all(playPromises).then(() => {
      if (callBack) {
        callBack();
      }
    });
  }
}

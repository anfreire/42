const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREMENT = 0.000002;
const VELOCITY_MAX = 0.1;

interface Bound {
  upper: number;
  lower: number;
}

interface Bounds {
  left: Bound;
  right: Bound;
}

export class Ball {
  private _position: { x: number; y: number } = { x: 50, y: 50 };
  private _direction: { x: number; y: number } = { x: 0, y: 1 };
  private _velocity: number = INITIAL_VELOCITY;

  constructor() {
    this.reset();
  }

  //--------------------------------------
  // Getters

  get x(): number {
    return this._position.x;
  }

  get y(): number {
    return this._position.y;
  }

  get direction(): { x: number; y: number } {
    return this._direction;
  }

  get velocity(): number {
    return this._velocity;
  }

  get position(): { x: number; y: number } {
    return this._position;
  }

  //--------------------------------------
  // Setters

  set x(x: number) {
    this._position.x = x;
  }

  set y(y: number) {
    if (y <= 0) y = 0;
    else if (y >= 100) y = 100;
    this._position.y = y;
  }

  set direction(direction: { x: number; y: number }) {
    if (direction.x > 0 && direction.x < 0.30) direction.x = 0.30;
    else if (direction.x < 0 && direction.x > -0.30) direction.x = -0.30;
    this._direction = direction;
  }

  set velocity(velocity: number) {
    if (velocity >= VELOCITY_MAX) velocity = VELOCITY_MAX;
    this._velocity = velocity;
  }

  //--------------------------------------
  // Methods

  reset(): void {
    this._position = { x: 50, y: 50 };
    this._direction = { x: 0, y: 1 };
    this._velocity = INITIAL_VELOCITY;
    this.getRandomDirection();
  }

  addAngle(angle: number): void {
    if (angle === 0) return;
    const rad = Math.atan2(this.direction.y, this.direction.x);
    if (Math.PI / 2 <= rad && rad <= (3 * Math.PI) / 2) {
      var newRad = rad - angle;
    } else {
      var newRad = rad + angle;
    }
    this.direction = {
      x: Math.cos(newRad),
      y: Math.sin(newRad),
    };
  }

  getBounds(leftPaddle: number, rightPaddle: number): Bounds {
    return {
      left: {
        upper: leftPaddle - leftPaddle * 0.2,
        lower: leftPaddle + (100 - leftPaddle) * 0.2,
      },
      right: {
        upper: rightPaddle - rightPaddle * 0.2,
        lower: rightPaddle + (100 - rightPaddle) * 0.2,
      },
    };
  }

  checkTouch(bounds: Bounds): 'LEFT' | 'RIGHT' | null {
    return this.x <= 2 &&
      this.y >= bounds.left.upper &&
      this.y <= bounds.left.lower
      ? 'LEFT'
      : this.x >= 98 &&
        this.y >= bounds.right.upper &&
        this.y <= bounds.right.lower
      ? 'RIGHT'
      : null;
  }

  getTouchSpot(bound: Bound): number {
    return this.y - (bound.upper + bound.lower) / 2;
  }

  checkLoose(): 'LEFT' | 'RIGHT' | null {
    if (this.x <= 0) return 'LEFT';
    if (this.x >= 100) return 'RIGHT';

    return null;
  }

  update(delta: number, leftPaddle: number, rightPaddle: number): void {
    const touchCheck = this.checkTouch(this.getBounds(leftPaddle, rightPaddle));
    if (touchCheck) {
      if (this.x <= 2) this.x = 2;
      else if (this.x >= 98) this.x = 98;
      this.direction.x *= -1;
      const touchSpot =
        touchCheck === 'LEFT'
          ? this.getTouchSpot(this.getBounds(leftPaddle, rightPaddle).left)
          : this.getTouchSpot(this.getBounds(leftPaddle, rightPaddle).right);
      this.addAngle(touchSpot / 20);
    }
    if (this.y <= 0 || this.y >= 100) {
      this.direction.y *= -1;
    }
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    this.velocity += VELOCITY_INCREMENT * delta;
  }

  getRandomDirection(): void {
    while (
      Math.abs(this.direction.x) <= 0.5 ||
      Math.abs(this.direction.y) >= 0.5
    ) {
      const heading = Math.random() * 2 * Math.PI;
      this.direction = {
        x: Math.cos(heading),
        y: Math.sin(heading),
      };
    }
  }
}

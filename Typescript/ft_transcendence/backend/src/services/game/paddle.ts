export const SPEED = 2;
const STEPS = 1; // Difference that the paddle goes ('UP' or 'DOWN')
export const BOT_SPEED = {
  EASY: 0.003,
  MEDIUM: 0.005,
  HARD: 0.015,
};
const BOT_TRIGGER = {
  EASY: 0.2,
  MEDIUM: 0.3,
  HARD: 0.1,
};

export class Paddle {
  private _position: number = 50;
  private _speed: number = 2;

  constructor(isBot?: boolean, level?: 'EASY' | 'MEDIUM' | 'HARD') {
    if (isBot) this.resetBot(level);
    else this.reset();
  }

  get position(): number {
    return this._position;
  }

  get speed(): number {
    return this._speed;
  }

  set position(value: number) {
    if (value <= 0) value = 0;
    if (value >= 100) value = 100;
    this._position = value;
  }

  set speed(value: number) {
    this._speed = value;
  }

  reset() {
    this.position = 50;
    this._speed = 2;
  }

  resetBot(level: 'EASY' | 'MEDIUM' | 'HARD') {
    this.position = 50;
    this._speed = BOT_SPEED[level];
  }

  get bound(): { upper: number; lower: number } {
    return {
      upper: this.position - this.position * 0.2,
      lower: this.position + (100 - this.position) * 0.2,
    };
  }

  update(direction: 'UP' | 'DOWN') {
    this.position += this.speed * (direction === 'UP' ? -STEPS : STEPS);
  }

  updateBot(delta: number, ballY: number, level: 'EASY' | 'MEDIUM' | 'HARD') {
    if (Math.abs(ballY - this.position) <= BOT_TRIGGER[level]) return;
    this.position += this.speed * delta * (ballY - this.position);
  }
}

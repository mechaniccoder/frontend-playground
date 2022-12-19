import { useEffect, useRef } from 'react';

export const Gravity = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');

    if (!ctx) return;

    const balls: Ball[] = [];

    for (let i = 0; i < 200; i++) {
      const radius = 30;
      const ball = new Ball(
        ctx,
        radius + Math.random() * (window.innerWidth - 2 * radius),
        2 * radius + Math.random() * (window.innerHeight / 2 - 2 * radius),
        3 * Math.random() + 2,
        10,
        radius,
        'red',
        canvasRef.current,
      );
      balls.push(ball);
    }

    function anim() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      balls.forEach((ball) => {
        ball.update();
      });
      requestAnimationFrame(anim);
    }

    anim();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ backgroundColor: '#FFF8E1' }}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

class Ball {
  constructor(
    public ctx: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public dx: number,
    public dy: number,
    public radius: number,
    public color: string,
    public canvas: HTMLCanvasElement,
  ) {}

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }

  update() {
    if (this.y + this.radius + this.dy > this.canvas.height) {
      this.dy = -this.dy * 0.9;
      this.dx *= 0.9;
    } else {
      this.dy += 1;
    }

    if (this.x + this.radius + this.dx > this.canvas.width || this.x - this.radius + this.dx < 0) {
      this.dx = -this.dx;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

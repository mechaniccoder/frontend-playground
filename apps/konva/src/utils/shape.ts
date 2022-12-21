import { getDistance, resolveCollision } from './math';

export class Circle {
  constructor(
    public ctx: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public radius: number,
    public color: string,
  ) {}

  private draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  public update() {
    this.draw();
  }
}

export class Particle {
  constructor(
    public ctx: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public radius: number,
    public color: string,
    public velocity = {
      x: Math.random() * 3,
      y: Math.random() * 3,
    },
    public mass: number = 1,
  ) {}

  private draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  public update(particles: Particle[]) {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.velocity.x *= -1;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.velocity.y *= -1;
    }

    particles.forEach((particle) => {
      if (particle === this) return;

      if (getDistance(particle.x, particle.y, this.x, this.y) < particle.radius + this.radius) {
        resolveCollision(this, particle);
      }
    });

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }
}

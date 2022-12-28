import { useEffect, useRef } from 'react';

export const StartNightSky = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getContext = () => {
    if (!canvasRef.current) throw new Error('No canvas');

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) throw new Error('No context');
    return ctx;
  };

  useEffect(() => {
    let mouseDown = false;
    window.addEventListener('mousedown', () => {
      mouseDown = true;
    });

    window.addEventListener('mouseup', () => {
      mouseDown = false;
    });

    const ctx = getContext();
    let alpha = 1;
    const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

    const particles: Particle[] = [];

    for (let i = 0; i < 2000; i++) {
      const canvasWidth = window.innerWidth + 1000;
      const canvasHeight = window.innerHeight + 2000;
      const radius = 2 * Math.random();
      const newParticle = new Particle(
        ctx,
        Math.random() * canvasWidth - canvasWidth / 2,
        Math.random() * canvasHeight - canvasHeight / 2,
        radius,
        colors[Math.floor(Math.random() * colors.length)],
      );
      particles.push(newParticle);
    }

    let radian = 0;
    function animate() {
      window.requestAnimationFrame(animate);

      ctx.fillStyle = `rgba(10, 10, 10, ${alpha})`;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.save();
      ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
      ctx.rotate(radian);
      particles.forEach((particle) => {
        particle.update();
      });
      ctx.restore();

      radian += 0.003;

      if (mouseDown && alpha >= 0.03) {
        alpha -= 0.01;
      } else if (!mouseDown && alpha < 1) {
        alpha += 0.01;
      }
    }

    animate();
  }, []);

  return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />;
};

class Particle {
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
    this.ctx.shadowColor = this.color;
    this.ctx.shadowBlur = 15;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  public update() {
    this.draw();
  }
}

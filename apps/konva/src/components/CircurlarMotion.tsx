import { useEffect, useRef } from 'react';
import { useRandomColor } from '../hooks/useRandomColor';

export const CircurlarMotion = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getCtx = () => {
    if (!canvasRef.current) throw new Error('Canvas not found');

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) throw new Error('Context not found');

    return ctx;
  };

  const randomColor = useRandomColor();

  const mousePos = useRef({ x: 0, y: 0 });
  const handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    const ctx = getCtx();

    class Particle {
      constructor(
        public ctx: CanvasRenderingContext2D,
        public x: number,
        public y: number,
        public radius: number,
        public color: string,
        public radian: number = Math.PI * 2 * Math.random(),
        public velocity: number = 0.05,
        public distanceFromCenter: number = 50 + Math.random() * 50,
        public lastMouse: { x: number; y: number } = { x: 0, y: 0 },
      ) {}

      private draw(lastPos: { x: number; y: number }) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.radius;
        this.ctx.moveTo(lastPos.x, lastPos.y);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.stroke();
        this.ctx.closePath();
      }

      public update() {
        const lastPos = { x: this.x, y: this.y };
        this.radian += this.velocity;

        this.lastMouse.x += (mousePos.current.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mousePos.current.y - this.lastMouse.y) * 0.05;

        this.x = this.lastMouse.x + Math.cos(this.radian) * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radian) * this.distanceFromCenter;

        this.draw(lastPos);
      }
    }

    const particles: Particle[] = [];

    for (let i = 0; i < 20; i++) {
      const newParticle = new Particle(ctx, 200, 200, 1 + Math.random() * 2, randomColor());
      particles.push(newParticle);
    }

    let raf: number | null = null;
    function init() {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((particle) => {
        particle.update();
      });

      raf = window.requestAnimationFrame(init);
    }

    init();
    return () => {
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
    };
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ backgroundColor: '#181D31' }}
      onMouseMove={handleMouseMove}
    ></canvas>
  );
};

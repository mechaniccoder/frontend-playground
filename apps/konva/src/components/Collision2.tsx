import { useEffect, useRef } from 'react';
import { useRandomColor } from '../hooks/useRandomColor';
import { Particle } from '../utils/shape';

export const Collision2 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const randomColor = useRandomColor();

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const particles: Particle[] = [];
      for (let i = 0; i < 400; i++) {
        const radius = 10;
        let x = getRandomX(radius);
        let y = getRandomY(radius);

        particles.push(new Particle(ctx, x, y, radius, randomColor()));
      }

      function init() {
        ctx?.clearRect(0, 0, window.innerWidth, window.innerHeight);
        particles.forEach((particle) => particle.update(particles));
        requestAnimationFrame(init);
      }

      init();
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ backgroundColor: 'black', width: innerWidth, height: innerHeight }}
      id="collision-canvas"
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

const getRandomX = (radius: number) => radius + Math.random() * (window.innerWidth - radius * 2);
const getRandomY = (radius: number) => radius + Math.random() * (window.innerHeight - radius * 2);

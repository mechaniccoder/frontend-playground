import { useEffect, useRef } from 'react';
import { useRandomColor } from '../hooks/useRandomColor';
import { getDistance } from '../utils/math';
import { Circle } from '../utils/shape';

export const Collision: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const randomColor = useRandomColor();
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    function handleMouseMove() {
      window.addEventListener('mousemove', (e) => {
        mousePos.current.x = e.clientX;
        mousePos.current.y = e.clientY;
      });
    }

    handleMouseMove();

    const circle1 = new Circle(ctx, 200, 200, 30, randomColor());
    const circle2 = new Circle(ctx, 300, 300, 30, randomColor());

    function init() {
      ctx?.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (
        getDistance(circle1.x, circle1.y, circle2.x, circle2.y) <=
        circle1.radius + circle2.radius
      ) {
        circle1.color = 'red';
        circle2.color = 'red';
      } else {
        circle1.color = 'blue';
        circle2.color = 'blue';
      }

      circle2.x = mousePos.current.x;
      circle2.y = mousePos.current.y;

      circle1.update();
      circle2.update();
      requestAnimationFrame(init);
    }
    init();
  }, []);

  return (
    <canvas
      id="collision-canvas"
      ref={canvasRef}
      style={{ backgroundColor: 'black' }}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

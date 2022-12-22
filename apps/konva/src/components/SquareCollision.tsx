import { useEffect, useRef, useState } from 'react';

export const SquareCollision = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const getCtx = () => {
    if (!canvasRef.current) throw new Error('Canvas not found');
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) throw new Error('Context not found');
    return ctx;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = getCtx();

    const blueRectX = 500;
    const blueRectY = 500;
    const blueRectWidth = 100;
    const blueRectHeight = 100;

    const redRectSize = 100;

    let raf: number | null = null;

    function init() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (
        squareCollision(
          mousePos.x,
          mousePos.y,
          redRectSize,
          redRectSize,
          blueRectX,
          blueRectY,
          blueRectWidth,
          blueRectHeight,
        )
      ) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(mousePos.x, mousePos.y, redRectSize, redRectSize);
      } else {
        ctx.fillStyle = 'red';
        ctx.fillRect(mousePos.x, mousePos.y, redRectSize, redRectSize);
      }
      ctx.fillStyle = 'blue';
      ctx.fillRect(blueRectX, blueRectY, blueRectWidth, blueRectHeight);
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
      id="square-collision-canvas"
      ref={canvasRef}
      style={{ backgroundColor: '#181D31' }}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseMove={handleMouseMove}
    />
  );
};

function squareCollision(
  square1X: number,
  square1Y: number,
  square1Width: number,
  square1Height: number,
  square2X: number,
  square2Y: number,
  square2Width: number,
  square2Height: number,
) {
  return (
    square1X + square1Width >= square2X &&
    square1X <= square2X + square2Width &&
    square1Y + square1Height >= square2Y &&
    square1Y <= square2Y + square2Height
  );
}

import { useEffect, useRef } from 'react';
import { Layer, Rect, Stage } from 'react-konva';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillRect(0, 0, 150, 150); // Draw a rectangle with default settings
    ctx.save(); // Save the default state

    ctx.fillStyle = '#09F'; // Make changes to the settings
    ctx.fillRect(15, 15, 120, 120); // Draw a rectangle with new settings

    ctx.save(); // Save the current state
    ctx.fillStyle = '#FFF'; // Make changes to the settings
    ctx.globalAlpha = 0.5;
    ctx.fillRect(30, 30, 90, 90); // Draw a rectangle with new settings

    ctx.restore(); // Restore previous state
    ctx.fillRect(45, 45, 60, 60); // Draw a rectangle with restored settings

    ctx.restore(); // Restore original state
    ctx.fillRect(60, 60, 30, 30); // Draw a rectangle with restored settings
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} className="App">
      <Stage
        style={{ backgroundColor: '#404258' }}
        width={window.innerWidth}
        height={window.innerHeight / 2}
      >
        <Layer>
          <Rect x={100} y={100} width={200} height={200} fill="red" draggable></Rect>
          <Rect x={150} y={150} opacity={0.5} width={200} height={200} fill="red" draggable></Rect>
        </Layer>
      </Stage>

      <canvas
        ref={canvasRef}
        style={{ backgroundColor: '#6B728E' }}
        width={window.innerWidth * window.devicePixelRatio}
        height={(window.innerHeight / 2) * window.devicePixelRatio}
      >
        canvas is not supported
      </canvas>
    </div>
  );
}

export default App;

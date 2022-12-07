import { useEffect, useRef } from 'react';
import { Layer, Rect, Stage } from 'react-konva';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.quadraticCurveTo(25, 25, 25, 62.5);
    ctx.stroke();
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

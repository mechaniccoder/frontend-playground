import { KonvaEventObject } from 'konva/lib/Node';
import { Layer, Rect, Stage } from 'react-konva';

export const Step = () => {
  const STEP = 5;

  const handleDragMove = (evt: KonvaEventObject<DragEvent>) => {
    const x = evt.target.x();
    console.log(x, Math.round(x / STEP));

    evt.target.x(Math.round(x / STEP) * STEP);
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect width={100} height={100} fill="red" draggable onDragMove={handleDragMove} />
      </Layer>
    </Stage>
  );
};

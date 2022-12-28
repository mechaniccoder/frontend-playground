import * as Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useRef } from 'react';
import { Circle, Layer, Rect, Stage } from 'react-konva';

const NUMBER = 200;

export const CanvasScrollJustMake = () => {
  const WIDTH = 3000;
  const HEIGHT = 3000;

  return (
    <div style={{ overflow: 'auto', width: '100vw', height: '100vh' }}>
      <Stage width={WIDTH} height={HEIGHT}>
        <Layer>
          {[...Array(NUMBER).fill(0)].map((_, i) => (
            <Circle
              x={Math.random() * WIDTH}
              y={Math.random() * HEIGHT}
              fill="red"
              stroke="black"
              radius={50}
            ></Circle>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export const CanvasScrollStageDraggable = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return (
    <div style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}>
      <Stage width={width} height={height} draggable>
        <Layer>
          {[...Array(NUMBER).fill(0)].map((_, i) => (
            <Circle
              x={Math.random() * 3000}
              y={Math.random() * 3000}
              fill="red"
              stroke="black"
              radius={50}
            ></Circle>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export const CanvasScrollEmulateScroll = () => {
  const stageWidth = window.innerWidth;
  const stageHeight = window.innerHeight;
  const WIDTH = 3000;
  const HEIGHT = 3000;
  const PADDING = 5;
  const layerRef = useRef<Konva.default.Layer>(null);

  const handleDragMoveVerticalScroll = (evt: KonvaEventObject<DragEvent>) => {
    const availableHeight = stageHeight - evt.target.height() - PADDING * 2;
    const delta = (evt.target.y() - PADDING) / availableHeight;
    evt.target.getLayer();
    const layer = layerRef.current;
    if (!layer) return;
    layer.y(-delta * (HEIGHT - stageHeight));
  };

  const handleDragMoveHorizontalScroll = (evt: KonvaEventObject<DragEvent>) => {
    const availableWidth = stageWidth - evt.target.width() - PADDING * 2;
    const delta = (evt.target.x() - PADDING) / availableWidth;
    const layer = layerRef.current;
    if (!layer) return;
    const scrollAvailableWidth = WIDTH - stageWidth;
    layer.x(scrollAvailableWidth * -delta);
  };

  return (
    <div style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}>
      <Stage width={stageWidth} height={stageHeight}>
        <Layer ref={layerRef}>
          {[...Array(NUMBER).fill(0)].map((_, i) => (
            <Circle
              x={Math.random() * WIDTH}
              y={Math.random() * HEIGHT}
              fill="red"
              stroke="black"
              radius={50}
            ></Circle>
          ))}
        </Layer>
        <Layer>
          {/* vertical scroll */}
          <Rect
            x={stageWidth - 10 - PADDING}
            y={PADDING}
            width={10}
            height={100}
            fill="gray"
            opacity={0.8}
            draggable
            dragBoundFunc={(pos) => {
              return {
                x: stageWidth - 10 - PADDING,
                y: Math.max(Math.min(pos.y, stageHeight - 100 - PADDING), PADDING),
              };
            }}
            onDragMove={handleDragMoveVerticalScroll}
          />

          {/* horizontal scroll */}
          <Rect
            x={PADDING}
            y={stageHeight - 10 - PADDING}
            width={100}
            height={10}
            fill="gray"
            opacity={0.8}
            draggable
            dragBoundFunc={(pos) => {
              return {
                x: Math.max(PADDING, Math.min(pos.x, stageWidth - PADDING - 100)),
                y: stageHeight - 10 - PADDING,
              };
            }}
            onDragMove={handleDragMoveHorizontalScroll}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export const CanvasScrollEmulateWithTransform = () => {
  const WIDTH = 3000;
  const HEIGHT = 3000;
  const PADDING = 500;
  const stageRef = useRef<Konva.default.Stage>(null);

  return (
    <div
      id="scroll-container"
      style={{
        overflow: 'auto',
        width: '100vw',
        height: '100vh',
        border: '1px solid grey',
      }}
      onScroll={(evt) => {
        const evtTarget = evt.target as HTMLDivElement;
        const dx = evtTarget.scrollLeft - PADDING;
        const dy = evtTarget.scrollTop - PADDING;
        if (!stageRef.current) return;
        stageRef.current.container().style.transform = `translate(${dx}px, ${dy}px)`;
        stageRef.current.x(-dx);
        stageRef.current.y(-dy);
      }}
    >
      <div id="large-container" style={{ width: WIDTH, height: HEIGHT, overflow: 'hidden' }}>
        <Stage
          ref={stageRef}
          width={window.innerWidth + PADDING * 2}
          height={window.innerHeight + PADDING * 2}
        >
          <Layer>
            <Rect width={100} height={100} fill="blue" />
            <Rect y={window.innerHeight + 2 * PADDING - 100} width={100} height={100} fill="blue" />
            {[...Array(NUMBER).fill(0)].map((_, i) => (
              <Circle
                key={i}
                x={Math.random() * WIDTH}
                y={Math.random() * HEIGHT}
                fill="red"
                stroke="black"
                radius={50}
              ></Circle>
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

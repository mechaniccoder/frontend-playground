import { Layer, Stage } from 'react-konva';

function App() {
  return (
    <div className="App">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer></Layer>
      </Stage>
    </div>
  );
}

export default App;

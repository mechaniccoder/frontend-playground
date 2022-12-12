import { Suspense, useState } from 'react';
import './App.css';
import Todos from './Todos';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Suspense testing for SPA</h1>
      <button onClick={() => console.log('click')}>is it ok with click event?</button>
      <Suspense fallback={<div>loading...</div>}>
        <Todos />
      </Suspense>
    </div>
  );
}

export default App;

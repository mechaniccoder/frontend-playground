'use client';

import { Suspense } from 'react';
import Todos from '../Todos';

export default function Home() {
  return (
    <div>
      <h1>home page</h1>
      <Suspense fallback={<div>loading...</div>}>
        <Todos />
      </Suspense>
    </div>
  );
}

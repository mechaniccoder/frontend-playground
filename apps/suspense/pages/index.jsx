import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Todos = dynamic(() => import('../Todos'), {
  suspense: true,
});

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

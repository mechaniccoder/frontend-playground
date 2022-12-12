'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Layout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <html>
        <body>
          <h1>Testing suspense for Next.js 13</h1>
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}

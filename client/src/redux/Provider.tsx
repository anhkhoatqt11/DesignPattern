'use client';

import { getStore } from '@/redux/store';
import { Provider } from 'react-redux';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={getStore()}>
      {children}
    </Provider>
  );
}

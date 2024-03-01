import { store } from '@/store/index.ts';
import { stateStr } from '@/store/premade-states/emptyState.ts';
import { decompressState } from '@/utils/decompressState.ts';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';

// const result = compressState(state);
// console.log(result);
// console.log(byteLength(result));
// console.log(byteLength(JSON.stringify(state)));

const decompressed = decompressState(stateStr);
console.log(decompressed);

function byteLength(str: string) {
  return new Blob([str]).size;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

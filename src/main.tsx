import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const manifestUrl =
  'https://alefmanvladimir.github.io/my-twa/tonconnect-manifest.json';

createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>,
);

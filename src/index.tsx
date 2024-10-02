import ReactDOM from 'react-dom/client';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const manifestUrl =
  'https://alefmanvladimir.github.io/my-twa/tonconnect-manifest.json';

root.render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>,
);

import {
  TonConnectButton,
  useTonConnectUI,
  useTonAddress,
} from '@tonconnect/ui-react';
import { handleSendTon } from './payments/sendTon';
import { handleSendUsdt } from './payments/sendUsdt';
import { handleSendNot } from './payments/sendNot';
import './App.css';

const App: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);

  return (
    <div className="container">
      <TonConnectButton />
      <br />
      <div>
        <span>User-friendly address: {userFriendlyAddress}</span>
        <br />
        <span>Raw address: {rawAddress}</span>
      </div>
      <br />
      <div className="button-group">
        <button onClick={() => handleSendTon(tonConnectUI)}>Send TON</button>
        <button
          onClick={() => handleSendUsdt(tonConnectUI, userFriendlyAddress)}
        >
          Send USDT
        </button>
        <button
          onClick={() => handleSendNot(tonConnectUI, userFriendlyAddress)}
        >
          Send NOT
        </button>
      </div>
    </div>
  );
};

export default App;

import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';
import { handleSendTon } from '../../payments/sendTon';
import { handleSendUsdt } from '../../payments/sendUsdt';
import { handleSendNot } from '../../payments/sendNot';
import './ActionButtons.css';

const ActionButtons: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();

  return (
    <div className="button-group">
      <button onClick={() => handleSendTon(tonConnectUI)}>Send TON</button>
      <button onClick={() => handleSendUsdt(tonConnectUI, userFriendlyAddress)}>
        Send USDT
      </button>
      <button onClick={() => handleSendNot(tonConnectUI, userFriendlyAddress)}>
        Send NOT
      </button>
    </div>
  );
};

export default ActionButtons;

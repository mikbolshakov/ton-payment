import { FC } from 'react';
import {
  TonConnectButton,
  useTonConnectUI,
  useTonAddress,
} from '@tonconnect/ui-react';
import { toNano, beginCell, Address } from 'ton';
import './App.css';

const TX_VALID_UNTIL = Math.floor(Date.now() / 1000) + 600; // 10 min
const USDT_AMOUNT = 0.05 * 1_000_000; // Almost all jettons has 9, but USDT has 6.
const TON_AMOUNT = toNano('0.02'); // amount * 10^9
const TON_FEE = toNano('0.04');
// https://tonviewer.com/EQAHB6A37kBtNtLEoxT_AoOVhq5iqcT82SvTLfHbDz80KUH9/jetton/EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs
const USDT_WALLET_ADDRESS = 'EQCIBgi5CmSj9lIoUxFndt6em2MEBMmKebj0y4DvmifhGrN4';
const RECEIVER_ADDRESS = Address.parse(
  'UQBZyf9W-SMRW818366UldL3yxXrklo_GgzI1H_zCnvtCw1_',
);

const App: FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const senderAddress = Address.parse(userFriendlyAddress || '');

  const forwardPayload = beginCell()
    .storeUint(0, 32) // 0 opcode means we have a comment
    .storeStringTail('Pass payment!')
    .endCell();

  const messageBody = beginCell()
    .storeUint(0xf8a7ea5, 32) // opcode for jetton transfer
    .storeUint(0, 64) // query id
    .storeCoins(USDT_AMOUNT)
    .storeAddress(RECEIVER_ADDRESS)
    .storeAddress(senderAddress) // response destination
    .storeBit(0) // no custom payload
    .storeCoins(toNano('0.01')) // forward amount - if >0, will send notification message
    .storeBit(1) // we store forwardPayload as a reference
    .storeRef(forwardPayload)
    .endCell();

  const tonTransaction = {
    validUntil: TX_VALID_UNTIL,
    messages: [
      {
        address: RECEIVER_ADDRESS.toString(),
        amount: TON_AMOUNT.toString(),
      },
    ],
  };

  const usdtTransaction = {
    validUntil: TX_VALID_UNTIL,
    messages: [
      {
        address: USDT_WALLET_ADDRESS.toString(),
        amount: TON_FEE.toString(),
        payload: messageBody.toBoc().toString('base64'),
      },
    ],
  };

  const handleSendTon = async () => {
    try {
      await tonConnectUI.sendTransaction(tonTransaction);
      console.log('TON payment sent successfully');
    } catch (error) {
      console.error('Error sending TON transaction:', error);
    }
  };

  const handleSendUsdt = async () => {
    try {
      await tonConnectUI.sendTransaction(usdtTransaction);
      console.log('USDT payment sent successfully');
    } catch (error) {
      console.error('Error sending USDT transaction:', error);
    }
  };

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
        <button onClick={handleSendTon}>Send TON</button>
        <button onClick={handleSendUsdt}>Send USDT</button>
      </div>
    </div>
  );
};

export default App;

import React from 'react';
import {
  TonConnectButton,
  useTonConnectUI,
  useTonAddress,
} from '@tonconnect/ui-react';
import { toNano, beginCell, Address } from 'ton';
// import { Address, toNano, beginCell } from "ton-core";
// import { Address, toNano, beginCell } from '@ton/ton'
import './App.css';

const TX_VALID_UNTIL = Math.floor(Date.now() / 1000) + 600; // 10 min
const depositAmount = 0.7;
const usdtAddress = 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs';
const receiverAddress = 'UQAHB6A37kBtNtLEoxT_AoOVhq5iqcT82SvTLfHbDz80KRw4';

const body = beginCell()
  .storeUint(0xf8a7ea5, 32) // Operation: transfer
  .storeUint(0, 64) // queryId
  .storeCoins(toNano(depositAmount)) // deposit amount
  .storeAddress(Address.parse(receiverAddress)) // Receiver address
  .storeAddress(Address.parse(receiverAddress)) // Response address
  .storeMaybeRef(null) // custom payload (none)
  .storeCoins(toNano('0.05')) // forward ton amount
  .storeMaybeRef(beginCell().storeStringTail('something').endCell()) // Forward payload for smart contracts
  .endCell();

const tonTransaction = {
  validUntil: TX_VALID_UNTIL,
  messages: [
    {
      address: receiverAddress,
      amount: (0.2 * 1e9).toString(),
    },
  ],
};

const usdtTransaction = {
  validUntil: TX_VALID_UNTIL,
  messages: [
    {
      address: usdtAddress.toString(),
      amount: toNano(0.1).toString(), // Fee
      payload: body.toBoc().toString('base64'),
    },
  ],
};

const App: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);

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

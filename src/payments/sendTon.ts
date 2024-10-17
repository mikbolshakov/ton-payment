import {
  getTxValidUntil,
  RECEIVER_ADDRESS,
  TON_AMOUNT,
} from '../utils/transactionConfig';
import { beginCell } from 'ton';
import { v4 as uuidv4 } from 'uuid';

export const handleSendTon = async (tonConnectUI: any) => {
  const uniqueHash = uuidv4();

  const body = beginCell()
    .storeUint(0, 32)
    .storeStringTail(`TON Pass payment! - ${uniqueHash}`)
    .endCell();

  const tonTransaction = {
    validUntil: getTxValidUntil(),
    messages: [
      {
        address: RECEIVER_ADDRESS.toString(),
        amount: TON_AMOUNT.toString(),
        payload: body.toBoc().toString('base64'),
      },
    ],
  };

  try {
    await tonConnectUI.sendTransaction(tonTransaction);
    console.log('TON payment sent successfully');
  } catch (error) {
    console.error('Error sending TON transaction:', error);
  }
};

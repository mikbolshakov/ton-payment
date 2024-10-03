import { getTxValidUntil, RECEIVER_ADDRESS } from '../utils/transactionConfig';
import { TON_AMOUNT } from '../utils/transactionConfig';

export const handleSendTon = async (tonConnectUI: any) => {
  const tonTransaction = {
    validUntil: getTxValidUntil(),
    messages: [
      {
        address: RECEIVER_ADDRESS.toString(),
        amount: TON_AMOUNT.toString(),
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

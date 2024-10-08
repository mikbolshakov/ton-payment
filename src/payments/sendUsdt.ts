import { toNano, beginCell, Address } from 'ton';
import { getJettonWalletAddress } from '../utils/getJettonWalletAddress';
import {
  RECEIVER_ADDRESS,
  getTxValidUntil,
  USDT_AMOUNT,
  TON_FEE,
  USDT_MASTER_ADDRESS,
} from '../utils/transactionConfig';

export const handleSendUsdt = async (
  tonConnectUI: any,
  userFriendlyAddress: string | null,
) => {
  if (!userFriendlyAddress) {
    console.error('User address is not available');
    return;
  }

  const forwardPayload = beginCell()
    .storeUint(0, 32) // 0 opcode means we have a comment
    .storeStringTail('Pass payment!')
    .endCell();

  const usdtMessageBody = beginCell()
    .storeUint(0xf8a7ea5, 32) // opcode for jetton transfer
    .storeUint(0, 64) // query id
    .storeCoins(USDT_AMOUNT)
    .storeAddress(RECEIVER_ADDRESS)
    .storeAddress(Address.parse(userFriendlyAddress)) // response destination
    .storeBit(0) // no custom payload
    .storeCoins(toNano('0.01')) // forward amount - if >0, will send notification message
    .storeBit(1) // we store forwardPayload as a reference
    .storeRef(forwardPayload)
    .endCell();

  let jettonWalletAddress;
  let jettonBalance;
  if (userFriendlyAddress) {
    const result = await getJettonWalletAddress(
      userFriendlyAddress,
      USDT_MASTER_ADDRESS,
    );
    jettonWalletAddress = result.walletAddress;
    jettonBalance = result.balance;
  }

  if (!jettonBalance || jettonBalance < USDT_AMOUNT) {
    alert('Insufficient funds');
    return;
  }

  if (!jettonWalletAddress) {
    alert('Jetton Wallet Address is not available');
    return;
  }

  const usdtTransaction = {
    validUntil: getTxValidUntil(),
    messages: [
      {
        address: jettonWalletAddress.toString(),
        amount: TON_FEE.toString(),
        payload: usdtMessageBody.toBoc().toString('base64'),
      },
    ],
  };

  try {
    await tonConnectUI.sendTransaction(usdtTransaction);
    console.log('USDT payment sent successfully');
  } catch (error) {
    console.error('Error sending USDT transaction:', error);
  }
};

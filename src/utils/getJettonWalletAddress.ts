import TonWeb from 'tonweb';

const tonweb = new TonWeb();

// get jetton wallet from jetton master
export const getJettonWalletAddress = async (
  ownerAddress: string,
  masterAddress: string,
): Promise<{ walletAddress: string | null; balance: number }> => {
  try {
    const jettonMinter = new TonWeb.token.jetton.JettonMinter(tonweb.provider, {
      address: masterAddress,
      adminAddress: new TonWeb.utils.Address(masterAddress),
      jettonContentUri: '',
      jettonWalletCodeHex: '...',
    });
    const walletAddress = await jettonMinter.getJettonWalletAddress(
      new TonWeb.utils.Address(ownerAddress),
    );

    const jettonWallet = new TonWeb.token.jetton.JettonWallet(tonweb.provider, {
      address: walletAddress,
    });

    const data = await jettonWallet.getData();
    const balance = data.balance;

    return {
      walletAddress: walletAddress.toString(),
      balance: parseInt(balance, 10),
    };
  } catch (error) {
    console.error('Error fetching Jetton Wallet Address:', error);
    return { walletAddress: null, balance: 0 };
  }
};

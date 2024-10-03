import TonWeb from 'tonweb';

const tonweb = new TonWeb();

// get jetton wallet from jetton master
export const getJettonWalletAddress = async (
  ownerAddress: string,
  masterAddress: string,
): Promise<string | null> => {
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
    return walletAddress.toString();
  } catch (error) {
    console.error('Error fetching Jetton Wallet Address:', error);
    return null;
  }
};

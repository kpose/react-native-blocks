import {useCallback, useEffect, useState} from 'react';
import WalletConnectProvider from '@walletconnect/web3-provider';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {ethers} from 'ethers';

interface IContractInterface {
  infuraId: string;
  provider?: any;
  contractAddress: string;
  contractAbi: any;
}

const useContract = ({
  infuraId,
  provider,
  contractAbi,
  contractAddress,
}: IContractInterface) => {
  const connector = useWalletConnect();
  const [contract, setContract] = useState<any>();
  const [signer, setSigner] = useState<any>();

  const initialize = useCallback(async () => {
    if (!connector || !connector.connected) {
      return;
    }
    const wcProvider = new WalletConnectProvider({
      infuraId: infuraId,
      connector: connector,
      chainId: 4,
      qrcode: false,
    });
    await wcProvider.enable();

    const ethers_provider = new ethers.providers.Web3Provider(
      provider || wcProvider,
    );
    const etcontract = new ethers.Contract(
      contractAddress,
      contractAbi,
      ethers_provider.getSigner(),
    );
    const contractSigner = ethers_provider.getSigner();

    setContract(etcontract);
    setSigner(contractSigner);
  }, [connector, contractAbi, contractAddress, infuraId, provider]);

  useEffect(() => {
    if (!connector || !connector.connected) {
      return;
    }
    initialize();
  }, [initialize, connector]);

  return [contract, signer];
};

export default useContract;

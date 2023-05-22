import initiateContractTransaction from './initiateContractTransaction';
import { SingleSwapTokenAbi } from './SingleSwapTokenAbi';
import getweb3Provider from './web3Provider';
import { DEFAULT_NETWORK } from './constants';
import { getNetworkConfigured } from '.';
import { fromTokenWei, toWei, sleep } from './utility';
import { addSwapValues } from '../../components/common/redux/Approval';
import { addSwapAmount } from '../../components/common/redux/SmartContract';
import { updateTransaction } from '../../components/transactionHistory/redux';
import { parseAmountForTransaction } from '../../utils';

const singleSwapCurrency = async ({
  walletAccountStore,
  walletselect,
  address,
  amount,
  tokenFrom,
  tokenTo,
  web3Object,
  tokenFromDecimals,
  dispatch,
  transactionId,
}) => {
  const web3 =
    web3Object ||
    getweb3Provider({
      walletselect,
      walletAccountStore,
      blockchainNetwork: DEFAULT_NETWORK,
    });

  const networkConfig = getNetworkConfigured({
    blockchainNetwork: DEFAULT_NETWORK,
  });

  const SingleSwapTokenAddress = networkConfig.SINGLE_SWAP_CONTRACT_ADDRESS;

  const smartContract = await new web3.eth.Contract(
    SingleSwapTokenAbi,
    SingleSwapTokenAddress
  );

  const swapExactInputSingle = smartContract.methods.swapExactInputSingle(
    networkConfig[tokenFrom],
    networkConfig[tokenTo],
    toWei({ web3, amount, decimals: tokenFromDecimals })
  );

  const result = await initiateContractTransaction({
    web3,
    contractFunction: swapExactInputSingle,
    contractAddress: SingleSwapTokenAddress,
    address,
    tokenFromDecimals,
  });

  await sleep(10000);

  const subscription = await smartContract.events.SwapExactInputSingleEvent({
    fromBlock: result.blockNumber,
  });

  subscription.on('data', (event) => {
    const amountOut = event?.returnValues?.amountOut;
    const convertedAmount = fromTokenWei(tokenFrom, amountOut);

    dispatch(addSwapAmount(convertedAmount));
    dispatch(
      updateTransaction({
        id: transactionId,
        transactionHash: result?.transactionHash,
        transactionResponse: result,
        toAmount: parseAmountForTransaction(convertedAmount, 6),
      })
    );
  });

  if (result && result.status && result.transactionHash) {
    dispatch(addSwapValues(result.status));
  }
  return result;
};

export default singleSwapCurrency;

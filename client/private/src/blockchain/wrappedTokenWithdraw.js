import initiateContractTransaction from './initiateContractTransaction';
// import getweb3Provider from './web3Provider';
// import { DEFAULT_NETWORK, NATIVE_CURRENCY } from './constants';
// import { getNetworkConfigured } from '.';
import { useDispatch, useSelector } from 'react-redux';
// import { REciptDataSent } from './actions';

// import { addSwapValues } from '../../components/common/redux/Approval';
import CONSULTATION_ABI from './VACCINE_ABI';
let networks;
const wrappedTokenWithdraw = async ({
  // walletselect,
  address,
  netVer,
  // accountNumber,
  web3,
  // amount,
  // tokenDecimals,
  // netVer,
  dispatch,
}) => {
  const tokenAddress = '0x4d0551B69a0C90f29FCDb081331FE1527981a73f';

  // function getNetworkName(netVer) {
  //   networks = {
  //     1: 'Ethereum',
  //     56: 'Binance SC',
  //     137: 'Polygon',
  //     43114: 'Avalanche',
  //     //Testnets:
  //     3: 'Ropsten',
  //     4: 'Rinkeby',
  //     5: 'Goerli',
  //     42: 'Kovan',
  //     97: 'BSC Testnet',
  //     80001: 'Mumbai',
  //     11155111: 'Sepolia',
  //   };
  //   return networks[netVer];
  // }

  // const { default: abi } = await CONSULTATION_ABI;
  if (netVer === 80001) {
    const smartContract = await new web3.eth.Contract(
      CONSULTATION_ABI,
      tokenAddress
    );

    const patientName = web3.utils.padRight(
      web3.utils.fromAscii('Kevin'),
      64
    );
    const patientUUID = web3.utils.padRight(web3.utils.fromAscii('123'), 64);
    const patientRegId = web3.utils.padRight(web3.utils.fromAscii('123'), 64);
    const vaccineName = web3.utils.padRight(
      web3.utils.fromAscii('Covaccine'),
      64
    );
    const vaccineTakenDatetime = 1684384172;
    const disease = web3.utils.padRight(web3.utils.fromAscii('Corona'), 64);
    const antigen = web3.utils.padRight(web3.utils.fromAscii('Covaccine'), 64);
    const issuerName = web3.utils.padRight(
      web3.utils.fromAscii('Rahul Kumar'),
      64
    );
    const issuerId = web3.utils.padRight(web3.utils.fromAscii('123'), 64);
    const issuedDateTime = 1684384172;

    console.log('first', {
      patientName,
      patientUUID,
      patientRegId,
      vaccineName,
      vaccineTakenDatetime,
      disease,
      antigen,
      issuerName,
      issuerId,
      issuedDateTime,
    });

    const createCertificationFunction =
      smartContract.methods.createCertification(
        patientName,
        patientUUID,
        patientRegId,
        vaccineName,
        vaccineTakenDatetime,
        disease,
        antigen,
        issuerName,
        issuerId,
        issuedDateTime
      );

    const result = await initiateContractTransaction({
      web3,
      contractFunction: createCertificationFunction,
      contractAddress: tokenAddress,
      address,
      tokenDecimals: 18,
      amountValue: 0,
    });

    if (result) {
      // dispatch(REciptDataSent({ transactionHash: result?.transactionHash }));
      console.log('result', result);
      return result;
    }
  } else {
    console.log('netVer', netVer);
    alert('Mumbai Network Only Supported');
  }
};

export default wrappedTokenWithdraw;

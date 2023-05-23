import initiateContractTransaction from './initiateContractTransaction';
// import getweb3Provider from './web3Provider';
// import { DEFAULT_NETWORK, NATIVE_CURRENCY } from './constants';
// import { getNetworkConfigured } from '.';
import { useDispatch, useSelector } from 'react-redux';
// import { REciptDataSent } from './actions';

// import { addSwapValues } from '../../components/common/redux/Approval';
import CONSULTATION_ABI from './WMATIC_ABI';
let networks;
const wrappedTokenDeposit = async ({
  // walletselect,
  address,
  // accountNumber,
  web3,
  // amount,
  // tokenDecimals,
  // netVer,
  dispatch,
}) => {
  // const web3 = getweb3Provider({
  //   walletselect,
  //   blockchainNetwork: DEFAULT_NETWORK,
  // });

  // const networkConfig = getNetworkConfigured({
  //   blockchainNetwork: DEFAULT_NETWORK,
  // });

  // const wrapped = NATIVE_CURRENCY[DEFAULT_NETWORK].WRAPPED;
  // const wrappedAbi = wrapped + '_ABI';
  // const tokenAddress = networkConfig[NATIVE_CURRENCY[DEFAULT_NETWORK].WRAPPED];
  const tokenAddress = '0xAAC09Ce8287BF76a6ab7F87924E0FA9EB035D17c';

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
  // if (networks === 80001) {
  const smartContract = await new web3.eth.Contract(
    CONSULTATION_ABI,
    tokenAddress
  );

  const patientName = web3.utils.padRight(
    web3.utils.fromAscii('Admin '),
    64
  );
  const patientUUID = web3.utils.padRight(web3.utils.fromAscii('123'), 64);
  const patientRegId = web3.utils.padRight(web3.utils.fromAscii('123'), 64);
  const doctorName = web3.utils.padRight(
    web3.utils.fromAscii('Kevin Jacob'),
    64
  );
  const consultationTime = 1684384172;
  const departmentName = web3.utils.padRight(
    web3.utils.fromAscii('Cardiology'),
    64
  );
  const hospitalName = web3.utils.padRight(web3.utils.fromAscii('SK'), 64);
  const issuerName = web3.utils.padRight(
    web3.utils.fromAscii('Kevin Babu'),
    64
  );
  const issuerId = web3.utils.padRight(web3.utils.fromAscii('123'), 64);
  const issuedDateTime = 1684384172;

  console.log('first', {
    patientName,
    patientUUID,
    patientRegId,
    doctorName,
    consultationTime,
    departmentName,
    hospitalName,
    issuerName,
    issuerId,
    issuedDateTime,
  });

  const createCertificationFunction = smartContract.methods.createCertification(
    patientName,
    patientUUID,
    patientRegId,
    doctorName,
    consultationTime,
    departmentName,
    hospitalName,
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

  console.log(
    'toAscii',
    JSON.stringify(
      web3.utils.toAscii(
        '0x43617264696f6c6f677900000000000000000000000000000000000000000000'
      )
    )
  );
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  await sleep(10000);

  const subscription = await smartContract.events.CertificationEvent({
    fromBlock: result.blockNumber,
  });

  subscription.on('data', (event) => {
    // const amountOut = event?.returnValues?.amountOut;
    console.log('event', event.returnValues);
  });

  const resultofverification = await smartContract.methods
    .verifyCertificateByPatientUUID(patientUUID)
    .call();
  console.log(
    'resultofverification',
    web3.utils.hexToUtf8(resultofverification.departmentName)
  );
  // const certificatebyUuid =
  //   smartContract.methods.verifyCertificateByPatientUUID(
  //     '0x3132330000000000000000000000000000000000000000000000000000000000'
  //   );

  // console.log('certificateEvent', certificateEvent);
  // const certificateByuuid = await initiateContractTransaction({
  //   web3,
  //   contractFunction: certificatebyUuid,
  //   contractAddress: tokenAddress,
  //   address,
  //   tokenDecimals: 18,
  //   amountValue: 0,
  // });
  // const CertificationFunction = smartContract.methods.certifications(1);
  // const resultgff = await initiateContractTransaction({
  //   web3,
  //   contractFunction: CertificationFunction,
  //   contractAddress: tokenAddress,
  //   address,
  //   tokenDecimals: 18,
  // });
  // console.log('result', result);
  // console.log('resultgff', resultgff);
  // console.log('CertificationFunction', CertificationFunction);

  // console.log('certificateByuuid', certificateByuuid);
  if (result) {
    // dispatch(REciptDataSent({ transactionHash: result?.transactionHash }));
    console.log('result', result);
  }

  // }
  // alert('Mumbai Network Only Supported');

  // if (result && result.status && result.transactionHash) {
  //   dispatch(addSwapValues(result.status));
  // }
  // return result;
};

export default wrappedTokenDeposit;

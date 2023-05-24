import { VACCINATION_ADDRESS } from '../config';
import VACCINATION_ABI from './VACCINE_ABI';

const certificateVerificationFunction = async ({ web3, certificateNumber }) => {
  const tokenAddress = VACCINATION_ADDRESS;

  try {
    const smartContract = await new web3.eth.Contract(
      VACCINATION_ABI,
      tokenAddress
    );

    return await smartContract.methods
      .verifyCertificateByCertificate(certificateNumber)
      .call();
  } catch (err) {
    throw new Error(err.message);
  }
};

export default certificateVerificationFunction;

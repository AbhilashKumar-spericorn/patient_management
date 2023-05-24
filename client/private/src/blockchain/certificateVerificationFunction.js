import { CONSULTATION_ADDRESS } from '../config';
import CONSULTATION_ABI from './VACCINE_ABI';

const consultationCertificateVerificationFunction = async ({
  web3,
  certificateNumber,
}) => {
  const tokenAddress = CONSULTATION_ADDRESS;

  try {
    const smartContract = await new web3.eth.Contract(
      CONSULTATION_ABI,
      tokenAddress
    );

    return await smartContract.methods
      .verifyCertificateByCertificate(certificateNumber)
      .call();
  } catch (err) {
    throw new Error(err.message);
  }
};

export default consultationCertificateVerificationFunction;

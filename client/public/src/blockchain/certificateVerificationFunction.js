import CONSULTATION_ABI from '../blockchain/WMATIC_ABI' ;

const consultationCertificateVerificationFunction = async ({
  web3,
  certificateNumber,
}) => {
  const tokenAddress = '0xb85987bd100b2B211aD81A785E6a76592Fc29b60';

  try {
    const smartContract = await new web3.eth.Contract(
      CONSULTATION_ABI,
      tokenAddress
    );

    const result = await smartContract.methods
      .verifyCertificateByCertificate(certificateNumber)
      .call();
      
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default consultationCertificateVerificationFunction;

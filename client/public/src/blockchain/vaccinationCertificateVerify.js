
import VACCINATION_ABI from './VACCINE_ABI';

const certificateVerificationFunction = async ({ web3, certificateNumber }) => {
  const tokenAddress = '0x535Ac607e72146218Bc5e7d3b71a37944a77025C';

  try {
    console.log("hi")
    const smartContract = await new web3.eth.Contract(
      VACCINATION_ABI,
      tokenAddress
    );
    console.log(smartContract)

 const result =     await smartContract.methods
      .verifyCertificateByCertificate(certificateNumber)
      .call();
     return result
  } catch (err) {
    throw new Error(err.message);
  }
};

export default certificateVerificationFunction;

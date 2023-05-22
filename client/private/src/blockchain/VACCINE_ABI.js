const vaccineCertificationABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'patientName',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'patientUUID',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'patientRegId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'vaccineName',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'vaccineTakenDatetime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'disease',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'antigen',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'issuerName',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'issuerId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'issuedDateTime',
        type: 'uint256',
      },
    ],
    name: 'CertificationEvent',
    type: 'event',
  },
  {
    inputs: [],
    name: 'certificationCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'certifications',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'patientName',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'patientUUID',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'patientRegId',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'vaccineName',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'vaccineTakenDatetime',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'disease',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'antigen',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'issuerName',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'issuerId',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'issuedDateTime',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'patientName',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'patientUUID',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'patientRegId',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'vaccineName',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'vaccineTakenDatetime',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'disease',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'antigen',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'issuerName',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'issuerId',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'issuedDateTime',
        type: 'uint256',
      },
    ],
    name: 'createCertification',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_patientUUID',
        type: 'bytes32',
      },
    ],
    name: 'verifyCertificateByPatientUUID',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'patientName',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'patientUUID',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'patientRegId',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'vaccineName',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'vaccineTakenDatetime',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'disease',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'antigen',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'issuerName',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'issuerId',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'issuedDateTime',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
export default vaccineCertificationABI;

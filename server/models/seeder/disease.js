const disease = require('../../models/diseases');
require('dotenv').config();
const { connection, connect, set } = require('mongoose');
set('strictQuery', false);

connect(
  'mongodb+srv://abhi246:abhilash10@cluster1.chmeexg.mongodb.net/patient_management',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const createSeedData = async (req, res) => {
  try {
    const diseaseData = [
      {
        diseaseName: 'fever',
      },
      {
        diseaseName: 'vomiting',
      },
    ];

    const existingDoc = await disease.find();
    if (existingDoc >= 0) {
      await disease.insertMany(diseaseData);
      console.log(`Data created successfully`);
    } else {
      console.log(`Data already exists`);
    }
  } catch (error) {
    console.log(error);
  } finally {
    connection.close();
  }
};

createSeedData();

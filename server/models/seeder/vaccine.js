const vaccine = require('../vaccine');
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
    const vaccines = [
      {
        name: 'Moderna',
        disease: 'COVID-19',
        antigen: 'Spike protein of the SARS-CoV-2 virus',
      },
      {
        name: 'Covishield',
        disease: 'Malaria',
        antigen: 'Spike protein',
      },
      {
        name: 'Sputnik',
        disease: 'Influenza',
        antigen: 'Hemagglutinin and neuraminidase proteins',
      },
      {
        name: 'Novavax',
        disease: 'Hepatitis B',
        antigen: 'Hepatitis B surface antigen (HBsAg)',
      },
      {
        name: 'Pfizer-BioNTech',
        disease: 'COVID-19',
        antigen: 'Spike protein of the SARS-CoV-2 virus',
      },
      {
        name: 'AstraZeneca',
        disease: 'COVID-19',
        antigen: 'Spike protein of the SARS-CoV-2 virus',
      },
    ];
    const existingDoc = await vaccine.find();
    if (existingDoc >= 0) {
      await vaccine.insertMany(vaccines);
      console.log(`Vaccine created successfully`);
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

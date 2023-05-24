import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getAllConsultations } from '../Consultations/action';

const ConsultationGraph = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllConsultations());
  }, []);
  const { registeredConsultations } = useSelector((e) => e.hospital);
  const [consultationsData, setConsultationsData] = useState([]);

  
  // Process the consultation data and create month-wise counts
  const processConsultationsData = () => {
    const monthCounts = {};

    registeredConsultations?.forEach((consultation) => {
      const date = new Date(consultation.date);
      const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (monthCounts[month]) {
        monthCounts[month]++;
      } else {
        monthCounts[month] = 1;
      }
    });

    // Create chart dataset
    const chartData = {
      labels: Object.keys(monthCounts),
      datasets: [
        {
          label: 'Consultations',
          data: Object.values(monthCounts),
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };

    return chartData;
  };

  return (
    <div>
      <h2>Consultations Month-wise</h2>
      <Line data={processConsultationsData()} />
    </div>
  );
};

export default ConsultationGraph;

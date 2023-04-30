import React, { useState, useEffect } from 'react';
import { HeatMapCanvas } from '@nivo/heatmap';
import './App.css';
import dataService from '../services/data-service';
import { ChartData } from '../models/Charts';

function App() {
  const [chartData, setChartData] = useState<ChartData>([]);
  useEffect(() => {
    setChartData(dataService.getDataForChart());
  }, []);

  console.log(chartData);
  return (
    <>
      <h1>IMPC Embryo data</h1>
      <HeatMapCanvas
        width={1400}
        height={22000}
        data={chartData}
        margin={{ top: 150, right: 60, bottom: 20, left: 80 }}
        xInnerPadding={0.15}
        yInnerPadding={0.15}
        emptyColor='#EEE'
        colors={{
          type: 'sequential',
          scheme: 'blues',
        }}
        enableLabels={false}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: '',
          legendOffset: 46
        }}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'gene',
          legendPosition: 'middle',
          legendOffset: 40
        }}
        isInteractive={false}
      />
    </>
  );
}

export default App;

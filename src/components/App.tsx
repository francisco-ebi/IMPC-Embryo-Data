import React, { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import Chart from './Chart';
import Filters from './Filters';
import { ChartData } from '../models/Charts';
import './App.css';
import dataService from '../services/data-service';
import useDebounce from '../utils/useDebounce';

function App() {
  const rangeRef = useRef<HTMLInputElement>(null);
  const [chartData, setChartData] = useState<ChartData>([]);
  const [topLevelTerms, setTopLevelTerms] = useState<Array<string>>([]);
  const [geneNames, setGeneNames] = useState<Array<string>>([]);
  const [selectedTerms, setSelectedTerms] = useState<Array<string>>([]);
  const [selectedGenes, setSelectedGenes] = useState<Array<string>>([]);
  const [topAssociation, setTopAssociations ] = useState<number>(90);
  const debouncedTopAssociation = useDebounce<number>(topAssociation, 500);

  useEffect(() => {
    setTopLevelTerms(dataService.getAllTopLevelTerms());
    setGeneNames(dataService.getAllGeneNames());
  }, [])


  useEffect(() => {
    setChartData(dataService.getDataForChart(selectedTerms, selectedGenes));
  }, [selectedTerms, selectedGenes, debouncedTopAssociation]);


  const updateAssociation = () => {
    if (rangeRef.current) {
      const val = parseInt(rangeRef.current.value, 10);
      console.log(val);
      setTopAssociations(val);
    }
  }
  return (
    <>
      <h1>IMPC Embryo data</h1>
      <Container>
          <Filters
            geneNames={geneNames}
            topLevelTerms={topLevelTerms}
            onSelectGene={setSelectedGenes}
            onSelectTerm={setSelectedTerms}
          />
        </Container>
      <Chart chartData={chartData} />
    </>
  );
}

export default App;

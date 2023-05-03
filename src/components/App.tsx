import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Chart from './Chart';
import Filters from './Filters';
import { ChartData } from '../models/Charts';
import './App.css';
import dataService from '../services/data-service';

function App() {
  const [chartData, setChartData] = useState<ChartData>([]);
  const [topLevelTerms, setTopLevelTerms] = useState<Array<string>>([]);
  const [geneNames, setGeneNames] = useState<Array<string>>([]);
  const [selectedTerms, setSelectedTerms] = useState<Array<string>>([]);
  const [selectedGenes, setSelectedGenes] = useState<Array<string>>([]);
  const [topAssociation, setTopAssociations] = useState<number>(90);
  const [counts, setCounts] = useState({ max: 0, min: 0 });

  useEffect(() => {
    setTopLevelTerms(dataService.getAllTopLevelTerms());
    setGeneNames(dataService.getAllGeneNames());
    setCounts(dataService.getMinAndMaxCount());
  }, []);

  useEffect(() => {
    setChartData(
      dataService.getDataForChart(selectedTerms, selectedGenes, topAssociation)
    );
  }, [selectedTerms, selectedGenes, topAssociation]);

  return (
    <>
      <h1>IMPC Embryo data</h1>
      <Container>
          <Filters
            geneNames={geneNames}
            topLevelTerms={topLevelTerms}
            onSelectGene={setSelectedGenes}
            onSelectTerm={setSelectedTerms}
            onChangeAssociation={value => setTopAssociations(value)}
          />
        </Container>
      <Chart chartData={chartData} counts={counts} />
    </>
  );
}

export default App;

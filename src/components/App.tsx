import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Chart from './Chart';
import Filters from './Filters';
import Introduction from './Introduction';
import { ChartData } from '../models/Charts';
import { FilterSelection, FilterData } from '../models/Filters';
import './App.css';
import dataService from '../services/data-service';


function App() {
  const [chartData, setChartData] = useState<ChartData>([]);
  const [topLevelTerms, setTopLevelTerms] = useState<FilterData>([]);
  const [geneNames, setGeneNames] = useState<FilterData>([]);
  const [selectedTerms, setSelectedTerms] = useState<FilterData>([]);
  const [selectedGenes, setSelectedGenes] = useState<FilterData>([]);
  const [topAssociation, setTopAssociations] = useState<number>(90);
  const [selectedFilter, setSelectedFilter] = useState<FilterSelection>('genes');
  const [counts, setCounts] = useState({ max: 0, min: 0 });

  useEffect(() => {
    setTopLevelTerms(dataService.getAllTopLevelTerms());
    setGeneNames(dataService.getAllGeneNames());
    setCounts(dataService.getMinAndMaxCount());
  }, []);

  useEffect(() => {
    setChartData(
      dataService.getDataForChart(selectedFilter, selectedTerms, selectedGenes, topAssociation)
    );
  }, [selectedTerms, selectedGenes, topAssociation, selectedFilter]);

  return (
    <>
      <Container>
        <Introduction />
        <Filters
          geneNames={geneNames}
          topLevelTerms={topLevelTerms}
          selectedFilter={selectedFilter}
          onSelectGene={setSelectedGenes}
          onSelectTerm={setSelectedTerms}
          onChangeAssociation={value => setTopAssociations(value)}
          onChangeFilterSelection={value => setSelectedFilter(value)}
        />
      </Container>
      <Chart chartData={chartData} counts={counts} />
    </>
  );
}

export default App;

import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';

import useDebounce from '../../utils/useDebounce';
import { FilterSelection } from '../../models/Filters';

interface FilterProps {
  geneNames: Array<string>;
  topLevelTerms: Array<string>;
  selectedFilter: FilterSelection;
  onSelectGene: (newValue: Array<string>) => void;
  onSelectTerm: (newValue: Array<string>) => void;
  onChangeAssociation: (newValue: number) => void;
  onChangeFilterSelection: (newValue: FilterSelection) => void;
}

const Filters = ({
  geneNames,
  topLevelTerms,
  selectedFilter,
  onSelectGene,
  onSelectTerm,
  onChangeAssociation,
  onChangeFilterSelection,
}: FilterProps) => {

  const [rangeValue, setRangeValue] = useState<number>(90);
  const debouncedRangeValue = useDebounce<number>(rangeValue, 500);

  useEffect(() => onChangeAssociation(debouncedRangeValue), [debouncedRangeValue]);

  const updateSelection = (newSelection: FilterSelection) => {
    onChangeFilterSelection(newSelection);
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack direction="row" spacing={1}>
            <Checkbox
              checked={selectedFilter === 'genes'}
              onChange={() => updateSelection('genes')}
            />
            <Autocomplete
              className="input-autocomplete"
              disabled={selectedFilter !== 'genes'}
              multiple
              options={geneNames}
              onChange={(_, value) => onSelectGene(value)}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='standard'
                  label='Filter by gene name'
                  placeholder='Choose a gene...'
                />
              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack direction="row" spacing={1}>
            <Checkbox
              checked={selectedFilter === 'term'}
              onChange={() => updateSelection('term')}
            />
            <Autocomplete
              className="input-autocomplete"
              disabled={selectedFilter !== 'term'}
              multiple
              options={topLevelTerms}
              onChange={(_, value) => onSelectTerm(value)}
              renderInput={params => (
                <TextField
                  {...params}
                  variant='standard'
                  label='Filter by significant phenotype system'
                  placeholder='Choose a phenotype system...'
                />
              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack direction="row" spacing={1}>
            <Checkbox
              checked={selectedFilter === 'count'}
              onChange={() => updateSelection('count')}
            />
            <div>
              <Typography gutterBottom>
                Filter top {rangeValue}% of the genes that have the highest phenotype count
              </Typography>
              <Slider
                disabled={selectedFilter !== 'count'}
                max={100}
                min={1}
                step={1}
                value={rangeValue}
                onChange={(_, value) => setRangeValue(value as number)}
              />
            </div>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
};

export default Filters;
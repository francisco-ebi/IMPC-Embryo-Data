import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';

import useDebounce from '../../utils/useDebounce';

interface FilterProps {
  geneNames: Array<string>;
  topLevelTerms: Array<string>;
  onSelectGene: (newValue: Array<string>) => void;
  onSelectTerm: (newValue: Array<string>) => void;
  onChangeAssociation: (newValue: number) => void;
}

type CheckboxSelection = 'genes' | 'term' | 'count';

const Filters = ({
  geneNames,
  topLevelTerms,
  onSelectGene,
  onSelectTerm,
  onChangeAssociation,
}: FilterProps) => {

  const [rangeValue, setRangeValue] = useState<number>(90);
  const debouncedRangeValue = useDebounce<number>(rangeValue, 500);
  const [selectedCheckbox, setSelectedCheckbox] = useState<CheckboxSelection>('genes');

  useEffect(() => onChangeAssociation(debouncedRangeValue), [debouncedRangeValue]);

  const updateSelection = (newSelection: CheckboxSelection) => {
    setSelectedCheckbox(newSelection);
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack direction="row" spacing={1}>
            <Checkbox
              checked={selectedCheckbox === 'genes'}
              onChange={() => updateSelection('genes')}
            />
            <Autocomplete
              className="input-autocomplete"
              disabled={selectedCheckbox !== 'genes'}
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
              checked={selectedCheckbox === 'term'}
              onChange={() => updateSelection('term')}
            />
            <Autocomplete
              className="input-autocomplete"
              disabled={selectedCheckbox !== 'term'}
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
              checked={selectedCheckbox === 'count'}
              onChange={() => updateSelection('count')}
            />
            <div>
              <Typography gutterBottom>
                Filter top {rangeValue}% of the genes that have the highest phenotype count
              </Typography>
              <Slider
                disabled={selectedCheckbox !== 'count'}
                max={100}
                min={10}
                step={5}
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
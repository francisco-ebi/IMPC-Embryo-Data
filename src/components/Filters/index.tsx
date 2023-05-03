import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import useDebounce from '../../utils/useDebounce';

interface FilterProps {
  geneNames: Array<string>;
  topLevelTerms: Array<string>;
  onSelectGene: (newValue: Array<string>) => void;
  onSelectTerm: (newValue: Array<string>) => void;
  onChangeAssociation: (newValue: number) => void;
}

const Filters = ({
  geneNames,
  topLevelTerms,
  onSelectGene,
  onSelectTerm,
  onChangeAssociation,
}: FilterProps) => {

  const [rangeValue, setRangeValue] = useState<number>(90);
  const debouncedRangeValue = useDebounce<number>(rangeValue, 500);

  useEffect(() => onChangeAssociation(debouncedRangeValue), [debouncedRangeValue])

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Autocomplete
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
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
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
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>
            Filter top {rangeValue}% of the genes that have the highest phenotype count
          </Typography>
          <Slider
            max={100}
            min={10}
            step={5}
            value={rangeValue}
            onChange={(_, value) => setRangeValue(value as number)}
          />
        </Grid>
      </Grid>
    </>
  )
};

export default Filters;
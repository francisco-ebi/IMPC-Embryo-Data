import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

interface FilterProps {
  geneNames: Array<string>;
  topLevelTerms: Array<string>;
  onSelectGene: (newValue: Array<string>) => void;
  onSelectTerm: (newValue: Array<string>) => void;
}


const Filters = ({
  geneNames,
  topLevelTerms,
  onSelectGene,
  onSelectTerm,
}: FilterProps) => (
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
    </Grid>
  </>
);

export default Filters;
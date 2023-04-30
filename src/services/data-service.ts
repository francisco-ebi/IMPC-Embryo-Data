import jsonData from '../data/gene_phenotypes.json';
import { HeatMapDatum } from '@nivo/heatmap';
import { ChartData } from '../models/Charts';

interface PTAModel {
  marker_accession_id: string;
  marker_symbol: string;
  top_level_phenotype_term: {
    top_level_mp_term_id: string;
    top_level_mp_term_name: string;
  };
  phenotype_terms: Array<{ mp_term_id: string, mp_term_name: string }>;
  phenotype_count: number;
  procedures: Array<string>;
}

function difference(setA: Set<string>, setB: Set<string>) {
  const _difference = new Set(setA);
  for (const elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

const pickName = (term: any) => term.top_level_mp_term_name;

class DataService {

  genes: any = {};
  allTopLevelTerms = new Set<string>();

  constructor(data: Array<PTAModel>) {
    data.forEach(association => {
      if (!this.genes[association.marker_accession_id]) {
        this.genes[association.marker_accession_id] = {
          count: 0,
          id: association.marker_accession_id,
          symbol: association.marker_symbol,
          topLevelPhenotypeTerms: [],
        }
      }
      const gene = this.genes[association.marker_accession_id];
      gene.totalCount += association.phenotype_count;
      gene.topLevelPhenotypeTerms.push({
        ...association.top_level_phenotype_term,
        count: association.phenotype_count,
      });
      this.allTopLevelTerms.add(association.top_level_phenotype_term.top_level_mp_term_name);
    });

  }

  getDataForChart(): ChartData {
    const getAllMissingTermsForGene = (gene: any) => {
      const phenotypeTermsNames = gene.topLevelPhenotypeTerms.map(pickName);
      return Array.from(
        difference(this.allTopLevelTerms, new Set(phenotypeTermsNames))
      ).map(term => ({
        x: term,
        y: null
      }));
    }
    return Object.keys(this.genes).map(id => {
      const gene = this.genes[id];
      const data: HeatMapDatum[] = gene.topLevelPhenotypeTerms.map((term: any) => ({
        x: term.top_level_mp_term_name,
        y: term.count
      }));
      data.push(...getAllMissingTermsForGene(gene));
      return {
        id: gene.symbol,
        data,
      }
    })
  }



};

const service = new DataService(jsonData as Array<PTAModel>);
export default service;
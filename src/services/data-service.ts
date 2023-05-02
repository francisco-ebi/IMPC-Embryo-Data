import jsonData from '../data/gene_phenotypes.json';
import { HeatMapDatum } from '@nivo/heatmap';
import { ChartData } from '../models/Charts';
import Gene from '../models/Gene';
import { difference } from '../utils';

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

class DataService {

  genes: Record<string, Gene> = {};
  allTopLevelTerms = new Set<string>();

  constructor(data: Array<PTAModel>) {
    let genesResult: Record<string, Gene> = {};
    data.forEach(association => {
      if (!genesResult[association.marker_symbol]) {
        genesResult[association.marker_symbol] = {
          totalCount: 0,
          id: association.marker_accession_id,
          symbol: association.marker_symbol,
          topLevelPhenotypeTerms: [],
        }
      }
      const gene = genesResult[association.marker_symbol];
      gene.totalCount += association.phenotype_count;
      const topLevelTerm = {
        termId: association.top_level_phenotype_term.top_level_mp_term_id,
        termName: association.top_level_phenotype_term.top_level_mp_term_name,
        count: association.phenotype_count,
      };
      gene.topLevelPhenotypeTerms.push(topLevelTerm);
      this.allTopLevelTerms.add(topLevelTerm.termName);
    });
    const tempGenes = Object.values(genesResult);
    tempGenes.sort((a, b) => b.totalCount - a.totalCount);
    genesResult = {};
    tempGenes.forEach(gene => genesResult[gene.symbol] = gene);
    this.genes = {...genesResult};
  }

  getDataForChart(selectedTerms: Array<string>, selectedGenes: Array<string>): ChartData {
    const result: ChartData = [];
    const genes = selectedGenes.length ? this.getFilteredGenes(selectedGenes) : this.genes;
    Object.values(genes).forEach(gene => {
      if (selectedTerms.length === 0 || this.geneHasSelectedTerms(gene, selectedTerms)) {
        const data: HeatMapDatum[] = gene.topLevelPhenotypeTerms.map(term => ({
          x: term.termName,
          y: term.count
        }));
        data.push(...this.fillMissingTermsForGene(gene));
        result.push({ id: gene.symbol, data });
      }
    });
    return result;
  }

  getAllTopLevelTerms(): Array<string> {
    return Array.from(this.allTopLevelTerms);
  }

  getAllGeneNames(): Array<string> {
    return Object.keys(this.genes);
  }

  private fillMissingTermsForGene(gene: Gene) {
    const phenotypeTermsNames = gene.topLevelPhenotypeTerms.map(t => t.termName);
    return Array.from(
      difference(this.allTopLevelTerms, new Set(phenotypeTermsNames))
    ).map(term => ({ x: term, y: null }));
  }

  private geneHasSelectedTerms(gene: Gene, selectedTerms: Array<string>): boolean {
    return gene.topLevelPhenotypeTerms
              .map(term => term.termName)
              .some(termName => selectedTerms.includes(termName));
  }

  private getFilteredGenes(selectedGenes: Array<string>): Record<string, Gene> {
    const filteredGenes: Record<string, Gene> = {};
    selectedGenes.forEach(gene => filteredGenes[gene] = this.genes[gene]);
    return filteredGenes;
  }

};

const service = new DataService(jsonData as Array<PTAModel>);
export default service;
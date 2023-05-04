import jsonData from '../data/gene_phenotypes.json';
import { HeatMapDatum } from '@nivo/heatmap';
import { ChartData } from '../models/Charts';
import { FilterData, FilterSelection } from '../models/Filters';
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

  genes: Map<string, Gene>;
  allTopLevelTerms = new Set<string>();
  maxCount: number = 1;
  minCount: number = 1000;

  constructor(data: Array<PTAModel>) {
    let genesResult: Record<string, Gene> = {};
    const tempMap = new Map<string, Gene>();
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
        procedures: association.procedures,
      };
      if (association.phenotype_count > this.maxCount) {
        this.maxCount = association.phenotype_count;
      }
      if (association.phenotype_count < this.minCount) {
        this.minCount = association.phenotype_count;
      }
      gene.topLevelPhenotypeTerms.push(topLevelTerm);
      this.allTopLevelTerms.add(topLevelTerm.termName);
    });
    const tempGenes = Object.values(genesResult);
    tempGenes.sort((a, b) => b.totalCount - a.totalCount);
    tempGenes.forEach(gene => tempMap.set(gene.symbol, gene));
    this.genes = new Map(tempMap);
  }

  getDataForChart(
    selectedFilter: FilterSelection,
    selectedTerms: FilterData,
    selectedGenes: FilterData,
    topPercentage: number
  ): ChartData {
      const result: ChartData = [];
      const genes = selectedFilter === 'genes' ? this.getFilteredGenes(selectedGenes) : this.genes;
      const numOfGenesToTake = (topPercentage / 100) * genes.size;
      for(const [_, gene] of genes) {
        if (selectedFilter === 'count' && result.length >= numOfGenesToTake) {
          break;
        }
        if (selectedFilter !== 'term' || this.geneHasSelectedTerms(gene, selectedTerms)) {
          const data: HeatMapDatum[] = gene.topLevelPhenotypeTerms.map(term => ({
            x: term.termName,
            y: term.count
          }));
          data.push(...this.fillMissingTermsForGene(gene));
          result.push({
            id: gene.symbol,
            data: data.sort((a, b) => (a.x as string).localeCompare(b.x as string))
          });
        }
      }
      return result;
  }

  getAllTopLevelTerms(): Array<string> {
    return Array.from(this.allTopLevelTerms);
  }

  getAllGeneNames(): Array<string> {
    return [...this.genes.keys()];
  }

  getMinAndMaxCount(): { max: number, min: number } {
    return { max: this.maxCount, min: this.minCount };
  }

  getProcedures(geneSymbol: string, termName: string) : Array<string> {
    const gene = this.genes.get(geneSymbol) as Gene;
    const pTerm = gene.topLevelPhenotypeTerms.find(term => term.termName === termName);
    return pTerm ? pTerm.procedures : [];
  }

  getGeneInfo(geneSymbol: string) : Gene {
    return this.genes.get(geneSymbol) as Gene;
  }

  private fillMissingTermsForGene(gene: Gene) {
    const phenotypeTermsNames = gene.topLevelPhenotypeTerms.map(t => t.termName);
    return Array.from(
      difference(this.allTopLevelTerms, new Set(phenotypeTermsNames))
    ).map(term => ({ x: term, y: null }));
  }

  private geneHasSelectedTerms(gene: Gene, selectedTerms: Array<string>): boolean {
    if (selectedTerms.length === 0) {
      return true;
    }
    return gene.topLevelPhenotypeTerms
              .map(term => term.termName)
              .some(termName => selectedTerms.includes(termName));
  }

  private getFilteredGenes(selectedGenes: Array<string>): Map<string, Gene> {
    if (selectedGenes.length === 0) {
      return new Map<string, Gene>(this.genes);
    }
    const filteredGenes = new Map<string, Gene>();
    selectedGenes.forEach(geneSymbol =>
      filteredGenes.set(geneSymbol, this.genes.get(geneSymbol) as Gene)
    );
    return filteredGenes;
  }
};

const service = new DataService(jsonData as Array<PTAModel>);
export default service;
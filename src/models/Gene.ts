export default interface Gene {
  id: string;
  symbol: string;
  totalCount: number;
  topLevelPhenotypeTerms: Array<{
    termId: string;
    termName: string;
    count: number;
    procedures: Array<string>
  }>;
}
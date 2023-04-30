import { PhenotypeTerm } from "./PhenotypeTerm";

export interface PTAssociation {
  id: string;
  symbol: string;
  topLevelPhenotypeTerm: PhenotypeTerm;
  phenotypeTerms: Array<PhenotypeTerm>;
  phenotypeCount: number;
  procedures: Array<string>;
}
import { IDespesas } from './IDespesas';

export interface IDespesasWithMods extends IDespesas {
  year: number;

  month: string;
}

export interface IDespesas {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: number | string;
  monthNumber?: string | number;
  yearNumber?: number | string;
}

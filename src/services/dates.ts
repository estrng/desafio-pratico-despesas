import { IDespesas } from '../Interfaces/IDespesas';

export function setYearAndMonth(despesas: IDespesas[]) {
  function splitDate(date: string) {
    const [year, month] = date.split('-');
    return { year, month };
  }

  const despeasWithMonth = despesas.map((despesa) => {
    const { year, month } = splitDate(despesa.mes);
    const yearNumber = Number(year);
    const monthNumber = Number(month);
    return { ...despesa, yearNumber, monthNumber };
  });

  return despeasWithMonth;
}

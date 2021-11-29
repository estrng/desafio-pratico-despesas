import { Box, rgbToHex } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import DTabs from '../../components/Tabs';
import { IDespesas } from '../../Interfaces/IDespesas';
import { ISummary } from '../../Interfaces/ISummary';
import { getDespesas } from '../../services/api';
import { setYearAndMonth } from '../../services/dates';
import { round } from '../../services/math';

export default function Home(): React.ReactElement {
  const [despesas, setDespesas] = useState<IDespesas[]>([]);
  const [year, setYear] = useState(2020);
  const [month, setMonth] = useState(1);
  const [despesasFiltered, setDespesasFiltered] = useState<IDespesas[]>([]);
  const [total, setTotal] = useState(0);
  const [summary, setSummary] = useState<ISummary>();

  function handleGetYear(event: React.ChangeEvent<{ value: any }>): void {
    setYear(event.target.value);
  }
  console.log(year);

  function handleGetMonth(event: React.ChangeEvent<{ value: any }>): void {
    setMonth(event.target.value);
  }
  console.log(month);

  useEffect(() => {
    getDespesas().then(setDespesas);
  }, []);
  console.log('Despesas: ', despesas.length + '\n' + 'Example: ', despesas[0]);

  const despesasWithMods = setYearAndMonth(despesas);

  useEffect(() => {
    function filterDespesas() {
      const despesasFiltered = despesasWithMods.filter((despesa: IDespesas) => {
        if (despesa.yearNumber === year && despesa.monthNumber === month) {
          return despesa;
        }
      });
      setDespesasFiltered(despesasFiltered);
    }
    filterDespesas();
  }, [year, month]);

  useEffect(() => {
    function getTotal() {
      const total = despesasFiltered.reduce((acc, despesa) => {
        return acc + despesa.valor;
      }, 0);
      setTotal(total);
    }
    getTotal();
  }, [despesasFiltered]);

  //order despesas by day asc.
  const despesasOrdered = despesasFiltered.sort((a, b) => {
    return Number(a.dia) - Number(b.dia);
  });
  /* console.log('despesasOrdered: ', despesasOrdered); */

  useEffect(() => {
    function calcSummary() {
      const summary: any = [];
      despesasOrdered.forEach((despesa: IDespesas) => {
        const found = summary.find(
          (item: ISummary) => item.categoria === despesa.categoria
        );
        if (found) {
          found.valor += despesa.valor;
        } else {
          summary.push({
            id: despesa.id,
            categoria: despesa.categoria,
            valor: despesa.valor,
            descricao: despesa.descricao,
          });
        }
      });

      //order summary by valor desc.
      summary.sort((a: any, b: any) => {
        return b.valor - a.valor;
      });

      setSummary(summary);
      console.log('summary: ', summary);
    }
    calcSummary();
  }, [despesasOrdered]);

  return (
    <Box style={{ background: 'rgb( 228 ,224 ,223)' }}>
      <Header
        getYear={handleGetYear}
        getMonth={handleGetMonth}
        year={year}
        month={month}
        total={round(total)}
      />
      <DTabs despesas={despesasOrdered} summary={summary} />
    </Box>
  );
}

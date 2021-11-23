import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Despesas from '../../components/Despesas';
import Header from '../../components/Header';
import { IDespesas } from '../../Interfaces/IDespesas';
import { api } from '../../services/api';
import { setYearAndMonth } from '../../services/dates';
import { round } from '../../services/math';

export default function Home(): React.ReactElement {
  const [despesas, setDespesas] = useState<IDespesas[]>([]);
  const [year, setYear] = useState(2020);
  const [month, setMonth] = useState(1);
  const [despesasFiltered, setDespesasFiltered] = useState<IDespesas[]>([]);
  const [total, setTotal] = useState(0);

  function handleGetYear(event: React.ChangeEvent<{ value: any }>): void {
    setYear(event.target.value);
  }
  console.log(year);

  function handleGetMonth(event: React.ChangeEvent<{ value: any }>): void {
    setMonth(event.target.value);
  }
  console.log(month);

  useEffect(() => {
    async function getDespesas() {
      const { data } = await api.get('despesas');
      setDespesas(data);
    }
    getDespesas();
  }, []);
  console.log('Despesas: ', despesas.length + '\n' + 'Example: ', despesas[0]);

  const despesasWithMods = setYearAndMonth(despesas);

  console.log(despesasWithMods);

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

  console.log(despesasFiltered);

  //order despesas by day asc.
  const despesasOrdered = despesasFiltered.sort((a, b) => {
    return Number(a.dia) - Number(b.dia);
  });

  console.log('despesasOrdered: ', despesasOrdered);
  return (
    <Box>
      <Header
        getYear={handleGetYear}
        getMonth={handleGetMonth}
        year={year}
        month={month}
        total={round(total)}
      />
      <Despesas despesas={despesasOrdered} />
    </Box>
  );
}

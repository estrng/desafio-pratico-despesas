import { useEffect, useState } from 'react';
import { Select } from '@material-ui/core';
import './App.css';
import { IDespesas } from './Interfaces/IDespesas';
import { api } from './services/api';

function App() {
  const [count, setCount] = useState(0);
  const [despesas, setDespesas] = useState<IDespesas[]>([]);

  useEffect(() => {
    async function getDespesas() {
      const { data } = await api.get('despesas');
      setDespesas(data);
    }
    getDespesas();
  }, []);
  console.log('Despesas: ', despesas.length + '\n' + 'Example: ', despesas[0]);

  //function to split "2020-10" in year and month.
  function splitDate(date: string) {
    const [year, month] = date.split('-');
    return { year, month };
  }

  const despeasWithMonth = despesas.map((despesa) => {
    const { year, month } = splitDate(despesa.mes);
    return { ...despesa, year, month };
  });

  console.log(
    'Despesas With Month And Year: ',
    despeasWithMonth.length + '\n' + 'Example: ',
    despeasWithMonth[0]
  );
  return (
    <div className="App">
      <header>{/* <Select></Select> */}</header>
      <body></body>
    </div>
  );
}

export default App;

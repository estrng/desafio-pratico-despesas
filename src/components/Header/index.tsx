import React, { useEffect, useState } from 'react';
import { Select, makeStyles, Box, MenuItem } from '@material-ui/core';

type Props = {
  getYear: (event: React.ChangeEvent<{ value: any }>) => void;
  getMonth: (event: React.ChangeEvent<{ value: any }>) => void;
  year: number;
  month: number;
  total: number | string;
};

export default function Header({
  getYear,
  getMonth,
  year,
  month,
  total,
}: Props): React.ReactElement {
  const classes = useStyles();

  const [months, setMonths] = useState<string[]>([]);

  //function to turn number to month name.
  function getMonthName() {
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    setMonths(months);
  }

  useEffect(() => {
    getMonthName();
  }, []);

  return (
    <Box className={classes.root}>
      <Box className={classes.select}>
        <Select
          className={classes.selectItem}
          value={year}
          onChange={getYear}
          label={'Year'}
        >
          <MenuItem value={2020}>2020</MenuItem>
          <MenuItem value={2021}>2021</MenuItem>
        </Select>
        <Select
          className={classes.selectItem}
          value={month}
          onChange={getMonth}
        >
          {months.map((month, index) => {
            return <MenuItem value={index + 1}>{month}</MenuItem>;
          })}
        </Select>
      </Box>
      <Box className={classes.total}>
        <h1>Total: {total} </h1>
      </Box>
      <Box className={classes.total}>
        <h1>TESTE </h1>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 56,
    padding: '0 30px',
  },

  total: {
    fontSize: '1.5rem',
    paddingRight: '50px',
  },

  select: {
    width: '100px',
    display: 'flex',
    justifyContent: 'space-between',
  },

  selectItem: {
    margin: '0 20px',
  },
});

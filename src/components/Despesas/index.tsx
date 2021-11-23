import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import { IDespesas } from '../../Interfaces/IDespesas';

export default function Despesas({ despesas }: any): React.ReactElement {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Despesa</TableCell>
              <TableCell align="left">Categoria</TableCell>
              <TableCell align="left">Dia</TableCell>
              <TableCell align="right">Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {despesas ? (
              despesas.map((despesa: IDespesas) => (
                <TableRow key={despesa.id}>
                  <TableCell align="left">{despesa.descricao}</TableCell>
                  <TableCell align="left">{despesa.categoria}</TableCell>
                  <TableCell align="left">{despesa.dia}</TableCell>
                  <TableCell align="right">{despesa.valor}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="left">NO DATA</TableCell>
                <TableCell align="left">NO DATA</TableCell>
                <TableCell align="left">NO DATA</TableCell>
                <TableCell align="right">NO DATA</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

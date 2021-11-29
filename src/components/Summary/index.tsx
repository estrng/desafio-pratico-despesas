import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from '@material-ui/core';
import { ISummary } from '../../Interfaces/ISummary';
import { round } from '../../services/math';
// import { Container } from './styles';

export default function Summary({ summary }: any): JSX.Element {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Categoria</TableCell>
              <TableCell align="right">Valor Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summary ? (
              summary.map((despesa: ISummary) => (
                <TableRow key={despesa.id}>
                  <TableCell align="left">{despesa.categoria}</TableCell>
                  <TableCell align="right">{round(despesa.valor)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
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

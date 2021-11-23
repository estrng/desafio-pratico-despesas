//function to round a number to a given number of decimal places.
export function round(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

import { Container, TextField, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { IUser } from '../../Interfaces/IUser';
import { getSingIn } from '../../services/api';

const useStyles = makeStyles({
  error: {
    backgroundColor: 'rgb(253, 236, 234)',
    borderRadius: '4px',
    padding: '16px',
    margin: '16px 0',
  },
});

interface ILoginScreenProps {
  onSignIn: (user: IUser) => void;
}

export default function Login({ onSignIn }: ILoginScreenProps): JSX.Element {
  const classes = useStyles();

  const [email, setEmail] = useState('usuario@email.com');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');

  async function signIn(evt: React.FormEvent) {
    evt.preventDefault();
    console.log('signIn');

    getSingIn(email, password).then(onSignIn, (e) =>
      setError('E-mail não encontrado ou senha incorreta')
    );
  }

  return (
    <Container maxWidth="sm">
      <h1>Agenda React</h1>
      <p>
        Digite e-mail e senha para entrar no sistema. Para testar, use o e-mail{' '}
        <kbd>danilo@email.com</kbd> e a senha <kbd>1234</kbd>.
      </p>
      <form onSubmit={signIn}>
        <TextField
          margin="normal"
          label="E-mail"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <TextField
          type="password"
          margin="normal"
          label="Senha"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        {error && <div className={classes.error}>{error}</div>}

        <Box textAlign="right" marginTop="16px">
          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );
}

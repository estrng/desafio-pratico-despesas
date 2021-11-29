import Axios from 'axios';
import { IDespesas } from '../Interfaces/IDespesas';
import { IUser } from '../Interfaces/IUser';

export const api = Axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json',
    withCredentials: 'true',
  },
});

export function getSingIn(email: string, senha: string): Promise<IUser> {
  return fetch(`http://localhost:3001/sessao/criar`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha }),
  }).then(handleResponse);
}

export function getDespesas(): Promise<IDespesas[]> {
  return fetch('http://localhost:3001/despesas', {
    credentials: 'include',
  }).then(handleResponse);
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}

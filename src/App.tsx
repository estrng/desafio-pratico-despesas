import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { authContext } from './contexts/authContext';
import { useEffect, useState } from 'react';
import { IUser } from './Interfaces/IUser';
import { getSingIn } from './services/api';
import Login from './pages/Login';

export default function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    //gerSingIn().then(setUser, onSignOut);// ATENCAO isso é uma funcao que busca o usuario e não login.
  }, []);

  function onSignOut() {
    setUser(null);
  }

  if (user) {
    return (
      <authContext.Provider value={{ user, onSignOut }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </authContext.Provider>
    );
  } else {
    return <Login onSignIn={setUser} />;
  }
}

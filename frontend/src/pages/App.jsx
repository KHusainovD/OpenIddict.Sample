import {useEffect, useState} from "react";
import {getUser, logout} from "../services/AuthService";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Unauthenticated from "./Unauthenticated.page";
import OAuthCallback from "./oauth-callback.page";
import { getResources as getAndreykaResources } from '../services/Api'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [resource, setResource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    const user = await getUser();
    const accessToken = user?.access_token;

    setUser(user);

    if (accessToken) {
      setIsAuthenticated(true);

      const data = await getAndreykaResources(accessToken);
      setResource(data);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [isAuthenticated]);

  if (isLoading) {
    return (<>Loading...</>)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Unauthenticated authenticated={isAuthenticated} />} />

        <Route path={'/resources'} element={
          <ProtectedRoute authenticated={isAuthenticated} redirectPath='/'>
            <span>Authenticated OAuth Server result: {JSON.stringify(user)}</span>
            <br />
            <span>Resource got with access token: {resource}</span>

            <button onClick={logout}>Log out</button>
          </ProtectedRoute>
        } />

        <Route path='/oauth/callback' element={<OAuthCallback setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

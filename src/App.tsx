import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from './apollo';
import './App.css';
import { LoggedInRouter } from './routes/logged-in-route';
import { LoggedOutRouter } from './routes/logged-out-route';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
    return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />
}

export default App;

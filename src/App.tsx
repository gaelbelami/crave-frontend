import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";
import "./App.css";
import { LoggedInRouter } from "./routes/logged-in-route";
import { LoggedOutRouter } from "./routes/logged-out-route";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <div className="bg-gray-50 h-screen">
      {isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}
    </div>
  );
}

export default App;

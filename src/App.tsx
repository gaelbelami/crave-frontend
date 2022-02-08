import { useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { isLoggedInVar } from "./apollo";
import "./App.css";
import Spinner from "./components/spinner";
import { LoggedInRouter } from "./routes/logged-in-route";
import { LoggedOutRouter } from "./routes/logged-out-route";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
 
  return (
    <div className="bg-gray-50">
      { isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}
    </div>
  );
}

export default App;

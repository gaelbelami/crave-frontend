import { gql, useQuery } from "@apollo/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Restauraunts from "../pages/client/restaurants";
import { UserRole } from "../__generated__/globalTypes";
import { meQuery } from "../__generated__/meQuery";

const ClientRoutes = [
    {
        path: "/",
        component: <Restauraunts />,
    }
]

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      firstName
      lastName
      username
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  console.log(data);
  return (
    <Router>
      <Routes>
       {data?.me.role === UserRole.client &&  ClientRoutes.map((clientRoute) => (           
              <Route key={clientRoute.path} path={clientRoute.path} element={clientRoute.component} />           
       ))}
      </Routes>
    </Router>
  );
};

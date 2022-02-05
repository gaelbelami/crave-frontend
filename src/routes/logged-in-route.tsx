import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Tabs } from "../pages/client/account-settings/tabs";
import { EditProfile } from "../pages/client/edit-profile";
import Restauraunts from "../pages/client/restaurants";
import { Test } from "../pages/client/test";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { UserRole } from "../__generated__/globalTypes";

const ClientRoutes = [
    {
        path: "/",
        component: <Restauraunts />,
    },
    {
        path: "/verify-email",
        component: <ConfirmEmail />,
    },
    {
        path: "/edit-profile",
        component: <EditProfile />,
    },
    {
        path: "/tabs",
        component: <Tabs />,
    },
    {
      path: "/test",
      component: <Test />
    }
]

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
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
      <Header />
      <Routes>
       {data?.me.role === UserRole.client &&  ClientRoutes.map((clientRoute) => (           
              <Route key={clientRoute.path} path={clientRoute.path} element={clientRoute.component} />           
       ))}
      <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Category } from "../pages/client/category";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { AccountSettings } from "../pages/client/account-settings";
import { EditProfile } from "../pages/client/edit-profile";
import Restauraunts from "../pages/client/restaurants";
import { Search } from "../pages/client/search";
import { Test } from "../pages/client/test";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { UserRole } from "../__generated__/globalTypes";
import Spinner from "../components/spinner";
import { Restaurant } from "../pages/client/restaurant";
import { MyRestaurant } from "../pages/owner/home-owner";
import { Addrestaurant } from "../pages/owner/add-restaurant";

const ClientRoutes = [
    {
        path: "/",
        component: <Restauraunts />,
    },
    {
        path: "/tabs",
        component: <AccountSettings />,
    },
    {
        path: "/search",
        component: <Search />,
    },
    {
        path: "/category/:categorySlug",
        component: <Category />,
    },
    {
        path: "/restaurant/:restaurantId",
        component: <Restaurant />,
    },
    {
      path: "/test",
      component: <Test />
    }
]

const OwnerRoutes = [
    {
        path: "/",
        component: <MyRestaurant />,
    },    
    {
      path: "/add-restaurant",
      component: <Addrestaurant />
    }
]

const CommonRoutes = [
    
    {
        path: "/verify-email",
        component: <ConfirmEmail />,
    },
    {
        path: "/edit-profile",
        component: <EditProfile />,
    },
    {
      path: "/account-settings",
      component: <AccountSettings />
    }    
    
]

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide"><Spinner /></span>
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
       {data?.me.role === UserRole.owner &&  OwnerRoutes.map((ownerRoute) => (           
              <Route key={ownerRoute.path} path={ownerRoute.path} element={ownerRoute.component} />           
       ))}
       { CommonRoutes.map((ownerRoute) => (           
              <Route key={ownerRoute.path} path={ownerRoute.path} element={ownerRoute.component} />           
       ))}
      <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

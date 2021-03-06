import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import { UserRole } from "../generated/globalTypes";
import Spinner from "../components/spinner";
import { Restaurant } from "../pages/client/restaurant";
import { HomeOwner } from "../pages/owner/home-owner";
import { Addrestaurant } from "../pages/owner/add-restaurant";
import { MyRestaurant } from "../pages/owner/my-restaurant";
import { AddDish } from "../pages/owner/add-dish";
import { Notification } from "../pages/client/notification";
import Sidebar from "../components/sidebar";
import { Footer } from "../components/footer";
import { Cart } from "../pages/client/cart";
import Order from "../pages/order";
import Dashboard from "../pages/driver/dashboard";
import { Chat } from "../pages/chat";
import Orders from "../pages/orders";

export const ClientRoutes = [
  {
    path: "/",
    component: <Restauraunts />,
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
    path: "/notification",
    component: <Notification />,
  },
  {
    path: "/cart",
    component: <Cart />,
  },
  {
    path: "/test",
    component: <Test />,
  },
  {
    path: "/chats",
    component: <Chat />,
  },
];

export const OwnerRoutes = [
  {
    path: "/",
    component: <HomeOwner />,
  },
  {
    path: "/add-restaurant",
    component: <Addrestaurant />,
  },
  {
    path: "/restaurant/:restaurantId",
    component: <MyRestaurant />,
  },
  {
    path: "/restaurant/:restaurantId/add-dish",
    component: <AddDish />,
  },
  {
    path: "/chats",
    component: <Chat />,
  },
];

export const CommonRoutes = [
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
    component: <AccountSettings />,
  },
  {
    path: "/orders/:id",
    component: <Order />,
  },
  {
    path: "/orders",
    component: <Orders />,
  },
];

export const DriverRoutes = [
  {
    path: "/",
    component: <Dashboard />,
  },
  {
    path: "/chats",
    component: <Chat />,
  },
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">
          <Spinner />
        </span>
      </div>
    );
  }
  console.log(data);
  return (
    <Router>
      <div className="flex flex-row ">
        <Sidebar />
        <div className="flex-auto  page-container ">
          <Header />
          <Routes>
            {data?.me.role === UserRole.client &&
              ClientRoutes.map((clientRoute) => (
                <Route
                  key={clientRoute.path}
                  path={clientRoute.path}
                  element={clientRoute.component}
                />
              ))}
            {data?.me.role === UserRole.owner &&
              OwnerRoutes.map((ownerRoute) => (
                <Route
                  key={ownerRoute.path}
                  path={ownerRoute.path}
                  element={ownerRoute.component}
                />
              ))}
            {data?.me.role === UserRole.delivery &&
              DriverRoutes.map((driverRoute) => (
                <Route
                  key={driverRoute.path}
                  path={driverRoute.path}
                  element={driverRoute.component}
                />
              ))}
            {CommonRoutes.map((ownerRoute) => (
              <Route
                key={ownerRoute.path}
                path={ownerRoute.path}
                element={ownerRoute.component}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <div className="relative bg-red-400">
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
};

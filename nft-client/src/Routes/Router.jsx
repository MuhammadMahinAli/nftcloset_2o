import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Homepage from "../Pages/Homepage/Homepage";
import Sign from "../Pages/SignUp/Sign";
import Login from "../Pages/Login/Login";
import HomepageLayout from "../Layout/HomepageLayout";
import AddProduct from "../Pages/NFT/AddProduct/AddProduct";
import CreateCollection from "../Pages/NFT/CreateCollection/CreateCollection";
import UpdateProfile from "../Pages/NFT/UpdateProfile/UpdateProfile";
import ProductDescription from "../Pages/NFT/ProductDescription/ProductDescription";
import Order from "../Pages/NFT/Order/Order";
import ManageAccount from "../Pages/Dashboard/ManageAccount";
import AdminLayout from "../Layout/AdminLayout";
import UpdateUserProfile from "../Pages/Dashboard/UpdateUserProfile";
import Pages from "../Pages/Ai/Pages";
import UserSetting from "../Pages/Dashboard/UserSetting";
import SavedAddreses from "../components/SavedAddreses";
import ProductDetails from "../components/ProductDetails";
import AllOrders from "../Pages/Dashboard/AllOrders";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <LandingLayout />,
  //   children: [
  //     {
  //       path: "/",
  //       element: <LandingPage /> ,
  //     },

  //   ],
  // },
  {
    path: "/manageAccount",
    element: <AdminLayout />,
    children: [
      {
        path: "/manageAccount",
        element: <ManageAccount />,
      },
      {
        path: "/manageAccount/update-profile",
        element: <UpdateUserProfile />,
      },
      {
        path: "/manageAccount/page",
        element: <Pages />,
      },
      {
        path: "/manageAccount/settings",
        element: <UserSetting />,
      },
      {
        path: "/manageAccount/orders",
        element: <AllOrders />,
      },
]},
  {
    path: "/",
    element: <HomepageLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/profile",
        element: <UpdateProfile />,
      },
      {
        path: "/order",
        element: <ProductDescription />,
      },
      {
        path: "/addProduct",
        element: <AddProduct />,
      },
     
      {
        path: "/collections",
        element: <CreateCollection />,
      },
      {
        path: "/allOrder",
        element: <Order />,
      },
    ],
  },

  {
    path: "/test",
    element: <ProductDetails />,
  },
  {
    path: "/sign-up",
    element: <Sign />,
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

export default router;

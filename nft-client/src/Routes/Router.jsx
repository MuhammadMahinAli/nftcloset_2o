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
        path: "/manageAccount",
        element: <ManageAccount />,
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
    path: "/sign-up",
    element: <Sign />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;

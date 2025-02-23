import { createBrowserRouter } from "react-router-dom";
import Homepage from "../Pages/Homepage/Homepage";
import Sign from "../Pages/SignUp/Sign";
import Login from "../Pages/Login/Login";
import HomepageLayout from "../Layout/HomepageLayout";
import CreateCollection from "../Pages/NFT/CreateCollection/CreateCollection";
import UpdateProfile from "../Pages/NFT/UpdateProfile/UpdateProfile";
import ProductDescription from "../Pages/NFT/ProductDescription/ProductDescription";
import Order from "../Pages/NFT/Order/Order";
import ManageAccount from "../Pages/Dashboard/ManageAccount";
import AdminLayout from "../Layout/AdminLayout";
import UpdateUserProfile from "../Pages/Dashboard/UpdateUserProfile";
import Pages from "../Pages/Ai/Pages";
import UserSetting from "../Pages/Dashboard/UserSetting";
import ProductDetails from "../components/ProductDetails";
import AllOrders from "../Pages/Dashboard/AllOrders";
import AllProduct from "../Pages/Dashboard/AllProduct";
import AllCollections from "../Pages/Dashboard/AllCollections";
import CreateNewCollection from "../Pages/Dashboard/CreateNewCollection";
import AddANewProduct from "../Pages/Dashboard/AddANewProduct";
import HomePageControl from "../Pages/Dashboard/HomePageControl";
import OrderForm from "../Pages/OrderForm/OrderForm";
import ProductsDetails from "../Pages/Product/ProductsDetails";
import LandingLayout from "../Layout/LandingLayout";
import AllProducts from "../Pages/AllProducts/AllProducts";
import AllCollection from "../Pages/Collections/AllCollection";
import CollectionDetails from "../Pages/Collections/CollectionDetails";



const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <LandingLayout />,
  //   children: [
  //     // {
  //     //   path: "/",
  //     //   element: <LandingPage /> ,
  //     // },

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
      {
        path: "/manageAccount/all-products",
        element: <AllProduct/>,
      },
      {
        path: "/manageAccount/all-collections",
        element: <AllCollections/>,
      },
      {
        path: "/manageAccount/create-collection",
        element: <CreateNewCollection/>,
      },
      {
        path: "/manageAccount/add-new-product",
        element: <AddANewProduct/>,
      },
      {
        path: "/manageAccount/home-page-controls",
        element: <HomePageControl/>,
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
        path: "/market",
        element: <AllProducts />,
      },
      {
        path: "/collections",
        element: <AllCollection/>,
      },
      {
        path: "/collection-details",
        element: <CollectionDetails/>,
      },
     
      {
        path: "/collections",
        element: <CreateCollection />,
      },
      {
        path: "/allOrder",
        element: <Order />,
      },
      {
        path: "/products-details",
        element: <ProductsDetails />,
      },
      {
        path: "/orders",
        element: <OrderForm />,
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

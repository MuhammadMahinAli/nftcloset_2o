import express from "express";
import { MemberRoutes } from "../modules/member/member.routes.js";
import { AuthRoutes } from "../modules/auth/auth.routes.js";
import { ProductRoutes } from "../modules/products/product.routes.js";
import {CollectionRoutes} from '../modules/collection/collection.routes.js'
import { OrderRoutes } from "../modules/order/order.routes.js";
import { HomePageControlRoutes } from "../modules/homePageControl/homePageControl.routes.js";
import { FundRequestRoutes } from "../modules/deliveryCharge/deliveryCharge.routes.js";
import { DeliveryAreaRoutes } from "../modules/deliveryAreaForAdmin/deliveryArea.routes.js";

const router = express.Router();
const moduleRoutes = [
  { path: "/member", route: MemberRoutes },
  { path: "/auth", route: AuthRoutes },
  { path: "/product", route: ProductRoutes },
  { path: "/collection", route: CollectionRoutes },
  { path: "/order", route: OrderRoutes },
  { path: "/homePageControl", route: HomePageControlRoutes },
  { path: "/deliveryCharge", route: FundRequestRoutes },
  { path: "/deliveryArea", route: DeliveryAreaRoutes },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

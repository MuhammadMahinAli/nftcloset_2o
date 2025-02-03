import {useAuthCheck} from "../utils/authCheck";

export const useUniqueRouteAccess = () => {
  const {userId} = useAuthCheck();
  let routeAccessId = null;
  if (userId) {
    routeAccessId = `${userId?.slice(0, 3)}...${userId?.slice(-3)}`;
    console.log(routeAccessId);
  }

  return routeAccessId;
};


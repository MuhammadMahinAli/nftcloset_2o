export const pathGenerate = (role) => {
  if (role === "Buyer") {
    return `/Buyer-Dashboard`;
  } else if (role === "Seller") {
    return `/Seller-Dashboard`;
  } else if (role === "Admin") {
    return "/admin";
  } else if (role === "Designer") {
    return `/Designer-Dashboard`;
  }
};

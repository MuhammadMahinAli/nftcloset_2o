import { useEffect } from "react";
import { Nav } from "../shared/NavBar/Nav";
import DeliveryReturnNewsletter from "./DeliveryReturnNewsletter/DeliveryReturnNewsletter";
import HeroSection from "./HeroSection/HeroSection";
import FashionLab from "./FashionLab/FashionLab";
import CollectionSlider from "./CollectionSlider/CollectionSlider";
//import { connect } from "../utils/ipfs";

const HomePage = () => {
  // useEffect(() => {
  //   connect();
  // }, []);
  return (
    <>

      <main>
        <HeroSection />
        <CollectionSlider/>
        <FashionLab/>
        {/* <RecentItems /> */}
    
        <DeliveryReturnNewsletter />
      </main>
    </>
  );
};

export default HomePage;

import PropTypes from "prop-types";
import styles from "./Contn.module.css";

const Contn = ({ className = "" }) => {
  return (
    <div className={[styles.contn, className].join(" ")}>
      <div className={styles.txtPlusIcons}>
        <div className={styles.text}>
          <div className={styles.logo}>
            <img
              className={styles.nftClogetlogo2}
              alt=""
              src="/nft-clogetlogo-211@2x.png"
            />
            <div className={styles.nftCloset}>
              <span>NFT</span>
              <span className={styles.span}>{` `}</span>
              <span className={styles.closet}>CLOSET</span>
            </div>
          </div>
          <div className={styles.nftClosetIs}>
            NFT Closet is the go-to marketplace for digital fashion. Mint, buy,
            and sell fashion NFTs with AR, VR, and virtual try-on features.
            Upgrade your e-commerce site to Web3 with our API. Partnered with
            AWS for seamless supply chain management.
          </div>
        </div>
        <div className={styles.icons}>
          <div className={styles.eng}>
            <div className={styles.contnt}>
              <img
                className={styles.unitedKingdom8363562Icon}
                alt=""
                src="/unitedkingdom-83635621@2x.png"
              />
              <div className={styles.english}>english</div>
            </div>
          </div>
          <div className={styles.dicord}>
            <img className={styles.vectorIcon} alt="" src="/vector.svg" />
          </div>
          <div className={styles.twitter}>
            <img
              className={styles.icons8Twitterx1001}
              alt=""
              src="/icons8twitterx100-11@2x.png"
            />
          </div>
        </div>
      </div>
      <div className={styles.text1}>
        <div className={styles.aboutUs}>About Us</div>
        <div className={styles.aboutUs}>Market</div>
        <div className={styles.aboutUs}>contact us</div>
        <div className={styles.aboutUs}>Virtual Try-On</div>
        <div className={styles.aboutUs}>Collections</div>
        <div className={styles.aboutUs}>Market X</div>
      </div>
    </div>
  );
};

Contn.propTypes = {
  className: PropTypes.string,
};

export default Contn;
